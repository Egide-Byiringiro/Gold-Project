import { Requests } from "../models/requests.js"
import { parseEmailToJobDraft } from "../middleware/emailParser.js"
import { readOverrides, writeOverrides, getDataset } from "../models/storage.js"
import { Audit } from "../middleware/audit.js"
import { RateLimit } from "../middleware/rateLimit.js"

export function renderRequests(){
  const node = document.createElement("div")
  node.className = "container"

  node.innerHTML = `
    <div class="toolbar">
      <h2 style="margin:0">Employer Job Requests</h2>
      <div class="nav">
        <button id="newReq" class="btn primary">New Request</button>
        <button id="importReq" class="btn ghost">Paste Email</button>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card" style="padding:16px">
          <table class="table">
            <thead><tr><th>Company</th><th>Title</th><th>Status</th><th style="width:260px"></th></tr></thead>
            <tbody id="rows"></tbody>
          </table>
        </div>
      </div>
    </div>
  `

  const rows = node.querySelector("#rows")

  const render = () => {
    const list = Requests.list()
    rows.innerHTML = list.map(r => `<tr>
      <td>${escape(r.company||"-")}</td>
      <td>${escape(r.title||"-")}</td>
      <td><span class="chip">${r.status}</span></td>
      <td>
        <button class="btn ghost" data-action="view" data-id="${r.id}">View</button>
        ${r.status === "pending" ? `<button class="btn primary" data-action="approve" data-id="${r.id}">Approve & Publish</button>` : ""}
        ${r.status !== "rejected" ? `<button class="btn warn" data-action="reject" data-id="${r.id}">Reject</button>` : ""}
        <button class="btn danger" data-action="delete" data-id="${r.id}">Delete</button>
      </td>
    </tr>`).join("")
  }

  node.querySelector("#newReq").addEventListener("click", () => {
    if (!RateLimit.allow("req_add", { max: 15, windowMs: 60_000 })) { alert("Rate limit exceeded"); return }
    const company = prompt("Company name:") || ""
    const title = prompt("Job title:") || ""
    Requests.add({ company, title })
    Audit.record("request_add", { company, title })
    render()
  })

  node.querySelector("#importReq").addEventListener("click", () => {
    const text = prompt("Paste employer email text:")
    if (!text) return
    const draft = parseEmailToJobDraft(text)
    Requests.add(draft)
    Audit.record("request_import", { company: draft.company, title: draft.title })
    render()
  })

  node.addEventListener("click", async (e) => {
    const btn = e.target.closest("button[data-action]")
    if (!btn) return
    const id = btn.getAttribute("data-id")
    const action = btn.getAttribute("data-action")

    if (action === "view"){
      const r = Requests.list().find(x => x.id === id)
      if (!r) return
      alert(JSON.stringify(r, null, 2))
    }

    if (action === "approve"){
      if (!confirm("Approve and publish this job?")) return
      const req = Requests.list().find(x => x.id === id)
      if (!req) return
      const jobs = readOverrides("jobs")
      const published = {
        id: req.id, // reuse generated id
        title: req.title || "Untitled",
        career_id: req.career_id || "general",
        location: req.location || "Kigali",
        posted_date: req.posted_date || new Date().toISOString().slice(0,10),
        salary_min: Number(req.salary_min)||0,
        salary_max: Number(req.salary_max)||0,
        urgent: !!req.urgent,
        apply_url: req.apply_url || "",
        requirements: req.requirements || [],
        responsibilities: req.responsibilities || [],
      }
      jobs.push(published)
      writeOverrides("jobs", jobs)
      Requests.update(id, { status: "approved" })
      Audit.record("request_approve", { id })
      alert("Published to job postings overrides.")
      render()
    }

    if (action === "reject"){
      const reason = prompt("Reason for rejection:") || ""
      Requests.update(id, { status: "rejected", reason })
      Audit.record("request_reject", { id })
      render()
    }

    if (action === "delete"){
      if (!confirm("Delete request?")) return
      Requests.remove(id)
      Audit.record("request_delete", { id })
      render()
    }
  })

  render()
  return node
}

function escape(s){
  return String(s||"").replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]))
}


