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
  Wrench,
  Hammer,
  Heart,
  Monitor,
  Palette,
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
    
    // Smooth scroll to the talent section after a short delay
    setTimeout(() => {
      const talentSection = document.getElementById('talent-section')
      if (talentSection) {
        talentSection.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        })
      }
    }, 100)
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

  const handleContactEmployer = (employer) => {
    const message = encodeURIComponent(
      `Hi ${employer.contact_person}, I found your company ${employer.company_name} through TVET Career Catalyst. I'm interested in learning more about your hiring needs and potential partnership opportunities.`,
    )
    window.open(`https://wa.me/${employer.contact_phone?.replace(/\s+/g, "") || "250788123456"}?text=${message}`, "_blank")
  }

  const handlePostJob = () => {
    // In a real app, this would open a job posting form
    window.open(
      "mailto:admin@tvetcareercatalyst.rw?subject=Job Posting Request&body=I would like to post a job opening. Please contact me to discuss details.",
      "_blank",
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <button onClick={() => navigate("/")} className="inline-flex items-center text-gray-600 hover:text-secondary mb-4 sm:mb-6 transition-colors min-h-[44px] px-2 py-2 rounded-lg hover:bg-blue-100">
            <span className="text-sm sm:text-base">{t("emp.back")}</span>
          </button>

          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">{t("emp.title")}</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">{t("emp.lead")}</p>
        </div>


        {/* Interactive Dashboard Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-6xl mx-auto">
          <PartnerWidget 
            icon={<Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-secondary" />} 
            value={stats.totalEmployers} 
            label={t("emp.stats.partners")}
            trend="+12% this month"
            color="secondary"
          />
          <PartnerWidget 
            icon={<Users className="h-6 w-6 sm:h-8 sm:w-8 text-success" />} 
            value={stats.totalHired} 
            label={t("emp.stats.hired")}
            trend="+8 new hires"
            color="success"
          />
          <PartnerWidget 
            icon={<Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-accent" />} 
            value={stats.totalPositions} 
            label={t("emp.stats.positions")}
            trend="Urgent hiring"
            color="accent"
          />
          <PartnerWidget 
            icon={<TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-primary" />} 
            value={stats.activelyHiring} 
            label={t("emp.stats.active")}
            trend="Growing demand"
            color="primary"
          />
        </div>

        {/* Skills Selection - Tag-Based System */}
        <div className="max-w-6xl mx-auto mb-8 sm:mb-12">
          <div className="text-center mb-6 sm:mb-8">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">{t("emp.skills.title")}</h2>
            <p className="text-base sm:text-lg text-gray-600 px-2">{t("emp.skills.desc")}</p>
          </div>

          {/* Skill Tags Grid */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6">
            {scenarios.map((scenario) => {
              const IconComponent = getIconComponent(scenario.icon)
              const isSelected = selectedScenario === scenario.id

              return (
                <button
                  key={scenario.id}
                  onClick={() => handleScenarioSelect(scenario.id)}
                  className={`group flex items-center gap-2 sm:gap-3 px-4 sm:px-6 py-3 sm:py-4 rounded-full border-2 transition-all duration-300 transform-gpu min-h-[44px] ${
                    isSelected
                      ? "border-secondary bg-secondary text-white shadow-lg scale-105"
                      : "border-gray-200 bg-white text-gray-700 hover:border-blue-300 hover:bg-blue-100 hover:text-blue-700 hover:scale-105"
                  }`}
                >
                  <IconComponent className={`h-5 w-5 sm:h-6 sm:w-6 transition-transform duration-300 ${isSelected ? 'text-white' : 'text-gray-600 group-hover:text-blue-700'}`} />
                  <span className="font-semibold text-sm sm:text-base whitespace-nowrap">
                    {scenario.title.replace("I like", "We need help with")}
                  </span>
                  {isSelected && (
                    <CheckCircle className="h-4 w-4 sm:h-5 sm:w-5 text-white ml-1" />
                  )}
                </button>
              )
            })}
          </div>

          {/* Selected Skill Details */}
          {selectedScenario && (
            <div className="bg-gradient-to-br from-secondary/5 to-primary/5 rounded-2xl p-6 sm:p-8 mb-8 sm:mb-12 max-w-4xl mx-auto border border-secondary/20">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  {(() => {
                    const scenario = scenarios.find(s => s.id === selectedScenario)
                    const IconComponent = getIconComponent(scenario?.icon)
                    return (
                      <div className="p-3 rounded-full bg-secondary/10">
                        <IconComponent className="h-6 w-6 text-secondary" />
                      </div>
                    )
                  })()}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2">
                    {scenarios.find(s => s.id === selectedScenario)?.title.replace("I like", "We need help with")}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {scenarios.find(s => s.id === selectedScenario)?.description.replace("You enjoy", "Find talent who excels at")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Available Talent - Moved to appear immediately after skills selection */}
        {showTalent && selectedScenario && (
          <div id="talent-section" className="max-w-6xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t("emp.talent.title")}</h2>

              {/* Graduates */}
              <div className="mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t("emp.talent.graduates", { count: talentData.graduates.length })}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {talentData.graduates.slice(0, 4).map((graduate) => (
                    <div 
                      key={graduate.id} 
                      className="group border p-4 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 transform-gpu cursor-pointer" 
                      style={{ backgroundColor: '#e6dfd8', borderRadius: '15px' }}
                      onClick={() => handleContactGraduate(graduate)}
                    >
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderRadius: '15px' }}></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-3 group-hover:scale-105 transition-transform duration-300">
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-secondary transition-colors duration-300">{graduate.name}</h4>
                            <p className="text-secondary font-medium group-hover:text-secondary/80 transition-colors duration-300">{graduate.current_role}</p>
                            <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{graduate.company}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{t("emp.talent.salary")}</div>
                            <div className="font-semibold text-gray-900 group-hover:text-secondary transition-colors duration-300">
                              {new Intl.NumberFormat("en-RW").format(graduate.current_salary)} RWF
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center text-sm text-gray-600 mb-3 group-hover:translate-x-1 transition-transform duration-300">
                          <MapPin className="h-4 w-4 mr-1 group-hover:text-secondary transition-colors duration-300" />
                          {graduate.location}
                          <Calendar className="h-4 w-4 ml-3 mr-1 group-hover:text-secondary transition-colors duration-300" />
                          {new Date().getFullYear() - graduate.graduation_year} {t("emp.talent.expYears")}
                        </div>

                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            handleContactGraduate(graduate)
                          }}
                          className="w-3/4 bg-secondary text-white px-4 py-2 text-sm font-semibold hover:bg-blue-500 transition-colors group-hover:scale-105 transform duration-300"
                          style={{ borderRadius: '15px' }}
                        >
                          {t("emp.talent.whatsapp")}
                        </button>
                      </div>

                      {/* Hover indicators */}
                      <div className="absolute top-3 right-3 w-2 h-2 bg-secondary/40 rounded-full group-hover:bg-secondary/60 transition-colors duration-300 group-hover:scale-125"></div>
                      <div className="absolute bottom-3 left-3 w-1 h-1 bg-primary/30 rounded-full group-hover:bg-primary/50 transition-colors duration-300 group-hover:scale-150"></div>

                      {/* Subtle pulse animation */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-secondary/20 transition-all duration-500" style={{ borderRadius: '15px' }}></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Partner Schools */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{t("emp.schools.title", { count: talentData.schools.length })}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {talentData.schools.map((school) => (
                    <div 
                      key={school.id} 
                      className="group border p-4 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 transform-gpu cursor-pointer" 
                      style={{ backgroundColor: '#e6dfd8', borderRadius: '15px' }}
                      onClick={() => handleContactSchool(school)}
                    >
                      {/* Animated background pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ borderRadius: '15px' }}></div>
                      
                      {/* Content */}
                      <div className="relative z-10">
                        <div className="flex justify-between items-start mb-3 group-hover:scale-105 transition-transform duration-300">
                          <div>
                            <h4 className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">{school.name}</h4>
                            <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{school.location}</p>
                            <p className="text-sm text-success font-semibold group-hover:text-success/80 transition-colors duration-300">
                              {school.employment_rate}% employment rate
                            </p>
                          </div>
                          <div className="text-right">
                            <div className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{t("emp.schools.totalGrads")}</div>
                            <div className="font-semibold text-gray-900 group-hover:text-primary transition-colors duration-300">{school.total_graduates}</div>
                          </div>
                        </div>

                        <div className="flex space-x-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              handleContactSchool(school)
                            }}
                            className="flex-1 bg-primary text-white px-3 py-2 text-sm font-semibold hover:bg-blue-500 transition-colors group-hover:scale-105 transform duration-300"
                            style={{ borderRadius: '15px' }}
                          >
                            {t("emp.schools.contact")}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(school.website, "_blank")
                            }}
                            className="px-3 py-2 border border-gray-300 text-sm font-semibold hover:bg-blue-100 transition-colors group-hover:scale-105 transform duration-300"
                            style={{ borderRadius: '15px' }}
                          >
                            <ExternalLink className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Hover indicators */}
                      <div className="absolute top-3 right-3 w-2 h-2 bg-primary/40 rounded-full group-hover:bg-primary/60 transition-colors duration-300 group-hover:scale-125"></div>
                      <div className="absolute bottom-3 left-3 w-1 h-1 bg-success/30 rounded-full group-hover:bg-success/50 transition-colors duration-300 group-hover:scale-150"></div>

                      {/* Subtle pulse animation */}
                      <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/20 transition-all duration-500" style={{ borderRadius: '15px' }}></div>
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
              <div 
                key={employer.id} 
                className="group bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl hover:scale-105 hover:-translate-y-2 transition-all duration-500 transform-gpu cursor-pointer" 
                style={{ backgroundColor: '#e6dfd8' }}
                onClick={() => handleContactEmployer(employer)}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl"></div>
                
                {/* Content */}
                <div className="relative z-10">
                  <div className="flex items-center mb-4 group-hover:scale-105 transition-transform duration-300">
                    <div className="w-12 h-12 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white font-bold shadow-md group-hover:shadow-lg transition-shadow duration-300">
                      {employer.company_name.charAt(0)}
                    </div>
                    <div className="ml-3">
                      <h3 className="font-bold text-gray-900 group-hover:text-secondary transition-colors duration-300">{employer.company_name}</h3>
                      <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">{employer.industry}</p>
                    </div>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-center mb-2 group-hover:translate-x-1 transition-transform duration-300">
                      <Users className="h-4 w-4 text-gray-600 mr-2 group-hover:text-secondary transition-colors duration-300" />
                      <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        Hired {employer.employees_hired} TVET graduates in {employer.hire_year}
                      </span>
                    </div>
                    <div className="flex items-center group-hover:translate-x-1 transition-transform duration-300">
                      <Star className="h-4 w-4 text-yellow-500 mr-2 group-hover:text-yellow-600 transition-colors duration-300" />
                      <span className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                        Salary: {new Intl.NumberFormat("en-RW").format(employer.salary_range_min)} -{" "}
                        {new Intl.NumberFormat("en-RW").format(employer.salary_range_max)} RWF
                      </span>
                    </div>
                  </div>

                  <blockquote className="text-gray-700 italic mb-4 text-sm leading-relaxed group-hover:text-gray-800 transition-colors duration-300">
                    "{employer.testimonial}"
                  </blockquote>

                  <div className="text-xs text-gray-600 group-hover:text-gray-700 transition-colors duration-300">— {employer.contact_person}</div>

                  {employer.hiring_status === "actively_hiring" && (
                    <div className="mt-4 bg-success/10 border border-success/20 rounded-lg p-3 group-hover:bg-success/20 group-hover:border-success/30 transition-all duration-300">
                      <div className="flex items-center text-success text-sm font-semibold group-hover:text-success/80 transition-colors duration-300">
                        <CheckCircle className="h-4 w-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                        Currently hiring {employer.positions_open} positions
                      </div>
                    </div>
                  )}
                </div>

                {/* Hover indicator */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-secondary/40 rounded-full group-hover:bg-secondary/60 transition-colors duration-300 group-hover:scale-125"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-primary/30 rounded-full group-hover:bg-primary/50 transition-colors duration-300 group-hover:scale-150"></div>

                {/* Subtle pulse animation */}
                <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-secondary/20 transition-all duration-500"></div>
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
                className="bg-accent text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors"
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
                      className="bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-500 transition-colors"
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
                className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
              >
                Post Your First Job
              </button>
              <button
                onClick={() =>
                  window.open("mailto:partnerships@tvetcareercatalyst.rw?subject=Partnership Inquiry", "_blank")
                }
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors"
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

// Icon mapping function for skills
const getIconComponent = (iconName) => {
  const iconMap = {
    wrench: Wrench,
    hammer: Hammer,
    heart: Heart,
    monitor: Monitor,
    palette: Palette,
    briefcase: Briefcase,
  }
  return iconMap[iconName] || Briefcase
}

// Interactive Partner Widget Component
const PartnerWidget = ({ icon, value, label, trend, color }) => {
  const colorClasses = {
    secondary: {
      bg: 'from-blue-50 to-indigo-50',
      border: 'border-blue-200',
      hoverBorder: 'hover:border-blue-300',
      iconBg: 'from-blue-100 to-indigo-100',
      hoverIconBg: 'group-hover:from-blue-200 group-hover:to-indigo-200',
      valueColor: 'text-blue-700 group-hover:text-blue-800',
      trendColor: 'text-blue-600'
    },
    success: {
      bg: 'from-green-50 to-emerald-50',
      border: 'border-green-200',
      hoverBorder: 'hover:border-green-300',
      iconBg: 'from-green-100 to-emerald-100',
      hoverIconBg: 'group-hover:from-green-200 group-hover:to-emerald-200',
      valueColor: 'text-green-700 group-hover:text-green-800',
      trendColor: 'text-green-600'
    },
    accent: {
      bg: 'from-purple-50 to-pink-50',
      border: 'border-purple-200',
      hoverBorder: 'hover:border-purple-300',
      iconBg: 'from-purple-100 to-pink-100',
      hoverIconBg: 'group-hover:from-purple-200 group-hover:to-pink-200',
      valueColor: 'text-purple-700 group-hover:text-purple-800',
      trendColor: 'text-purple-600'
    },
    primary: {
      bg: 'from-orange-50 to-red-50',
      border: 'border-orange-200',
      hoverBorder: 'hover:border-orange-300',
      iconBg: 'from-orange-100 to-red-100',
      hoverIconBg: 'group-hover:from-orange-200 group-hover:to-red-200',
      valueColor: 'text-orange-700 group-hover:text-orange-800',
      trendColor: 'text-orange-600'
    }
  }

  const colors = colorClasses[color] || colorClasses.secondary

  return (
    <div className={`group rounded-2xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border ${colors.border} text-center hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:scale-105 hover:-translate-y-2 transition-all duration-500 ${colors.hoverBorder} relative overflow-hidden transform-gpu bg-gradient-to-br ${colors.bg}`}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
          <div className={`p-3 rounded-full bg-gradient-to-br ${colors.iconBg} ${colors.hoverIconBg} transition-all duration-300 shadow-md`}>
            {icon}
          </div>
        </div>
        <div className={`text-3xl md:text-4xl lg:text-5xl font-bold ${colors.valueColor} mb-2 transition-colors duration-300`}>
          {value}
        </div>
        <div className="text-sm md:text-base text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300 mb-2">
          {label}
        </div>
        <div className={`text-xs font-semibold ${colors.trendColor} opacity-80 group-hover:opacity-100 transition-opacity duration-300`}>
          {trend}
        </div>
      </div>

      {/* Animated decorative elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-white/40 rounded-full group-hover:bg-white/60 transition-colors duration-300 group-hover:scale-125"></div>
      <div className="absolute bottom-4 left-4 w-1 h-1 bg-white/30 rounded-full group-hover:bg-white/50 transition-colors duration-300 group-hover:scale-150"></div>

      {/* Subtle pulse animation */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-white/20 transition-all duration-500"></div>
    </div>
  )
}

export default EmployerDashboard
