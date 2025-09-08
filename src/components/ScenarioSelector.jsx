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
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-900 mb-4">{getTitle()}</h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">{getDescription()}</p>

          {/* Progress Indicator (4 steps) */}
          <div className="flex justify-center mt-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">1</div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm">2</div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm">3</div>
              <div className="w-16 h-1 bg-gray-300"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-sm">4</div>
            </div>
          </div>
        </div>

        {/* Scenario Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
          {scenarios.map((scenario) => {
            const IconComponent = iconMap[scenario.icon]
            const localTitle = lang === "rw" && scenario.title_rw ? scenario.title_rw : scenario.title
            const localDesc = lang === "rw" && scenario.description_rw ? scenario.description_rw : scenario.description
            const isSelected = selectedScenario === scenario.id

            return (
              <button
                key={scenario.id}
                onClick={() => handleScenarioSelect(scenario.id)}
                className={`p-8 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                  isSelected
                    ? "border-primary bg-primary/5 shadow-lg transform scale-105"
                    : "border-gray-200 bg-white hover:border-primary/50"
                }`}
              >
                <div className="flex flex-col items-center text-center">
                  <div
                    className={`rounded-full p-4 mb-4 transition-colors ${
                      isSelected ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    <IconComponent className="h-8 w-8" />
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">{localTitle}</h3>
                  <p className="text-gray-600 leading-relaxed">{localDesc}</p>

                  {isSelected && (
                    <div className="mt-4 flex items-center text-primary font-semibold">
                      <span>Selected</span>
                    </div>
                  )}
                </div>
              </button>
            )
          })}
        </div>

        {/* Continue Button */}
        {selectedScenario && (
          <div className="text-center">
            <button
              onClick={handleContinue}
              className="bg-primary text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-primary/90 transition-colors inline-flex items-center shadow-lg hover:shadow-xl hover:scale-105 transform transition-all duration-200"
            >
              {t("scenario.continue")}
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default ScenarioSelector
