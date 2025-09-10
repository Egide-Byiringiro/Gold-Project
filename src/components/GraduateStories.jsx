"use client"

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ArrowLeft, Phone, MessageCircle, MapPin, Calendar, Building2, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react"
import { getGraduatesForCareer, getCareerById } from "../utils/matching"
import { useI18n } from "../context/i18n"

const GraduateStories = () => {
  const { careerId } = useParams()
  const navigate = useNavigate()
  const [currentSlide, setCurrentSlide] = useState(0)
  const { t } = useI18n()

  const career = getCareerById(careerId)
  const graduates = getGraduatesForCareer(careerId)

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % graduates.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [graduates.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % graduates.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + graduates.length) % graduates.length)
  }

  if (!career) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">Career not found</h2>
          <button
            onClick={() => navigate("/")}
            className="bg-primary text-white px-5 sm:px-6 py-3 rounded-lg hover:bg-blue-500 transition-all duration-300 shadow-[0_8px_30px_rgb(0,0,0,0.12)] hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:scale-105 hover:-translate-y-1 transform-gpu min-h-[44px] min-w-[44px]"
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  const handleWhatsAppContact = (phone, name) => {
    const message = encodeURIComponent(
      `Hi ${name}, I found your profile on TVET Career Catalyst. I'm interested in learning more about your career in ${career.title}. Could you share some advice?`,
    )
    window.open(`https://wa.me/${phone.replace(/\s+/g, "")}?text=${message}`, "_blank")
  }

  const handlePhoneCall = (phone) => {
    window.open(`tel:${phone}`, "_self")
  }

  const calculateYearsExperience = (graduationYear) => {
    return new Date().getFullYear() - graduationYear
  }

  const calculateSalaryGrowth = (starting, current) => {
    return Math.round(((current - starting) / starting) * 100)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-6 sm:mb-8">
          <button onClick={() => navigate(-1)} className="inline-flex items-center text-gray-600 hover:text-primary mb-4 sm:mb-6 transition-colors min-h-[44px] px-2 py-2 rounded-lg hover:bg-blue-100">
            <ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
            <span className="text-sm sm:text-base">{t("graduates.back")}</span>
          </button>

          {/* Progress Indicator (4 steps) */}
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="flex items-center space-x-1 sm:space-x-2">
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-success rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">✓</div>
              <div className="w-8 sm:w-16 h-1 bg-success"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-success rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">✓</div>
              <div className="w-8 sm:w-16 h-1 bg-success"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-primary rounded-full flex items-center justify-center text-white text-xs sm:text-sm font-bold">3</div>
              <div className="w-8 sm:w-16 h-1 bg-gray-300"></div>
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-300 rounded-full flex items-center justify-center text-gray-500 text-xs sm:text-sm">4</div>
            </div>
          </div>
        </div>

        {/* Page Title */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">{t("graduates.title")}</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            {t("graduates.subtitle", { career: career.title })}
          </p>
        </div>

        {/* Graduate Profiles Slideshow */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            {/* Slideshow Container */}
            <div className="overflow-hidden rounded-xl">
              <div 
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
              >
                {graduates.map((graduate) => (
                  <div key={graduate.id} className="w-full flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] p-4 sm:p-6 mx-2 sm:mx-3 border border-gray-100 hover:shadow-[0_20px_60px_rgb(0,0,0,0.15)] hover:-translate-y-1 transition-all duration-500 transform-gpu">
                      {/* Graduate Header */}
                      <div className="flex items-start space-x-3 mb-4">
                        {graduate.photo_url ? (
                          <img src={graduate.photo_url} alt={graduate.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full object-cover" />
                        ) : (
                          <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-white text-sm sm:text-lg font-bold">
                            {graduate.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </div>
                        )}
                        <div className="flex-1">
                          <h3 className="text-base sm:text-lg font-bold text-gray-900">{graduate.name}</h3>
                          <p className="text-primary font-semibold text-xs sm:text-sm">{graduate.current_role}</p>
                          <div className="flex items-center text-gray-600 mt-1">
                            <Building2 className="h-3 w-3 mr-1" />
                            <span className="text-xs">{graduate.company}</span>
                          </div>
                        </div>
                      </div>

                      {/* Graduate Stats */}
                      <div className="grid grid-cols-2 gap-3 mb-4">
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-3 border border-blue-200">
                          <div className="flex items-center text-gray-600 mb-1">
                            <Calendar className="h-3 w-3 mr-1" />
                            <span className="text-xs font-medium">Experience</span>
                          </div>
                          <div className="text-sm font-bold text-gray-900">
                            {calculateYearsExperience(graduate.graduation_year)} years
                          </div>
                        </div>

                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-3 border border-green-200">
                          <div className="flex items-center text-gray-600 mb-1">
                            <MapPin className="h-3 w-3 mr-1" />
                            <span className="text-xs font-medium">Location</span>
                          </div>
                          <div className="text-sm font-bold text-gray-900">{graduate.location}</div>
                        </div>
                      </div>

                      {/* Salary Growth */}
                      <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-3 mb-4 border border-green-200">
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600 font-medium">Starting Salary</span>
                          <span className="font-semibold text-gray-900 text-sm">
                            {new Intl.NumberFormat("en-RW").format(graduate.starting_salary)} RWF
                          </span>
                        </div>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-600 font-medium">Current Salary</span>
                          <span className="font-semibold text-gray-900 text-sm">
                            {new Intl.NumberFormat("en-RW").format(graduate.current_salary)} RWF
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-gray-600 font-medium">Growth</span>
                          <div className="flex items-center text-success font-bold text-sm">
                            <TrendingUp className="h-3 w-3 mr-1" />+
                            {calculateSalaryGrowth(graduate.starting_salary, graduate.current_salary)}%
                          </div>
                        </div>
                      </div>

                      {/* Graduate Quote */}
                      <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-3 mb-4 border border-primary/20">
                        <p className="text-gray-700 italic leading-relaxed text-sm">"{graduate.quote}"</p>
                      </div>

                      {/* Education */}
                      <div className="text-xs text-gray-600 mb-4 bg-gray-50 rounded-lg p-2 border border-gray-200">
                        <strong>Graduated:</strong> {graduate.school} ({graduate.graduation_year})
                      </div>

                      {/* Contact Buttons */}
                      <div className="flex space-x-2">
                        {graduate.whatsapp_available && (
                          <button
                            onClick={() => handleWhatsAppContact(graduate.phone, graduate.name.split(" ")[0])}
                            className="flex-1 bg-green-600 text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center hover:shadow-lg opacity-95 hover:opacity-90"
                          >
                            <MessageCircle className="h-3 w-3 mr-1" />
                            WhatsApp
                          </button>
                        )}
                        <button
                          onClick={() => handlePhoneCall(graduate.phone)}
                          className="flex-1 bg-secondary text-white px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center justify-center hover:shadow-lg opacity-95 hover:opacity-90"
                        >
                          <Phone className="h-3 w-3 mr-1" />
                          Call
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Navigation Arrows */}
            {graduates.length > 1 && (
              <>
                <button
                  onClick={prevSlide}
                  className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                >
                  <ChevronLeft className="h-6 w-6 text-gray-600" />
                </button>
                <button
                  onClick={nextSlide}
                  className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-4 bg-white rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
                >
                  <ChevronRight className="h-6 w-6 text-gray-600" />
                </button>
              </>
            )}

            {/* Dots Indicator */}
            {graduates.length > 1 && (
              <div className="flex justify-center mt-6 space-x-2">
                {graduates.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all duration-200 ${
                      index === currentSlide 
                        ? 'bg-primary scale-125' 
                        : 'bg-gray-300 hover:bg-blue-400'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* CTA to Step 4 */}
        <div className="text-center mt-6">
          <button onClick={() => navigate(`/ready/${careerId}`)} className="bg-primary text-white px-6 py-3 rounded-lg text-base font-semibold inline-flex items-center transition-all duration-200 shadow-lg hover:shadow-xl opacity-95 hover:opacity-90">
            {t("graduates.takeAction")}
            <span className="ml-2">→</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default GraduateStories
