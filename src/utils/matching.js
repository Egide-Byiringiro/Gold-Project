import scenariosData from "../data/scenarios.json"
import careersData from "../data/careers.json"
import graduatesData from "../data/graduates.json"
import employersData from "../data/employers.json"
import jobPostingsData from "../data/job_postings.json"
import schoolsData from "../data/schools.json"

export const matchCareerToScenario = (scenarioId) => {
  const scenario = scenariosData.find((s) => s.id === scenarioId)
  if (!scenario) return null

  // Find careers that match this scenario
  const matchingCareers = careersData.filter((career) => career.scenario_match === scenarioId)

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
  return jobPostingsData.filter((job) => job.career_id === careerId)
}

export const getSchoolsForCareer = (careerId) => {
  return schoolsData.filter((school) => school.programs.includes(careerId))
}

export const getAllScenarios = () => scenariosData

export const getAllCareers = () => careersData

export const getCareerById = (careerId) => {
  return careersData.find((career) => career.id === careerId)
}

export const getScenarioById = (scenarioId) => {
  return scenariosData.find((scenario) => scenario.id === scenarioId)
}

export const formatSalary = (min, max, currency = "RWF") => {
  const formatNumber = (num) => {
    return new Intl.NumberFormat("en-RW").format(num)
  }

  return `${formatNumber(min)} - ${formatNumber(max)} ${currency}`
}

export const getUrgentJobs = () => {
  return jobPostingsData.filter((job) => job.urgent === true)
}

export const getRecentJobs = (days = 30) => {
  const cutoffDate = new Date()
  cutoffDate.setDate(cutoffDate.getDate() - days)

  return jobPostingsData.filter((job) => {
    const jobDate = new Date(job.posted_date)
    return jobDate >= cutoffDate
  })
}
