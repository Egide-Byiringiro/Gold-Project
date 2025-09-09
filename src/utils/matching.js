import scenariosData from "../data/scenarios.json"
import careersData from "../data/careers.json"
import graduatesData from "../data/graduates.json"
import employersData from "../data/employers.json"
import jobPostingsData from "../data/job_postings.json"
import schoolsData from "../data/schools.json"

// --- Admin overrides integration ---
const OV_PREFIX = "admin_overrides."
function readOverrides(key) {
  try {
    if (typeof window === "undefined") return []
    return JSON.parse(window.localStorage.getItem(OV_PREFIX + key) || "[]")
  } catch {
    return []
  }
}

function mergeById(base, overrides) {
  if (!Array.isArray(base)) return overrides || []
  const byId = new Map(base.map((x) => [x.id, x]))
  for (const item of Array.isArray(overrides) ? overrides : []) {
    byId.set(item.id, { ...byId.get(item.id), ...item })
  }
  return Array.from(byId.values())
}

function getAllCareersWithOverrides() {
  const overrides = readOverrides("careers")
  const adminData = readAdminData("careers")
  return mergeById(mergeById(careersData, overrides), adminData)
}
function getAllScenariosWithOverrides() {
  const overrides = readOverrides("scenarios")
  const adminData = readAdminData("scenarios")
  return mergeById(mergeById(scenariosData, overrides), adminData)
}
function getAllJobsWithOverrides() {
  const overrides = readOverrides("jobs")
  const adminData = readAdminData("job_postings")
  return mergeById(mergeById(jobPostingsData, overrides), adminData)
}

function readAdminData(name){
  try { 
    const key = `admin_${name}_data`
    return JSON.parse(window.localStorage.getItem(key) || "[]") 
  } catch { 
    return [] 
  }
}

export const matchCareerToScenario = (scenarioId) => {
  const scenario = getAllScenariosWithOverrides().find((s) => s.id === scenarioId)
  if (!scenario) return null

  // Find careers that match this scenario
  const matchingCareers = getAllCareersWithOverrides().filter((career) => career.scenario_match === scenarioId)

  // Return the first matching career (single recommendation as per requirements)
  return matchingCareers.length > 0 ? matchingCareers[0] : null
}

export const getGraduatesForCareer = (careerId) => {
  return graduatesData.filter((graduate) => graduate.career_id === careerId)
}

export const getEmployersForCareer = (careerId) => {
  return employersData.filter((employer) => employer.career_ids.includes(careerId))
}

export const getJobPostingsForCareer = (careerId) => {
  return getAllJobsWithOverrides().filter((job) => job.career_id === careerId)
}

export const getSchoolsForCareer = (careerId) => {
  return schoolsData.filter((school) => school.programs.includes(careerId))
}

export const getAllScenarios = () => getAllScenariosWithOverrides()

export const getAllCareers = () => getAllCareersWithOverrides()

export const getCareerById = (careerId) => {
  return getAllCareersWithOverrides().find((career) => career.id === careerId)
}

export const getScenarioById = (scenarioId) => {
  return getAllScenariosWithOverrides().find((scenario) => scenario.id === scenarioId)
}

export const formatSalary = (min, max, currency = "RWF") => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-RW").format(num)
  }

  return `${formatNumber(min)} - ${formatNumber(max)} ${currency}`
}

export const getUrgentJobs = () => {
  return getAllJobsWithOverrides().filter((job) => job.urgent === true)
}

export const getRecentJobs = (days = 30) => {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  return getAllJobsWithOverrides().filter((job) => {
    const jobDate = new Date(job.posted_date)
    return jobDate >= cutoffDate
  })
}
