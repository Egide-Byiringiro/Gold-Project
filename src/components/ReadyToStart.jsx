"use client"

import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft, Rocket, CheckCircle, Phone, MessageCircle } from "lucide-react"
import { getCareerById } from "../utils/matching"
import ActionButtons from "./ActionButtons"

const ReadyToStart = () => {
  const navigate = useNavigate()
  const { careerId } = useParams()
  const career = getCareerById(careerId)

  if (!career) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Career not found</h2>
          <button onClick={() => navigate("/")} className="bg-primary text-white px-5 sm:px-6 py-3 rounded-lg hover:bg-primary/90 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:scale-105 hover:-translate-y-1 transform-gpu min-h-[44px] min-w-[44px]">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-600 hover:text-primary mb-4 sm:mb-6 transition-colors min-h-[44px] px-2 py-2 rounded-lg hover:bg-gray-50">
          <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
          <span className="text-sm sm:text-base">Back</span>
        </button>

        {/* Progress Indicator (only step 4) */}
        <div className="flex justify-center mb-6 sm:mb-8">
          <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">4</div>
        </div>

        <div className="max-w-4xl mx-auto">
          

          {/* Reuse the actionable card set without its own progress bar */}
          <ActionButtons careerId={careerId} hideProgress={true} />
        </div>
      </div>
    </div>
  )
}

export default ReadyToStart


