import { Audit } from "../middleware/audit.js"
import { RateLimit } from "../middleware/rateLimit.js"

const LS_USERS = "admin_users"

function readUsers(){ try { return JSON.parse(localStorage.getItem(LS_USERS) || "[]") } catch { return [] } }
function writeUsers(users){ localStorage.setItem(LS_USERS, JSON.stringify(users)) }

export function renderUsers(){
  const node = document.createElement("div")
  node.className = "container"

  const users = readUsers()

  node.innerHTML = `
    <div class="toolbar">
      <h2 style="margin:0">Users</h2>
      <div class="nav">
        <button id="addBtn" class="btn primary">Add User</button>
        <button id="exportBtn" class="btn ghost">Export</button>
        <input id="importFile" type="file" accept="application/json" style="display:none"/>
        <button id="importBtn" class="btn ghost">Import</button>
      </div>
    </div>

    <div class="card" style="padding:16px">
      <table class="table">
        <thead><tr><th>Email</th><th>Name</th><th>Role</th><th style="width:220px"></th></tr></thead>
        <tbody id="rows">
          ${users.map(renderRow).join("")}
        </tbody>
      </table>
    </div>
  `

  node.querySelector("#addBtn").addEventListener("click", () => {
    if (!RateLimit.allow("user_add", { max: 10, windowMs: 60_000 })) { alert("Rate limit exceeded. Try later."); return }
    const email = prompt("Email:")
    if (!email) return
    const name = prompt("Name:") || ""
    const role = prompt("Role (viewer|editor|superadmin):", "viewer") || "viewer"
    const password = prompt("Temp password:", "changeMe123") || "changeMe123"
    const all = readUsers()
    if (all.find(u => u.email === email)) { alert("Email exists"); return }
    const user = { id: `${Date.now()}`, email, name, role, password }
    all.push(user)
    writeUsers(all)
    Audit.record("user_create", { email, role })
    location.reload()
  })

  node.querySelector("#exportBtn").addEventListener("click", () => {
    if (!RateLimit.allow("user_export", { max: 5, windowMs: 60_000 })) { alert("Rate limit exceeded. Try later."); return }
    const data = JSON.stringify(readUsers(), null, 2)
    const blob = new Blob([data], { type: "application/json" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url; a.download = "users.json"; a.click()
    URL.revokeObjectURL(url)
  })

  const importFile = node.querySelector("#importFile")
  node.querySelector("#importBtn").addEventListener("click", () => importFile.click())
  importFile.addEventListener("change", async (e) => {
    if (!RateLimit.allow("user_import", { max: 3, windowMs: 60_000 })) { alert("Rate limit exceeded. Try later."); return }
    const file = e.target.files[0]
    if (!file) return
    const text = await file.text()
    try {
      const arr = JSON.parse(text)
      if (!Array.isArray(arr)) throw new Error("Invalid")
      writeUsers(arr)
      Audit.record("user_import", { count: arr.length })
      location.reload()
    } catch { alert("Invalid JSON") }
  })

  node.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]")
    if (!btn) return
    const id = btn.getAttribute("data-id")
    const all = readUsers()
    const idx = all.findIndex(u => u.id === id)
    if (idx < 0) return
    const action = btn.getAttribute("data-action")
    if (action === "edit"){
      if (!RateLimit.allow("user_edit", { max: 30, windowMs: 60_000 })) { alert("Rate limit exceeded. Try later."); return }
      const user = all[idx]
      const name = prompt("Name:", user.name) ?? user.name
      const role = prompt("Role (viewer|editor|superadmin):", user.role) ?? user.role
      all[idx] = { ...user, name, role }
      writeUsers(all)
      Audit.record("user_update", { email: user.email, role })
      location.reload()
    } else if (action === "password"){
      if (!RateLimit.allow("user_password", { max: 10, windowMs: 60_000 })) { alert("Rate limit exceeded. Try later."); return }
      const pass = prompt("New password:")
      if (!pass) return
      all[idx].password = pass
      writeUsers(all)
      Audit.record("user_password_reset", { email: all[idx].email })
      alert("Password updated")
    } else if (action === "delete"){
      if (!RateLimit.allow("user_delete", { max: 10, windowMs: 60_000 })) { alert("Rate limit exceeded. Try later."); return }
      if (!confirm("Delete user?")) return
      Audit.record("user_delete", { email: all[idx].email })
      all.splice(idx,1)
      writeUsers(all)
      location.reload()
    }
  })

  return node
}

function renderRow(u){
  return `<tr>
    <td>${escapeHtml(u.email)}</td>
    <td>${escapeHtml(u.name||"")}</td>
    <td><span class="chip">${u.role}</span></td>
    <td>
      <button class="btn ghost" data-action="edit" data-id="${u.id}">Edit</button>
      <button class="btn ghost" data-action="password" data-id="${u.id}">Password</button>
      <button class="btn danger" data-action="delete" data-id="${u.id}">Delete</button>
    </td>
  </tr>`
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]))
}


