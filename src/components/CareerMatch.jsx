"use client"

import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, TrendingUp, DollarSign, Users, CheckCircle, Zap, Shield, Wrench, Cpu, Lightbulb, Target } from "lucide-react"
import { matchCareerToScenario, getScenarioById, formatSalary } from "../utils/matching"
import { useI18n } from "../context/i18n"

const CareerMatch = () => {
  const { scenarioId } = useParams()
  const navigate = useNavigate()
  const { t, lang } = useI18n()

  const scenario = getScenarioById(scenarioId)
  const career = matchCareerToScenario(scenarioId)

  if (!career || !scenario) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Career not found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-500 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const handleViewGraduates = () => {
    navigate(`/graduates/${career.id}`)
  }

  const getDemandColor = (level) => {
    switch (level) {
      case "Very High":
        return "text-green-600 bg-green-100"
      case "High":
        return "text-blue-600 bg-blue-100"
      default:
        return "text-gray-600 bg-gray-100"
    }
  }

  // Skill icon mapping
  const getSkillIcon = (skill) => {
    const skillLower = skill.toLowerCase()
    if (skillLower.includes('electrical') || skillLower.includes('power')) return Zap
    if (skillLower.includes('safety') || skillLower.includes('protocol')) return Shield
    if (skillLower.includes('mechanical') || skillLower.includes('repair')) return Wrench
    if (skillLower.includes('computer') || skillLower.includes('digital')) return Cpu
    if (skillLower.includes('problem') || skillLower.includes('analysis')) return Lightbulb
    if (skillLower.includes('planning') || skillLower.includes('project')) return Target
    return CheckCircle
  }

  // Calculate salary progress (0-100 based on min/max range)
  const getSalaryProgress = () => {
    const min = career.average_salary_min
    const max = career.average_salary_max
    const range = max - min
    return Math.min(100, Math.max(0, ((min - 100000) / (500000 - 100000)) * 100))
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button onClick={() => navigate(`/scenarios/student`)} className="inline-flex items-center text-gray-600 hover:text-primary mb-4 sm:mb-6 transition-colors min-h-[44px] px-2 py-2 rounded-lg hover:bg-blue-100">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            <span className="text-sm sm:text-base">{t("career.backToScenarios")}</span>
          </button>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-success rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                ✓
              </div>
              <div className="w-8 sm:w-16 h-1 bg-success"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">
                2
              </div>
              <div className="w-8 sm:w-16 h-1 bg-gray-300"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs sm:text-sm">
                3
              </div>
              <div className="w-8 sm:w-16 h-1 bg-gray-300"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs sm:text-sm">
                4
              </div>
            </div>
          </div>
        </div>

        {/* Compact Hero Section - Matching Card Width */}
        <div className="max-w-4xl mx-auto mb-6 sm:mb-8">
          <div className="relative h-32 sm:h-40 rounded-xl overflow-hidden shadow-lg">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-secondary/80 to-accent/70"></div>
            <div className="absolute inset-0 bg-black/20"></div>
            
            {/* Hero Content */}
            <div className="relative z-10 h-full flex flex-col justify-center items-center text-center px-4 sm:px-8">
              <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-2 leading-tight">
                {lang === "rw" && career.title_rw ? career.title_rw : career.title}
              </h1>
              <p className="text-sm sm:text-base text-white/90 max-w-2xl leading-relaxed">
                {t("career.perfectMatch")} - Based on your interest in "{scenario.title.toLowerCase()}"
              </p>
            </div>
          </div>
        </div>

        {/* Career Match Result */}
        <div className="max-w-4xl mx-auto">

          {/* Career Match Result - PROMINENT */}
          <div className="bg-gradient-to-br from-primary/5 via-white to-secondary/5 rounded-2xl shadow-[0_12px_40px_rgb(0,0,0,0.15)] p-6 sm:p-8 md:p-10 mb-6 sm:mb-8 border-2 border-primary/20 hover:shadow-[0_20px_60px_rgb(0,0,0,0.2)] hover:-translate-y-2 transition-all duration-500 transform-gpu relative overflow-hidden">
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 text-center mb-6 sm:mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-full mb-4 shadow-lg">
                <CheckCircle className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
                🎯 {lang === "rw" && career.title_rw ? career.title_rw : career.title}
              </h2>
              <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed max-w-3xl mx-auto font-medium">
                {lang === "rw" && career.description_rw ? career.description_rw : career.description}
              </p>
            </div>

            {/* Key Metrics with Enhanced Visualizations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
              {/* Salary - Progress Bar */}
              <div className="group p-4 sm:p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200 hover:shadow-lg hover:scale-105 transition-all duration-500 transform-gpu relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-green-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-3">
                    <DollarSign className="h-6 w-6 sm:h-7 sm:w-7 text-green-600" />
                  </div>
                  <div className="text-center mb-3">
                    <div className="text-lg sm:text-xl font-bold text-gray-900 mb-1">
                      {formatSalary(career.average_salary_min, career.average_salary_max)}
                    </div>
                    <div className="text-sm text-gray-600 font-medium">{t("career.monthlySalary")}</div>
                  </div>
                  {/* Animated Progress Bar */}
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${getSalaryProgress()}%` }}
                    ></div>
                  </div>
                  <div className="text-xs text-gray-500 text-center">Salary Range Progress</div>
                </div>
              </div>

              {/* Employment Rate - Circular Progress */}
              <div className="group p-4 sm:p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200 hover:shadow-lg hover:scale-105 transition-all duration-500 transform-gpu relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-3">
                    <Users className="h-6 w-6 sm:h-7 sm:w-7 text-blue-600" />
                  </div>
                  {/* Circular Progress Indicator */}
                  <div className="relative w-20 h-20 mx-auto mb-3">
                    <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                      <path
                        className="text-gray-200"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="none"
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                      <path
                        className="text-blue-600 transition-all duration-1000 ease-out"
                        stroke="currentColor"
                        strokeWidth="3"
                        strokeLinecap="round"
                        fill="none"
                        strokeDasharray={`${career.employment_rate}, 100`}
                        d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-lg font-bold text-gray-900">{career.employment_rate}%</span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600 font-medium text-center">{t("career.employmentRate")}</div>
                </div>
              </div>

              {/* Market Demand - Line Graph */}
              <div className="group p-4 sm:p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200 hover:shadow-lg hover:scale-105 transition-all duration-500 transform-gpu relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-center justify-center mb-3">
                    <TrendingUp className="h-6 w-6 sm:h-7 sm:w-7 text-orange-600" />
                  </div>
                  {/* Animated Line Graph */}
                  <div className="h-16 mb-3 flex items-end justify-center space-x-1">
                    <div className="w-2 bg-orange-300 rounded-t transition-all duration-1000 ease-out" style={{ height: '20%' }}></div>
                    <div className="w-2 bg-orange-400 rounded-t transition-all duration-1000 ease-out delay-100" style={{ height: '40%' }}></div>
                    <div className="w-2 bg-orange-500 rounded-t transition-all duration-1000 ease-out delay-200" style={{ height: '70%' }}></div>
                    <div className="w-2 bg-orange-600 rounded-t transition-all duration-1000 ease-out delay-300" style={{ height: '90%' }}></div>
                    <div className="w-2 bg-green-500 rounded-t transition-all duration-1000 ease-out delay-400" style={{ height: '100%' }}></div>
                  </div>
                  <div className={`text-sm font-bold px-3 py-1 rounded-full ${getDemandColor(career.demand_level)} text-center`}>
                    {lang === "rw" && career.demand_level_rw ? career.demand_level_rw : career.demand_level}
                  </div>
                  <div className="text-xs text-gray-600 font-medium mt-1 text-center">500+ new jobs annually</div>
                </div>
              </div>
            </div>


            {/* Interactive Key Skills */}
            <div className="mb-8">
              <h3 className="text-xl font-bold text-gray-900 mb-6">{t("career.keySkills")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {(lang === "rw" && career.key_skills_rw ? career.key_skills_rw : career.key_skills).map((skill, index) => {
                  const IconComponent = getSkillIcon(skill)
                  return (
                    <div key={index} className="group flex items-center bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-4 border border-green-200 hover:border-green-300 hover:shadow-lg hover:scale-105 transition-all duration-300 transform-gpu cursor-pointer">
                      <div className="flex items-center justify-center w-10 h-10 bg-green-200 rounded-full mr-3 group-hover:bg-green-300 group-hover:scale-110 transition-all duration-300">
                        <IconComponent className="h-5 w-5 text-green-700" />
                      </div>
                      <span className="text-gray-700 text-sm font-medium group-hover:text-gray-900 transition-colors duration-300">{skill}</span>
                    </div>
                  )
                })}
              </div>
            </div>

            {/* Why This Matches - Enhanced Design with Light Green Background */}
            <div className="bg-green-100 rounded-xl p-6 mb-8 relative overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-500 transform-gpu">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -translate-y-16 translate-x-16"></div>
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full translate-y-12 -translate-x-12"></div>
              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center mr-4">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900">{t("career.whyMatch")}</h3>
                </div>
                <div className="space-y-3 text-gray-700 leading-relaxed">
                  <p className="text-sm">
                    Since you enjoy <span className="font-semibold text-primary">{scenario.description.toLowerCase()}</span>, 
                    <span className="font-semibold text-secondary"> {career.title}</span> is perfect because it combines
                    hands-on technical work with problem-solving.
                  </p>
                  <p className="text-sm">
                    You'll use your natural interests to build a rewarding career with excellent earning potential and job security.
                  </p>
                </div>
              </div>
            </div>

            {/* Enhanced Call to Action - Fixed Text Visibility */}
            <div className="text-center px-2">
              <button
                onClick={handleViewGraduates}
                className="group relative bg-gradient-to-r from-primary to-secondary text-black px-8 sm:px-10 py-4 sm:py-5 rounded-xl text-base sm:text-lg font-bold transition-all duration-500 inline-flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:scale-105 hover:-translate-y-2 transform-gpu min-h-[44px] min-w-[44px] overflow-hidden border-2 border-white/20"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-secondary to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-20 flex items-center text-black font-bold drop-shadow-sm">
                  <span className="text-black font-bold">{t("career.meetGraduates")}</span>
                  <ArrowRight className="ml-3 h-5 w-5 text-black group-hover:translate-x-1 transition-transform duration-300" />
                </div>
                {/* Subtle pulse animation */}
                <div className="absolute inset-0 rounded-xl bg-white/10 opacity-0 group-hover:opacity-100 group-hover:animate-pulse"></div>
              </button>
              <p className="text-gray-600 mt-3 text-sm font-medium">See how others like you succeeded in this career</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerMatch
