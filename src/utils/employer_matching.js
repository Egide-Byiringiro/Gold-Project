import scenariosData from "../data/scenarios.json"
import employersData from "../data/employers.json"
import { getGraduatesForCareer, getSchoolsForCareer } from "./matching.js"

export const getAllScenarios = () => {
  return scenariosData
}

export const matchTalentToNeeds = (scenarioId) => {
  const scenario = scenariosData.find((s) => s.id === scenarioId)
  if (!scenario) return { graduates: [], schools: [] }

  // Get all careers that match this scenario from employer perspective
  const relevantCareers = scenario.employer_needs || []

  // Find graduates and schools for these career areas
  let allGraduates = []
  let allSchools = []

  // Map employer needs to career IDs (simplified mapping)
  const careerMapping = {
    maintenance: ["automotive", "electronics"],
    repair_services: ["automotive", "electronics"],
    installation: ["solar_energy", "construction"],
    construction_projects: ["construction"],
    customer_service: ["hospitality", "ict_support"],
    technical_support: ["ict_support", "electronics"],
    it_support: ["ict_support"],
    digital_services: ["ict_support"],
    design_services: ["hospitality"],
    creative_industries: ["hospitality"],
    business_operations: ["hospitality"],
    sales_management: ["automotive"],
  }

  relevantCareers.forEach((need) => {
    const careerIds = careerMapping[need] || []
    careerIds.forEach((careerId) => {
      const graduates = getGraduatesForCareer(careerId)
      const schools = getSchoolsForCareer(careerId)

      allGraduates = [...allGraduates, ...graduates]
      allSchools = [...allSchools, ...schools]
    })
  })

  // Remove duplicates
  const uniqueGraduates = allGraduates.filter((grad, index, self) => index === self.findIndex((g) => g.id === grad.id))

  const uniqueSchools = allSchools.filter((school, index, self) => index === self.findIndex((s) => s.id === school.id))

  return {
    graduates: uniqueGraduates.slice(0, 10), // Limit to 10 for performance
    schools: uniqueSchools,
  }
}

export const getSuccessStories = (industryType) => {
  // Filter employers by industry and return those with testimonials
  return employersData
    .filter((employer) => {
      if (industryType === "all") return true
      return employer.industry.toLowerCase().includes(industryType.toLowerCase())
    })
    .slice(0, 5) // Limit to 5 success stories
}

export const getPartnershipOptions = (careerId) => {
  const schools = getSchoolsForCareer(careerId)
  const employers = employersData.filter(
    (emp) => emp.career_ids.includes(careerId) && emp.hiring_status === "actively_hiring",
  )

  return {
    schools: schools,
    hiring_employers: employers,
    total_positions: employers.reduce((sum, emp) => sum + emp.positions_open, 0),
  }
}

export const getEmployerStats = () => {
  const totalEmployers = employersData.length
  const activelyHiring = employersData.filter((emp) => emp.hiring_status === "actively_hiring").length
  const totalPositions = employersData.reduce((sum, emp) => sum + emp.positions_open, 0)
  const totalHired = employersData.reduce((sum, emp) => sum + emp.employees_hired, 0)

  return {
    totalEmployers,
    activelyHiring,
    totalPositions,
    totalHired,
  }
}

export const getTopPayingEmployers = (limit = 5) => {
  return employersData.sort((a, b) => b.salary_range_max - a.salary_range_max).slice(0, limit)
}
