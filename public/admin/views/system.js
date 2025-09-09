import { Audit } from "../middleware/audit.js"

const LS_SETTINGS = "admin_settings"
const LS_EMAIL_TPL = "admin_email_templates"

function read(key, fallback){ try { return JSON.parse(localStorage.getItem(key) || JSON.stringify(fallback)) } catch { return fallback } }
function write(key, val){ localStorage.setItem(key, JSON.stringify(val)) }

export function renderSystem(){
  const node = document.createElement("div")
  node.className = "container"

  const settings = read(LS_SETTINGS, { siteName: "TVET Career Catalyst", supportEmail: "support@example.com" })
  const templates = read(LS_EMAIL_TPL, { welcome: "Welcome {{name}}", reset: "Reset link: {{url}}" })
  const audits = Audit.list().slice(0, 50)

  node.innerHTML = `
    <div class="toolbar">
      <h2 style="margin:0">System</h2>
      <div class="nav">
        <button id="saveBtn" class="btn primary">Save</button>
      </div>
    </div>

    <div class="row">
      <div class="col">
        <div class="card" style="padding:16px">
          <h3>Site Settings</h3>
          <div style="margin-top:8px">
            <label>Site Name</label>
            <input id="siteName" class="input" value="${escapeHtml(settings.siteName)}" />
          </div>
          <div style="margin-top:8px">
            <label>Support Email</label>
            <input id="supportEmail" class="input" value="${escapeHtml(settings.supportEmail)}" />
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card" style="padding:16px">
          <h3>Email Templates</h3>
          <div style="margin-top:8px">
            <label>Welcome</label>
            <textarea id="welcomeTpl" rows="4" class="input">${escapeHtml(templates.welcome)}</textarea>
          </div>
          <div style="margin-top:8px">
            <label>Password Reset</label>
            <textarea id="resetTpl" rows="4" class="input">${escapeHtml(templates.reset)}</textarea>
          </div>
        </div>
      </div>
    </div>

    <div class="card" style="padding:16px;margin-top:16px">
      <div class="toolbar"><h3 style="margin:0">Audit Log</h3><button id="clearAudit" class="btn warn">Clear</button></div>
      <table class="table">
        <thead><tr><th>Time</th><th>Event</th><th>Detail</th></tr></thead>
        <tbody>
          ${audits.map(a => `<tr><td>${new Date(a.ts).toLocaleString()}</td><td>${a.event}</td><td class="muted">${escapeHtml(JSON.stringify(a.detail))}</td></tr>`).join("")}
        </tbody>
      </table>
    </div>
  `

  node.querySelector("#saveBtn").addEventListener("click", () => {
    const nextSettings = {
      siteName: node.querySelector("#siteName").value.trim(),
      supportEmail: node.querySelector("#supportEmail").value.trim(),
    }
    const nextTemplates = {
      welcome: node.querySelector("#welcomeTpl").value,
      reset: node.querySelector("#resetTpl").value,
    }
    write(LS_SETTINGS, nextSettings)
    write(LS_EMAIL_TPL, nextTemplates)
    Audit.record("system_save", {})
    alert("Saved")
  })

  node.querySelector("#clearAudit").addEventListener("click", () => {
    if (!confirm("Clear all audit logs?")) return
    Audit.clear()
    location.reload()
  })

  return node
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]))
}


