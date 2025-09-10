import { getDataset } from "../models/storage.js"

export function renderAnalytics(){
  const node = document.createElement("div")
  node.className = "container"
  node.innerHTML = `
    <div class="toolbar">
      <h2 style="margin:0">Analytics</h2>
    </div>
    <div id="cards" class="row"></div>
  `

  const cards = node.querySelector("#cards")

  Promise.all([
    getDataset("careers", "/src/data/careers.json"),
    getDataset("scenarios", "/src/data/scenarios.json"),
    getDataset("jobs", "/src/data/job_postings.json"),
  ]).then(([careers, scenarios, jobs]) => {
    const stats = [
      { label: "Careers", value: careers.length },
      { label: "Scenarios", value: scenarios.length },
      { label: "Job Postings", value: jobs.length },
    ]
    cards.innerHTML = stats.map(s => `<div class="col"><div class="card" style="padding:16px;text-align:center"><div class="muted">${s.label}</div><div style="font-size:28px;font-weight:800">${s.value}</div></div></div>`).join("")
  })

  return node
}


