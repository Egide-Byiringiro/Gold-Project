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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Career not found</h2>
          <button onClick={() => navigate("/")} className="bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors">
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-sky">
      <div className="container mx-auto px-4 py-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-600 hover:text-primary mb-6 transition-colors">
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back
        </button>

        {/* Progress Indicator (only step 4) */}
        <div className="flex justify-center mb-8">
          <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">4</div>
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


