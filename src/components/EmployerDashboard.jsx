"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  Building2,
  Users,
  TrendingUp,
  ExternalLink,
  CheckCircle,
  Star,
  MapPin,
  Calendar,
  Briefcase,
} from "lucide-react"
import {
  getAllScenarios,
  getEmployerStats,
  getTopPayingEmployers,
  matchTalentToNeeds,
  getSuccessStories,
  getPartnershipOptions,
} from "../utils/employer_matching"
import { getRecentJobs, getUrgentJobs } from "../utils/matching"
import { useI18n } from "../context/i18n"

const EmployerDashboard = () => {
  const navigate = useNavigate()
  const { t } = useI18n()
  const [selectedScenario, setSelectedScenario] = useState(null)
  const [showTalent, setShowTalent] = useState(false)

  const scenarios = getAllScenarios()
  const stats = getEmployerStats()
  const topEmployers = getTopPayingEmployers(3)
  const recentJobs = getRecentJobs(7).slice(0, 5)
  const urgentJobs = getUrgentJobs().slice(0, 3)

  const handleScenarioSelect = (scenarioId) => {
    setSelectedScenario(scenarioId)
    setShowTalent(true)
  }

  const talentData = selectedScenario ? matchTalentToNeeds(selectedScenario) : { graduates: [], schools: [] }
  const successStories = getSuccessStories("all").slice(0, 3)
  const partnershipData = selectedScenario
    ? getPartnershipOptions(selectedScenario)
    : { schools: [], hiring_employers: [], total_positions: 0 }

  const handleContactGraduate = (graduate) => {
    const message = encodeURIComponent(
      `Hi ${graduate.name}, I found your profile through TVET Career Catalyst. We have opportunities in ${graduate.current_role} at our company. Are you interested in discussing potential opportunities?`,
    )
    window.open(`https://wa.me/${graduate.phone.replace(/\s+/g, "")}?text=${message}`, "_blank")
  }

  const handleContactSchool = (school) => {
    const message = encodeURIComponent(
      `Hello, I represent a company interested in partnering with ${school.name} for talent recruitment in technical fields. Could we schedule a discussion about collaboration opportunities?`,
    )
    window.open(`tel:${school.contact_phone}`, "_self")
  }

  const handlePostJob = () => {
    // In a real app, this would open a job posting form
    window.open(
      "mailto:admin@tvetcareercatalyst.rw?subject=Job Posting Request&body=I would like to post a job opening. Please contact me to discuss details.",
      "_blank",
    )
  }

  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <button onClick={() => navigate("/")} className="inline-flex items-center text-gray-600 hover:text-secondary mb-6 transition-colors">{t("emp.back")}</button>

          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{t("emp.title")}</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">{t("emp.lead")}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12 max-w-5xl mx-auto">
          <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
            <Building2 className="h-8 w-8 text-secondary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalEmployers}</div>
            <div className="text-gray-600">{t("emp.stats.partners")}</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
            <Users className="h-8 w-8 text-success mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalHired}</div>
            <div className="text-gray-600">{t("emp.stats.hired")}</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
            <Briefcase className="h-8 w-8 text-accent mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.totalPositions}</div>
            <div className="text-gray-600">{t("emp.stats.positions")}</div>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border text-center">
            <TrendingUp className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">{stats.activelyHiring}</div>
            <div className="text-gray-600">{t("emp.stats.active")}</div>
          </div>
        </div>

        {/* Skills Selection */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t("emp.skills.title")}</h2>
            <p className="text-lg text-gray-600">{t("emp.skills.desc")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {scenarios.map((scenario) => (
              <button
                key={scenario.id}
                onClick={() => handleScenarioSelect(scenario.id)}
                className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                  selectedScenario === scenario.id
                    ? "border-secondary bg-secondary/5 shadow-lg"
                    : "border-gray-200 bg-white hover:border-secondary/50"
                }`}
              >
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {scenario.title.replace("I like", "We need help with")}
                </h3>
                <p className="text-gray-600 text-sm">
                  {scenario.description.replace("You enjoy", "Find talent who excels at")}
                </p>

                {selectedScenario === scenario.id && (
                  <div className="mt-3 flex items-center text-secondary font-semibold">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {t("emp.selected")}
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Available Talent */}
        {showTalent && selectedScenario && (
          <div className="max-w-6xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("emp.talent.title")}</h2>

              {/* Graduates */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t("emp.talent.graduates", { count: talentData.graduates.length })}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {talentData.graduates.slice(0, 4).map((graduate) => (
                    <div key={graduate.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{graduate.name}</h4>
                          <p className="text-secondary font-medium">{graduate.current_role}</p>
                          <p className="text-sm text-gray-600">{graduate.company}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">{t("emp.talent.salary")}</div>
                          <div className="font-semibold text-gray-900">
                            {new Intl.NumberFormat("en-RW").format(graduate.current_salary)} RWF
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center text-sm text-gray-600 mb-3">
                        <MapPin className="h-4 w-4 mr-1" />
                        {graduate.location}
                        <Calendar className="h-4 w-4 ml-3 mr-1" />
                        {new Date().getFullYear() - graduate.graduation_year} {t("emp.talent.expYears")}
                      </div>

                      <button
                        onClick={() => handleContactGraduate(graduate)}
                        className="w-full bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/90 transition-colors"
                      >
                        {t("emp.talent.whatsapp")}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partner Schools */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t("emp.schools.title", { count: talentData.schools.length })}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {talentData.schools.map((school) => (
                    <div key={school.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{school.name}</h4>
                          <p className="text-sm text-gray-600">{school.location}</p>
                          <p className="text-sm text-success font-semibold">
                            {school.employment_rate}% employment rate
                          </p>
                        </div>
                        <div className="text-right">
                          <div className="text-sm text-gray-600">{t("emp.schools.totalGrads")}</div>
                          <div className="font-semibold text-gray-900">{school.total_graduates}</div>
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        <button
                          onClick={() => handleContactSchool(school)}
                          className="flex-1 bg-primary text-white px-3 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-colors"
                        >
                          {t("emp.schools.contact")}
                        </button>
                        <button
                          onClick={() => window.open(school.website, "_blank")}
                          className="px-3 py-2 border border-gray-300 rounded-lg text-sm font-semibold hover:bg-gray-50 transition-colors"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Success Stories */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">{t("emp.success.title")}</h2>
            <p className="text-lg text-gray-600">{t("emp.success.lead")}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {successStories.map((employer) => (
              <div key={employer.id} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white font-bold">
                    {employer.company_name.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <h3 className="font-bold text-gray-900">{employer.company_name}</h3>
                    <p className="text-sm text-gray-600">{employer.industry}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex items-center mb-2">
                    <Users className="h-4 w-4 text-gray-600 mr-2" />
                    <span className="text-sm text-gray-600">
                      Hired {employer.employees_hired} TVET graduates in {employer.hire_year}
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-500 mr-2" />
                    <span className="text-sm text-gray-600">
                      Salary: {new Intl.NumberFormat("en-RW").format(employer.salary_range_min)} -{" "}
                      {new Intl.NumberFormat("en-RW").format(employer.salary_range_max)} RWF
                    </span>
                  </div>
                </div>

                <blockquote className="text-gray-700 italic mb-4 text-sm leading-relaxed">
                  "{employer.testimonial}"
                </blockquote>

                <div className="text-xs text-gray-600">— {employer.contact_person}</div>

                {employer.hiring_status === "actively_hiring" && (
                  <div className="mt-4 bg-success/10 border border-success/20 rounded-lg p-3">
                    <div className="flex items-center text-success text-sm font-semibold">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Currently hiring {employer.positions_open} positions
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Recent Job Postings */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Ibyamamaza by’imirimo biheruka</h2>
              <button
                onClick={handlePostJob}
                className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent/90 transition-colors"
              >
                Tanga itangazo ry’umurimo
              </button>
            </div>

            <div className="space-y-4">
              {recentJobs.map((job) => (
                <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="font-semibold text-gray-900 mr-3">{job.title}</h3>
                        {job.urgent && (
                          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full">
                            Byihutirwa
                          </span>
                        )}
                      </div>
                      <div className="flex items-center text-sm text-gray-600 mb-2">
                        <MapPin className="h-4 w-4 mr-1" />
                        {job.location}
                        <Calendar className="h-4 w-4 ml-3 mr-1" />
                        Posted {new Date(job.posted_date).toLocaleDateString()}
                      </div>
                      <div className="text-sm text-gray-700">
                        Salary: {new Intl.NumberFormat("en-RW").format(job.salary_min)} -{" "}
                        {new Intl.NumberFormat("en-RW").format(job.salary_max)} RWF
                      </div>
                    </div>
                    <button
                      onClick={() => window.open(job.apply_url, "_blank")}
                      className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-secondary/90 transition-colors"
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-r from-secondary to-primary rounded-2xl p-8 text-white">
            <h2 className="text-2xl md:text-3xl font-bold mb-4">Ready to Hire TVET Talent?</h2>
            <p className="text-lg mb-6 opacity-90">
              Join {stats.totalEmployers}+ companies who have successfully hired skilled TVET graduates. Get access to
              work-ready talent with practical skills and strong work ethic.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handlePostJob}
                className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Post Your First Job
              </button>
              <button
                onClick={() =>
                  window.open("mailto:partnerships@tvetcareercatalyst.rw?subject=Partnership Inquiry", "_blank")
                }
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/10 transition-colors"
              >
                Explore Partnerships
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployerDashboard
