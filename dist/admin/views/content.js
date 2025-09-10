import { getDataset, writeOverrides, readOverrides } from "../models/storage.js"
import { Audit } from "../middleware/audit.js"
import { RateLimit } from "../middleware/rateLimit.js"

const DATASETS = [
  { key: "careers", base: "/src/data/careers.json" },
  { key: "scenarios", base: "/src/data/scenarios.json" },
  { key: "jobs", base: "/src/data/job_postings.json" },
]

export function renderContent(){
  const node = document.createElement("div")
  node.className = "container"
  node.innerHTML = `
    <div class="toolbar">
      <h2 style="margin:0">Content</h2>
      <div class="nav">
        <select id="datasetSel">
          ${DATASETS.map(d => `<option value="${d.key}">${d.key}</option>`).join("")}
        </select>
        <button id="addBtn" class="btn primary">Add</button>
        <button id="clearOverrides" class="btn warn">Clear Overrides</button>
      </div>
    </div>
    <div id="grid"></div>
    
    <!-- Career Form -->
    <div id="careerForm" class="card" style="padding:20px; margin-top:16px; display:none">
      <div class="toolbar">
        <h3 style="margin:0">Add/Edit Career</h3>
        <button id="closeCareerForm" class="btn ghost">Close</button>
      </div>
      <form id="careerFormData">
        <div id="careerMsg" class="muted" style="display:none;margin-bottom:8px"></div>
        <div class="row">
          <div class="col">
            <div style="margin-bottom:12px">
              <label>ID *</label>
              <input id="careerId" class="input" type="text" required />
            </div>
            <div style="margin-bottom:12px">
              <label>Title *</label>
              <input id="careerTitle" class="input" type="text" required />
            </div>
            <div style="margin-bottom:12px">
              <label>Description</label>
              <textarea id="careerDescription" class="input" rows="3"></textarea>
            </div>
            <div style="margin-bottom:12px">
              <label>Scenario Match</label>
              <select id="careerScenarioMatch" class="input">
                <option value="">Select Scenario</option>
              </select>
            </div>
          </div>
          <div class="col">
            <div style="margin-bottom:12px">
              <label>Salary Min</label>
              <input id="careerSalaryMin" class="input" type="number" />
            </div>
            <div style="margin-bottom:12px">
              <label>Salary Max</label>
              <input id="careerSalaryMax" class="input" type="number" />
            </div>
            <div style="margin-bottom:12px">
              <label>Employment Rate %</label>
              <input id="careerEmploymentRate" class="input" type="number" />
            </div>
            <div style="margin-bottom:12px">
              <label>Demand Level</label>
              <input id="careerDemandLevel" class="input" type="text" placeholder="e.g., High" />
            </div>
          </div>
        </div>
        <div style="margin-bottom:12px">
          <label>Growth Potential</label>
          <textarea id="careerGrowthPotential" class="input" rows="3"></textarea>
        </div>
        <div style="margin-bottom:12px">
          <label>Key Skills (comma-separated)</label>
          <input id="careerKeySkills" class="input" type="text" placeholder="Skill1, Skill2, Skill3" />
        </div>
        <div style="margin-top:16px;display:flex;gap:8px">
          <button type="submit" class="btn primary">Save Career</button>
          <button type="button" id="cancelCareer" class="btn ghost">Cancel</button>
        </div>
      </form>
    </div>

    <!-- Scenario Form -->
    <div id="scenarioForm" class="card" style="padding:20px; margin-top:16px; display:none">
      <div class="toolbar">
        <h3 style="margin:0">Add/Edit Scenario</h3>
        <button id="closeScenarioForm" class="btn ghost">Close</button>
      </div>
      <form id="scenarioFormData">
        <div id="scenarioMsg" class="muted" style="display:none;margin-bottom:8px"></div>
        <div class="row">
          <div class="col">
            <div style="margin-bottom:12px">
              <label>ID *</label>
              <input id="scenarioId" class="input" type="text" required />
            </div>
            <div style="margin-bottom:12px">
              <label>Title *</label>
              <input id="scenarioTitle" class="input" type="text" required />
            </div>
            <div style="margin-bottom:12px">
              <label>Description</label>
              <textarea id="scenarioDescription" class="input" rows="3"></textarea>
            </div>
          </div>
          <div class="col">
            <div style="margin-bottom:12px">
              <label>Icon</label>
              <select id="scenarioIcon" class="input">
                <option value="wrench">Wrench</option>
                <option value="hammer">Hammer</option>
                <option value="heart">Heart</option>
                <option value="monitor">Monitor</option>
                <option value="palette">Palette</option>
                <option value="briefcase">Briefcase</option>
              </select>
            </div>
          </div>
        </div>
        <div style="margin-top:16px;display:flex;gap:8px">
          <button type="submit" class="btn primary">Save Scenario</button>
          <button type="button" id="cancelScenario" class="btn ghost">Cancel</button>
        </div>
      </form>
    </div>

    <!-- Job Form -->
    <div id="jobForm" class="card" style="padding:20px; margin-top:16px; display:none">
      <div class="toolbar">
        <h3 style="margin:0">Add/Edit Job</h3>
        <button id="closeJobForm" class="btn ghost">Close</button>
      </div>
      <form id="jobFormData">
        <div id="jobMsg" class="muted" style="display:none;margin-bottom:8px"></div>
        <div class="row">
          <div class="col">
            <div style="margin-bottom:12px">
              <label>ID *</label>
              <input id="jobId" class="input" type="text" required />
            </div>
            <div style="margin-bottom:12px">
              <label>Title *</label>
              <input id="jobTitle" class="input" type="text" required />
            </div>
            <div style="margin-bottom:12px">
              <label>Career *</label>
              <select id="jobCareerId" class="input" required>
                <option value="">Select Career</option>
              </select>
            </div>
            <div style="margin-bottom:12px">
              <label>Location</label>
              <input id="jobLocation" class="input" type="text" />
            </div>
            <div style="margin-bottom:12px">
              <label>Posted Date</label>
              <input id="jobPostedDate" class="input" type="date" />
            </div>
          </div>
          <div class="col">
            <div style="margin-bottom:12px">
              <label>Salary Min</label>
              <input id="jobSalaryMin" class="input" type="number" />
            </div>
            <div style="margin-bottom:12px">
              <label>Salary Max</label>
              <input id="jobSalaryMax" class="input" type="number" />
            </div>
            <div style="margin-bottom:12px">
              <label>Apply URL/Email</label>
              <input id="jobApplyUrl" class="input" type="text" />
            </div>
            <div style="margin-bottom:12px">
              <label>
                <input id="jobUrgent" type="checkbox" /> Urgent
              </label>
            </div>
          </div>
        </div>
        <div style="margin-bottom:12px">
          <label>Requirements (one per line)</label>
          <textarea id="jobRequirements" class="input" rows="4"></textarea>
        </div>
        <div style="margin-bottom:12px">
          <label>Responsibilities (one per line)</label>
          <textarea id="jobResponsibilities" class="input" rows="4"></textarea>
        </div>
        <div style="margin-top:16px;display:flex;gap:8px">
          <button type="submit" class="btn primary">Save Job</button>
          <button type="button" id="cancelJob" class="btn ghost">Cancel</button>
        </div>
      </form>
    </div>
  `

  const grid = node.querySelector("#grid")
  const select = node.querySelector("#datasetSel")
  const careerForm = node.querySelector("#careerForm")
  const scenarioForm = node.querySelector("#scenarioForm")
  const jobForm = node.querySelector("#jobForm")
  let lastItems = []

  const renderTable = async () => {
    const ds = DATASETS.find(d => d.key === select.value)
    const items = await getDataset(ds.key, ds.base)
    lastItems = items
    grid.innerHTML = `
      <div class="card" style="padding:16px">
        <table class="table">
          <thead><tr><th>ID</th><th>Title/Name</th><th style="width:200px"></th></tr></thead>
          <tbody>
            ${items.map(rowTemplate(select.value)).join("")}
          </tbody>
        </table>
      </div>
    `
    careerForm.style.display = "none"
    scenarioForm.style.display = "none"
    jobForm.style.display = "none"
  }

  select.addEventListener("change", renderTable)
  node.querySelector("#addBtn").addEventListener("click", () => {
    if (!RateLimit.allow("content_add", { max: 20, windowMs: 60_000 })) { alert("Rate limit exceeded. Try later."); return }
    showForm(select.value, null)
  })

  // Close form buttons
  node.querySelector("#closeCareerForm").addEventListener("click", () => { careerForm.style.display = "none" })
  node.querySelector("#closeScenarioForm").addEventListener("click", () => { scenarioForm.style.display = "none" })
  node.querySelector("#closeJobForm").addEventListener("click", () => { jobForm.style.display = "none" })
  node.querySelector("#cancelCareer").addEventListener("click", () => { careerForm.style.display = "none" })
  node.querySelector("#cancelScenario").addEventListener("click", () => { scenarioForm.style.display = "none" })
  node.querySelector("#cancelJob").addEventListener("click", () => { jobForm.style.display = "none" })

  node.querySelector("#clearOverrides").addEventListener("click", () => {
    if (!RateLimit.allow("content_clear", { max: 5, windowMs: 60_000 })) { alert("Rate limit exceeded. Try later."); return }
    const dsKey = select.value
    if (!confirm("Clear all overrides for " + dsKey + "?")) return
    writeOverrides(dsKey, [])
    Audit.record("content_clear_overrides", { dataset: dsKey })
    renderTable()
  })

  node.addEventListener("click", (e) => {
    const btn = e.target.closest("button[data-action]")
    if (!btn) return
    const id = btn.getAttribute("data-id")
    const dsKey = select.value
    const overrides = readOverrides(dsKey)
    const idx = overrides.findIndex(x => x.id === id)
    const action = btn.getAttribute("data-action")
    if (action === "edit"){
      if (!RateLimit.allow("content_edit", { max: 60, windowMs: 60_000 })) { alert("Rate limit exceeded. Try later."); return }
      const current = idx >= 0 ? overrides[idx] : (lastItems.find(x => x.id === id) || { id })
      showForm(dsKey, { ...current })
    } else if (action === "delete"){
      if (!RateLimit.allow("content_delete", { max: 20, windowMs: 60_000 })) { alert("Rate limit exceeded. Try later."); return }
      if (idx < 0){ alert("Item exists only in base data. Add override first to delete."); return }
      if (!confirm("Delete override?")) return
      overrides.splice(idx,1)
      writeOverrides(dsKey, overrides)
      Audit.record("content_delete", { dataset: dsKey, id })
      renderTable()
    }
  })

  // Robust, scoped submit handling to ensure Save always works
  node.addEventListener("submit", async (e) => {
    const form = e.target
    if (!(form instanceof HTMLFormElement)) return
    const formId = form.id
    if (formId !== "careerFormData" && formId !== "scenarioFormData" && formId !== "jobFormData") return
    e.preventDefault()

    const msgId = formId === "careerFormData" ? "careerMsg" : formId === "scenarioFormData" ? "scenarioMsg" : "jobMsg"
    if (!RateLimit.allow("content_save", { max: 30, windowMs: 60_000 })) { showMessage(msgId, "Rate limit exceeded. Try later.", "error"); return }

    try {
      if (formId === "careerFormData"){
        const data = {
          id: (node.querySelector("#careerId").value || "").trim(),
          title: (node.querySelector("#careerTitle").value || "").trim(),
          description: (node.querySelector("#careerDescription").value || "").trim(),
          scenario_match: node.querySelector("#careerScenarioMatch").value,
          average_salary_min: Number(node.querySelector("#careerSalaryMin").value) || 0,
          average_salary_max: Number(node.querySelector("#careerSalaryMax").value) || 0,
          employment_rate: Number(node.querySelector("#careerEmploymentRate").value) || 0,
          demand_level: (node.querySelector("#careerDemandLevel").value || "").trim(),
          growth_potential: (node.querySelector("#careerGrowthPotential").value || "").trim(),
          key_skills: (node.querySelector("#careerKeySkills").value || "").split(",").map(s=>s.trim()).filter(Boolean),
        }
        if (!data.id || !data.title){ showMessage(msgId, "ID and Title are required", "error"); return }
        await saveToJsonFile("careers", data)
        Audit.record("content_save", { dataset: "careers", id: data.id })
        showMessage(msgId, "Career saved successfully!", "success")
        renderTable()
        return
      }
      if (formId === "scenarioFormData"){
        const data = {
          id: (node.querySelector("#scenarioId").value || "").trim(),
          title: (node.querySelector("#scenarioTitle").value || "").trim(),
          description: (node.querySelector("#scenarioDescription").value || "").trim(),
          icon: node.querySelector("#scenarioIcon").value,
        }
        if (!data.id || !data.title){ showMessage(msgId, "ID and Title are required", "error"); return }
        await saveToJsonFile("scenarios", data)
        Audit.record("content_save", { dataset: "scenarios", id: data.id })
        showMessage(msgId, "Scenario saved successfully!", "success")
        renderTable()
        return
      }
      if (formId === "jobFormData"){
        const data = {
          id: (node.querySelector("#jobId").value || "").trim(),
          title: (node.querySelector("#jobTitle").value || "").trim(),
          career_id: node.querySelector("#jobCareerId").value,
          location: (node.querySelector("#jobLocation").value || "").trim(),
          posted_date: node.querySelector("#jobPostedDate").value,
          salary_min: Number(node.querySelector("#jobSalaryMin").value) || 0,
          salary_max: Number(node.querySelector("#jobSalaryMax").value) || 0,
          urgent: !!node.querySelector("#jobUrgent").checked,
          apply_url: (node.querySelector("#jobApplyUrl").value || "").trim(),
          requirements: (node.querySelector("#jobRequirements").value || "").split("\n").map(s=>s.trim()).filter(Boolean),
          responsibilities: (node.querySelector("#jobResponsibilities").value || "").split("\n").map(s=>s.trim()).filter(Boolean),
        }
        if (!data.id || !data.title || !data.career_id){ showMessage(msgId, "ID, Title, and Career are required", "error"); return }
        await saveToJsonFile("job_postings", data)
        Audit.record("content_save", { dataset: "jobs", id: data.id })
        showMessage(msgId, "Job saved successfully!", "success")
        renderTable()
        return
      }
    } catch (err) {
      showMessage(msgId, `Failed to save: ${err?.message||err}`, "error")
    }
  })

  renderTable()
  return node

  async function showForm(dsKey, item){
    // Hide all forms first
    careerForm.style.display = "none"
    scenarioForm.style.display = "none"
    jobForm.style.display = "none"

    // Fetch related options for selects
    const [scenarioOptions, careerOptions] = await Promise.all([
      getDataset("scenarios", "/src/data/scenarios.json"),
      getDataset("careers", "/src/data/careers.json"),
    ])

    if (dsKey === "careers") {
      populateCareerForm(item, scenarioOptions)
      careerForm.style.display = "block"
    } else if (dsKey === "scenarios") {
      populateScenarioForm(item)
      scenarioForm.style.display = "block"
    } else if (dsKey === "jobs") {
      populateJobForm(item, careerOptions)
      jobForm.style.display = "block"
    }
  }

  function populateCareerForm(item, scenarioOptions) {
    const data = item || {}
    document.getElementById("careerId").value = data.id || ""
    document.getElementById("careerTitle").value = data.title || ""
    document.getElementById("careerDescription").value = data.description || ""
    document.getElementById("careerSalaryMin").value = data.average_salary_min || ""
    document.getElementById("careerSalaryMax").value = data.average_salary_max || ""
    document.getElementById("careerEmploymentRate").value = data.employment_rate || ""
    document.getElementById("careerDemandLevel").value = data.demand_level || ""
    document.getElementById("careerGrowthPotential").value = data.growth_potential || ""
    document.getElementById("careerKeySkills").value = Array.isArray(data.key_skills) ? data.key_skills.join(", ") : (data.key_skills || "")
    
    const scenarioSelect = document.getElementById("careerScenarioMatch")
    scenarioSelect.innerHTML = '<option value="">Select Scenario</option>'
    scenarioOptions.forEach(s => {
      const option = document.createElement("option")
      option.value = s.id
      option.textContent = s.title || s.id
      if (s.id === data.scenario_match) option.selected = true
      scenarioSelect.appendChild(option)
    })
  }

  function populateScenarioForm(item) {
    const data = item || {}
    document.getElementById("scenarioId").value = data.id || ""
    document.getElementById("scenarioTitle").value = data.title || ""
    document.getElementById("scenarioDescription").value = data.description || ""
    document.getElementById("scenarioIcon").value = data.icon || "briefcase"
  }

  function populateJobForm(item, careerOptions) {
    const data = item || {}
    document.getElementById("jobId").value = data.id || ""
    document.getElementById("jobTitle").value = data.title || ""
    document.getElementById("jobLocation").value = data.location || ""
    document.getElementById("jobPostedDate").value = data.posted_date || new Date().toISOString().slice(0,10)
    document.getElementById("jobSalaryMin").value = data.salary_min || ""
    document.getElementById("jobSalaryMax").value = data.salary_max || ""
    document.getElementById("jobApplyUrl").value = data.apply_url || ""
    document.getElementById("jobUrgent").checked = !!data.urgent
    document.getElementById("jobRequirements").value = Array.isArray(data.requirements) ? data.requirements.join("\n") : (data.requirements || "")
    document.getElementById("jobResponsibilities").value = Array.isArray(data.responsibilities) ? data.responsibilities.join("\n") : (data.responsibilities || "")
    
    const careerSelect = document.getElementById("jobCareerId")
    careerSelect.innerHTML = '<option value="">Select Career</option>'
    careerOptions.forEach(c => {
      const option = document.createElement("option")
      option.value = c.id
      option.textContent = c.title || c.id
      if (c.id === data.career_id) option.selected = true
      careerSelect.appendChild(option)
    })
  }

  // Form submission handlers - attach after forms are created
  setupFormHandlers()

  function setupFormHandlers() {
    const careerForm = document.getElementById("careerFormData")
    const scenarioForm = document.getElementById("scenarioFormData") 
    const jobForm = document.getElementById("jobFormData")
    
    if (careerForm) {
      careerForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    if (!RateLimit.allow("content_save", { max: 30, windowMs: 60_000 })) { 
      showMessage("careerMsg", "Rate limit exceeded. Try later.", "error")
      return 
    }
    
    const careerData = {
      id: document.getElementById("careerId").value.trim(),
      title: document.getElementById("careerTitle").value.trim(),
      description: document.getElementById("careerDescription").value.trim(),
      scenario_match: document.getElementById("careerScenarioMatch").value,
      average_salary_min: Number(document.getElementById("careerSalaryMin").value) || 0,
      average_salary_max: Number(document.getElementById("careerSalaryMax").value) || 0,
      employment_rate: Number(document.getElementById("careerEmploymentRate").value) || 0,
      demand_level: document.getElementById("careerDemandLevel").value.trim(),
      growth_potential: document.getElementById("careerGrowthPotential").value.trim(),
      key_skills: document.getElementById("careerKeySkills").value.split(",").map(s => s.trim()).filter(Boolean)
    }

    if (!careerData.id || !careerData.title) {
      showMessage("careerMsg", "ID and Title are required", "error")
      return
    }

    try {
      await saveToJsonFile("careers", careerData)
      showMessage("careerMsg", "Career saved successfully! Check main site.", "success")
      Audit.record("content_save", { dataset: "careers", id: careerData.id })
      renderTable()
      // Clear form after successful save
      setTimeout(() => {
        document.getElementById("careerId").value = ""
        document.getElementById("careerTitle").value = ""
        document.getElementById("careerDescription").value = ""
        document.getElementById("careerSalaryMin").value = ""
        document.getElementById("careerSalaryMax").value = ""
        document.getElementById("careerEmploymentRate").value = ""
        document.getElementById("careerDemandLevel").value = ""
        document.getElementById("careerGrowthPotential").value = ""
        document.getElementById("careerKeySkills").value = ""
        document.getElementById("careerScenarioMatch").value = ""
      }, 1000)
    } catch (error) {
      showMessage("careerMsg", "Failed to save career: " + error.message, "error")
    }
  })

    }
    
    if (scenarioForm) {
      scenarioForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    if (!RateLimit.allow("content_save", { max: 30, windowMs: 60_000 })) { 
      showMessage("scenarioMsg", "Rate limit exceeded. Try later.", "error")
      return 
    }
    
    const scenarioData = {
      id: document.getElementById("scenarioId").value.trim(),
      title: document.getElementById("scenarioTitle").value.trim(),
      description: document.getElementById("scenarioDescription").value.trim(),
      icon: document.getElementById("scenarioIcon").value
    }

    if (!scenarioData.id || !scenarioData.title) {
      showMessage("scenarioMsg", "ID and Title are required", "error")
      return
    }

    try {
      await saveToJsonFile("scenarios", scenarioData)
      showMessage("scenarioMsg", "Scenario saved successfully!", "success")
      Audit.record("content_save", { dataset: "scenarios", id: scenarioData.id })
      renderTable()
    } catch (error) {
      showMessage("scenarioMsg", "Failed to save scenario: " + error.message, "error")
    }
  })

    }
    
    if (jobForm) {
      jobForm.addEventListener("submit", async (e) => {
    e.preventDefault()
    if (!RateLimit.allow("content_save", { max: 30, windowMs: 60_000 })) { 
      showMessage("jobMsg", "Rate limit exceeded. Try later.", "error")
      return 
    }
    
    const jobData = {
      id: document.getElementById("jobId").value.trim(),
      title: document.getElementById("jobTitle").value.trim(),
      career_id: document.getElementById("jobCareerId").value,
      location: document.getElementById("jobLocation").value.trim(),
      posted_date: document.getElementById("jobPostedDate").value,
      salary_min: Number(document.getElementById("jobSalaryMin").value) || 0,
      salary_max: Number(document.getElementById("jobSalaryMax").value) || 0,
      urgent: document.getElementById("jobUrgent").checked,
      apply_url: document.getElementById("jobApplyUrl").value.trim(),
      requirements: document.getElementById("jobRequirements").value.split("\n").map(s => s.trim()).filter(Boolean),
      responsibilities: document.getElementById("jobResponsibilities").value.split("\n").map(s => s.trim()).filter(Boolean)
    }

    if (!jobData.id || !jobData.title || !jobData.career_id) {
      showMessage("jobMsg", "ID, Title, and Career are required", "error")
      return
    }

    try {
      await saveToJsonFile("job_postings", jobData)
      showMessage("jobMsg", "Job saved successfully!", "success")
      Audit.record("content_save", { dataset: "jobs", id: jobData.id })
      renderTable()
    } catch (error) {
      showMessage("jobMsg", "Failed to save job: " + error.message, "error")
    }
  })
    }
  }

  function showMessage(elementId, message, type) {
    const msgEl = document.getElementById(elementId)
    msgEl.style.display = "block"
    msgEl.textContent = message
    msgEl.className = type === "error" ? "muted" : "muted"
    if (type === "error") msgEl.style.color = "#ef4444"
    else if (type === "success") msgEl.style.color = "#10b981"
  }

  async function saveToJsonFile(dataset, data) {
    // Save to LocalStorage with proper key structure
    const key = `admin_${dataset}_data`
    const existing = JSON.parse(localStorage.getItem(key) || "[]")
    const index = existing.findIndex(item => item.id === data.id)
    
    if (index >= 0) {
      existing[index] = { ...existing[index], ...data }
    } else {
      existing.push(data)
    }
    
    localStorage.setItem(key, JSON.stringify(existing))
    
    // Update the overrides for immediate effect on main site
    const overrideKey = dataset === "job_postings" ? "jobs" : dataset
    writeOverrides(overrideKey, existing)
    
    console.log(`Saved ${dataset} data:`, data)
    console.log(`Updated overrides for ${overrideKey}:`, existing)
  }
}

function rowTemplate(ds){
  return (item) => `<tr>
    <td>${escapeHtml(item.id)}</td>
    <td>${escapeHtml(item.title || item.name || "")}</td>
    <td>
      <button class="btn ghost" data-action="edit" data-id="${item.id}">Edit</button>
      <button class="btn danger" data-action="delete" data-id="${item.id}">Delete</button>
    </td>
  </tr>`
}

function escapeHtml(s){
  return String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]))
}


