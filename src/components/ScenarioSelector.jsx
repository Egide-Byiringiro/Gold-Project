"use client"

import { useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Wrench, Hammer, Heart, Monitor, Palette, Briefcase, ArrowRight, ArrowLeft } from "lucide-react"
import { getAllScenarios } from "../utils/matching"
import { useI18n } from "../context/i18n"

const iconMap = {
  wrench: Wrench,
  hammer: Hammer,
  heart: Heart,
  monitor: Monitor,
  palette: Palette,
  briefcase: Briefcase,
}

const ScenarioSelector = () => {
  const { userType } = useParams()
  const navigate = useNavigate()
  const [selectedScenario, setSelectedScenario] = useState(null)
  const scenarios = getAllScenarios()
  const { t, lang } = useI18n()

  const handleScenarioSelect = (scenarioId) => {
    setSelectedScenario(scenarioId)
  }

  const handleContinue = () => {
    if (selectedScenario) {
      navigate(`/career-match/${selectedScenario}`)
    }
  }

  const getTitle = () => {
    switch (userType) {
      case "student":
        return t("scenario.title.student")
      case "employer":
        return "What skills do you need?"
      default:
        return "Select your interest"
    }
  }

  const getDescription = () => {
    switch (userType) {
      case "student":
        return t("scenario.desc.student")
      case "employer":
        return "Select the type of work you need help with. We'll show you available talent."
      default:
        return "Select what interests you most"
    }
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">{getTitle()}</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-2xl mx-auto px-2">{getDescription()}</p>

          {/* Progress Indicator (4 steps) */}
          <div className="flex justify-center mt-6 sm:mt-8">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">1</div>
              <div className="w-8 sm:w-16 h-1 bg-gray-300"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs sm:text-sm">2</div>
              <div className="w-8 sm:w-16 h-1 bg-gray-300"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs sm:text-sm">3</div>
              <div className="w-8 sm:w-16 h-1 bg-gray-300"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs sm:text-sm">4</div>
            </div>
          </div>
        </div>

        {/* Scenario Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 max-w-6xl mx-auto mb-8 sm:mb-12">
          {scenarios.map((scenario) => {
            const IconComponent = iconMap[scenario.icon] || Briefcase
            const localTitle = (lang === "rw" && scenario.title_rw ? scenario.title_rw : scenario.title) || "Untitled"
            const localDesc = (lang === "rw" && scenario.description_rw ? scenario.description_rw : scenario.description) || ""
            const isSelected = selectedScenario === scenario.id

            return (
              <button
                key={scenario.id}
                onClick={() => handleScenarioSelect(scenario.id)}
                className={`group p-6 sm:p-8 rounded-xl border-2 shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-500 text-left transform-gpu min-h-[44px] relative overflow-hidden ${
                  isSelected
<<<<<<< HEAD
                    ? "border-primary shadow-[0_20px_60px_rgb(0,0,0,0.15)] transform scale-105 -translate-y-2"
                    : "border-gray-200 hover:border-primary/50 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-2 hover:scale-105"
=======
                    ? "border-primary bg-primary/5 shadow-[0_20px_60px_rgb(0,0,0,0.15)] transform scale-105 -translate-y-2"
                    : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-100 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-2 hover:scale-105"
>>>>>>> ft/mybuttons
                }`}
                style={{ backgroundColor: '#d6d6d0' }}
              >
                {/* Layered shadow system for floating effect */}
                <div className="absolute inset-0 rounded-xl shadow-[0_4px_20px_rgb(0,0,0,0.08)] group-hover:shadow-[0_12px_40px_rgb(0,0,0,0.12)] transition-shadow duration-500"></div>
                
                {/* Animated background gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex flex-col items-center text-center relative z-10">
                  <div
                    className={`rounded-full p-3 sm:p-4 mb-3 sm:mb-4 transition-all duration-300 shadow-md group-hover:scale-110 ${
                      isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-600 group-hover:bg-blue-200 group-hover:text-blue-700"
                    }`}
                  >
                    <IconComponent className="h-6 w-6 sm:h-8 sm:w-8" />
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-700 transition-colors duration-300">{localTitle}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300">{localDesc}</p>

                  {isSelected && (
                    <div className="mt-3 sm:mt-4 flex items-center text-primary font-semibold text-sm sm:text-base">
                      <span>Selected</span>
                    </div>
                  )}
                </div>
                
                {/* Decorative elements */}
                <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors duration-300"></div>
                <div className="absolute bottom-4 left-4 w-1 h-1 bg-secondary/20 rounded-full group-hover:bg-secondary/40 transition-colors duration-300"></div>
              </button>
            )
          })}
        </div>

        {/* Continue Button */}
        {selectedScenario && (
          <div className="text-center px-4">
            <button
              onClick={handleContinue}
              className="bg-primary text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold hover:bg-blue-500 transition-all duration-300 inline-flex items-center shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:scale-105 hover:-translate-y-1 transform-gpu min-h-[44px] min-w-[44px]"
            >
              {t("scenario.continue")}
              <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScenarioSelector
