"use client"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { GraduationCap, MessageCircle, Share2, Heart, ExternalLink, CheckCircle } from "lucide-react"
import { getSchoolsForCareer, getCareerById } from "../utils/matching"
import { useI18n } from "../context/i18n"

const ActionButtons = ({ careerId, hideProgress = false }) => {
  const navigate = useNavigate()
  const [shared, setShared] = useState(false)
  const [showSchools, setShowSchools] = useState(false)
  const { t } = useI18n()

  const career = getCareerById(careerId)
  const schools = getSchoolsForCareer(careerId)

  const handleApplyToSchool = (school) => {
    window.open(school.application_url, "_blank")
  }

  const handleContactMentor = () => {
    // Get a random graduate for mentorship
    const mentorPhone = "+250 788 123 456" // This would be from a mentor pool
    const message = encodeURIComponent(
      `Hi! I found you through TVET Career Catalyst. I'm interested in pursuing a career in ${career.title} and would love some guidance. Could we chat?`,
    )
    window.open(`https://wa.me/${mentorPhone}?text=${message}`, "_blank")
  }

  const handleShare = async () => {
    const shareData = {
      title: `Check out this career: ${career.title}`,
      text: `I discovered an amazing career opportunity in ${career.title} through TVET Career Catalyst. Graduates earn ${career.average_salary_min.toLocaleString()} - ${career.average_salary_max.toLocaleString()} RWF monthly!`,
      url: window.location.href,
    }

    if (navigator.share) {
      try {
        await navigator.share(shareData)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      } catch (err) {
        // Fallback to copying to clipboard
        navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
        setShared(true)
        setTimeout(() => setShared(false), 2000)
      }
    } else {
      // Fallback for browsers without Web Share API
      navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`)
      setShared(true)
      setTimeout(() => setShared(false), 2000)
    }
  }

  const handleParentGuide = () => {
    navigate("/parents")
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator (optional) */}
      {!hideProgress && (
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
            <div className="w-16 h-1 bg-success"></div>
            <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center text-white text-sm font-bold">✓</div>
            <div className="w-16 h-1 bg-success"></div>
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">3</div>
          </div>
        </div>
      )}

      {/* Main Action Section */}
      <div className="bg-white rounded-xl shadow-lg p-6 mb-6 border border-gray-100">
        <div className="text-center mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-3">{t("actions.readyTitle")}</h2>
          <p className="text-base text-gray-600">{t("actions.readyDesc", { career: career.title })}</p>
        </div>

        {/* Primary Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {/* Apply to School */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg p-4 border border-primary/20">
            <div className="flex items-center mb-3">
              <div className="bg-primary rounded-full p-2 mr-3">
                <GraduationCap className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{t("actions.apply")}</h3>
                <p className="text-gray-600 text-sm">{t("actions.applyDesc")}</p>
              </div>
            </div>

            {!showSchools ? (
              <button
                onClick={() => setShowSchools(true)}
                className="w-full bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary/90 transition-all duration-200 hover:shadow-lg hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-primary/50"
              >
                {t("actions.viewSchools")}
              </button>
            ) : (
              <div className="space-y-2">
                {schools.map((school) => (
                  <div key={school.id} className="bg-white rounded-lg p-3 border border-gray-200">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-sm">{school.name}</h4>
                        <p className="text-xs text-gray-600">{school.location}</p>
                        <p className="text-xs text-success font-semibold">{school.employment_rate}% employment rate</p>
                      </div>
                      <button
                        onClick={() => handleApplyToSchool(school)}
                        className="bg-primary text-white px-3 py-1 rounded-lg text-xs font-semibold hover:bg-primary/90 transition-all duration-200 flex items-center hover:shadow-lg hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-primary/50"
                      >
                        Apply
                        <ExternalLink className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Contact Mentor */}
          <div className="bg-gradient-to-r from-secondary/10 to-secondary/5 rounded-lg p-4 border border-secondary/20">
            <div className="flex items-center mb-3">
              <div className="bg-secondary rounded-full p-2 mr-3">
                <MessageCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">{t("actions.mentor")}</h3>
                <p className="text-gray-600 text-sm">{t("actions.mentorDesc")}</p>
              </div>
            </div>
            <button
              onClick={handleContactMentor}
              className="w-full bg-secondary text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:shadow-lg opacity-95 hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-secondary/50"
            >
              {t("actions.contactMentor")}
            </button>
          </div>
        </div>

        {/* Secondary Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Share with Friends */}
          <button
            onClick={handleShare}
            className="bg-gradient-to-r from-accent/10 to-accent/5 border border-accent/20 rounded-lg p-4 hover:bg-accent/10 transition-all duration-200 text-left hover:shadow-lg hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-accent/50"
          >
            <div className="flex items-center">
              <div className="bg-accent rounded-full p-2 mr-3">
                {shared ? <CheckCircle className="h-4 w-4 text-white" /> : <Share2 className="h-4 w-4 text-white" />}
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{shared ? "Shared Successfully!" : t("actions.share")}</h3>
                <p className="text-gray-600 text-sm">{shared ? "Link copied to clipboard" : t("actions.shareDesc")}</p>
              </div>
            </div>
          </button>

          {/* Parent Guide */}
          <button
            onClick={handleParentGuide}
            className="bg-gradient-to-r from-pink-50 to-pink-100 border border-pink-200 rounded-lg p-4 hover:bg-pink-100 transition-all duration-200 text-left hover:shadow-lg hover:scale-105 transform focus:outline-none focus:ring-2 focus:ring-pink-500/50"
          >
            <div className="flex items-center">
              <div className="bg-pink-500 rounded-full p-2 mr-3">
                <Heart className="h-4 w-4 text-white" />
              </div>
              <div>
                <h3 className="text-base font-bold text-gray-900">{t("actions.parents")}</h3>
                <p className="text-gray-600 text-sm">{t("actions.parentsDesc")}</p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Success Message */}
      <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-lg p-4 text-center">
        <CheckCircle className="h-8 w-8 text-success mx-auto mb-3" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">You're on the Right Path!</h3>
        <p className="text-gray-700 text-sm">
          Thousands of TVET graduates are building successful careers. Your journey to {career.title} starts with a
          single step.
        </p>
      </div>
    </div>
  )
}

export default ActionButtons
