import { Audit } from "../middleware/audit.js"
import { getDataset } from "../models/storage.js"

export function renderDashboard(){
  const node = document.createElement("div")
  node.className = "container"
  const audits = Audit.list().slice(0, 10)
  node.innerHTML = `
    <div class="toolbar">
      <h2 style="margin:0">Dashboard</h2>
      <div class="nav">
        <a class="btn ghost" href="#/requests">Requests</a>
        <a class="btn ghost" href="#/content">Content</a>
        <a class="btn ghost" href="#/users">Users</a>
      </div>
    </div>

    <div id="stats" class="row"></div>
    <div class="row" style="margin-top:16px">
      <div class="col">
        <div class="card" style="padding:16px">
          <h3>Recent Admin Activity</h3>
          <table class="table" style="margin-top:8px">
            <thead><tr><th>Time</th><th>Event</th><th>Detail</th></tr></thead>
            <tbody>
              ${audits.map(a => `<tr><td>${new Date(a.ts).toLocaleString()}</td><td>${a.event}</td><td class="muted">${escapeHtml(JSON.stringify(a.detail))}</td></tr>`).join("")}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `
  const stats = node.querySelector("#stats")
  Promise.all([
    getDataset("careers", "/src/data/careers.json"),
    getDataset("scenarios", "/src/data/scenarios.json"),
    getDataset("jobs", "/src/data/job_postings.json"),
  ]).then(([careers, scenarios, jobs]) => {
    const cards = [
      { label: "Careers", value: careers.length },
      { label: "Scenarios", value: scenarios.length },
      { label: "Job Postings", value: jobs.length },
    ]
    stats.innerHTML = cards.map(c => `<div class="col"><div class="card" style="padding:20px;text-align:center">
      <div class="muted">${c.label}</div>
      <div style="font-size:28px;font-weight:800;margin-top:4px">${c.value}</div>
    </div></div>`).join("")
  })
  return node
}

function escapeHtml(s){
  return s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]))
}


