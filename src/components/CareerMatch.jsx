"use client"

import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, ArrowRight, TrendingUp, DollarSign, Users, CheckCircle } from "lucide-react"
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
            className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors"
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

  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button onClick={() => navigate(`/scenarios/student`)} className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition-colors">
            <ArrowLeft className="h-5 w-5 mr-2" />
            {t("career.backToScenarios")}
          </button>

          {/* Progress Indicator */}
          <div className="flex justify-center mb-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white text-sm font-bold">
                ✓
              </div>
              <div className="w-16 h-1 bg-success"></div>
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                2
              </div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm">
                3
              </div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm">
                4
              </div>
            </div>
          </div>
        </div>

        {/* Career Match Result */}
        <div className="max-w-3xl mx-auto">
          {/* Match Explanation */}
          <div className="text-center mb-6">
            <h1 className="text-2xl md:text-4xl font-bold text-gray-900 mb-3">{t("career.perfectMatch")}</h1>
            <p className="text-base text-gray-600">
              Based on your interest in "{scenario.title.toLowerCase()}", here's your ideal career path:
            </p>
          </div>

          {/* Career Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 md:p-8 mb-6 border border-gray-100">
            <div className="text-center mb-6">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">{lang === "rw" && career.title_rw ? career.title_rw : career.title}</h2>
              <p className="text-base text-gray-600 leading-relaxed">{lang === "rw" && career.description_rw ? career.description_rw : career.description}</p>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {/* Salary */}
              <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg border border-green-200">
                <div className="flex items-center justify-center mb-2">
                  <DollarSign className="h-6 w-6 text-green-600" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-1">
                  {formatSalary(career.average_salary_min, career.average_salary_max)}
                </div>
                <div className="text-sm text-gray-600 font-medium">{t("career.monthlySalary")}</div>
              </div>

              {/* Employment Rate */}
              <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <div className="flex items-center justify-center mb-2">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-lg font-bold text-gray-900 mb-1">{career.employment_rate}%</div>
                <div className="text-sm text-gray-600 font-medium">{t("career.employmentRate")}</div>
              </div>

              {/* Demand Level */}
              <div className="text-center p-4 bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg border border-orange-200">
                <div className="flex items-center justify-center mb-2">
                  <TrendingUp className="h-6 w-6 text-orange-600" />
                </div>
                <div className={`text-sm font-bold px-2 py-1 rounded-full ${getDemandColor(career.demand_level)}`}>
                  {lang === "rw" && career.demand_level_rw ? career.demand_level_rw : career.demand_level}
                </div>
                <div className="text-sm text-gray-600 font-medium mt-1">{t("career.marketDemand")}</div>
              </div>
            </div>

            {/* Growth Potential */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 mb-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-2 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-primary" />
                {t("career.growthPotential")}
              </h3>
              <p className="text-gray-700 leading-relaxed text-sm">{lang === "rw" && career.growth_potential_rw ? career.growth_potential_rw : career.growth_potential}</p>
            </div>

            {/* Key Skills */}
            <div className="mb-6">
              <h3 className="text-lg font-bold text-gray-900 mb-3">{t("career.keySkills")}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {(lang === "rw" && career.key_skills_rw ? career.key_skills_rw : career.key_skills).map((skill, index) => (
                  <div key={index} className="flex items-center bg-green-50 rounded-lg p-2 border border-green-200">
                    <CheckCircle className="h-4 w-4 text-success mr-2 flex-shrink-0" />
                    <span className="text-gray-700 text-sm font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Why This Matches */}
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-4 mb-6 border border-primary/20">
              <h3 className="text-lg font-bold text-gray-900 mb-2">{t("career.whyMatch")}</h3>
              <p className="text-gray-700 leading-relaxed text-sm">
                Since you enjoy {scenario.description.toLowerCase()}, {career.title} is perfect because it combines
                hands-on technical work with problem-solving. You'll use your natural interests to build a rewarding
                career with excellent earning potential and job security.
              </p>
            </div>

            {/* Call to Action */}
            <div className="text-center">
              <button
                onClick={handleViewGraduates}
                className="bg-primary text-white px-6 py-3 rounded-lg text-base font-semibold transition-all duration-200 inline-flex items-center shadow-lg hover:shadow-xl opacity-95 hover:opacity-90"
              >
                {t("career.meetGraduates")}
                <ArrowRight className="ml-2 h-4 w-4" />
              </button>
              <p className="text-gray-600 mt-2 text-sm">See how others like you succeeded in this career</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CareerMatch
