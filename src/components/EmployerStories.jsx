"use client"

import { useState } from "react"
import { Users, TrendingUp, Star, CheckCircle, Mail } from "lucide-react"
import { getSuccessStories, getEmployerStats } from "../utils/employer_matching"

const EmployerStories = () => {
  const [selectedIndustry, setSelectedIndustry] = useState("all")

  const allStories = getSuccessStories(selectedIndustry)
  const stats = getEmployerStats()

  const industries = [
    { id: "all", name: "All Industries" },
    { id: "renewable", name: "Renewable Energy" },
    { id: "automotive", name: "Automotive" },
    { id: "telecommunications", name: "Telecommunications" },
    { id: "hospitality", name: "Hospitality" },
    { id: "construction", name: "Construction" },
    { id: "financial", name: "Financial Services" },
  ]

  const handleContactEmployer = (employer) => {
    window.open(
      `mailto:${employer.contact_email}?subject=Partnership Inquiry - TVET Talent&body=Hello, I saw your success story on TVET Career Catalyst and would like to learn more about your experience hiring TVET graduates.`,
      "_blank",
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Employer <span className="text-secondary">Success Stories</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Discover how leading companies across Rwanda have successfully hired and developed TVET graduates. Real
            testimonials from real employers who chose skills over degrees.
          </p>
        </div>

        {/* Industry Filter */}
        <div className="max-w-4xl mx-auto mb-8 sm:mb-12">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {industries.map((industry) => (
              <button
                key={industry.id}
                onClick={() => setSelectedIndustry(industry.id)}
                className={`px-3 sm:px-4 py-2 rounded-full font-semibold transition-all duration-300 min-h-[44px] ${
                  selectedIndustry === industry.id
                    ? "bg-secondary text-white shadow-md"
                    : "bg-white text-gray-700 border border-gray-300 hover:border-secondary hover:bg-secondary/10 hover:text-secondary"
                }`}
              >
                <span className="text-sm sm:text-base">{industry.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Success Stories Grid */}
        <div className="max-w-6xl mx-auto mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {allStories.map((employer) => (
              <div key={employer.id} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow">
                {/* Company Header */}
                <div className="flex items-center mb-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center text-white text-xl font-bold">
                    {employer.company_name.charAt(0)}
                  </div>
                  <div className="ml-4">
                    <h3 className="text-xl font-bold text-gray-900">{employer.company_name}</h3>
                    <p className="text-secondary font-semibold">{employer.industry}</p>
                  </div>
                </div>

                {/* Hiring Stats */}
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <Users className="h-6 w-6 text-secondary mx-auto mb-2" />
                    <div className="text-2xl font-bold text-gray-900">{employer.employees_hired}</div>
                    <div className="text-sm text-gray-600">TVET Hires in {employer.hire_year}</div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-4 text-center">
                    <TrendingUp className="h-6 w-6 text-success mx-auto mb-2" />
                    <div className="text-lg font-bold text-gray-900">
                      {new Intl.NumberFormat("en-RW").format(employer.salary_range_max)} RWF
                    </div>
                    <div className="text-sm text-gray-600">Top Salary Offered</div>
                  </div>
                </div>

                {/* Available Roles */}
                <div className="mb-6">
                  <h4 className="font-semibold text-gray-900 mb-3">Current Openings:</h4>
                  <div className="flex flex-wrap gap-2">
                    {employer.roles_available.map((role, index) => (
                      <span
                        key={index}
                        className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Testimonial */}
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <div className="flex items-center mb-3">
                    <Star className="h-5 w-5 text-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500" />
                    <Star className="h-5 w-5 text-yellow-500" />
                  </div>
                  <blockquote className="text-gray-700 italic leading-relaxed mb-3">
                    "{employer.testimonial}"
                  </blockquote>
                  <div className="text-sm text-gray-600 font-medium">— {employer.contact_person}</div>
                </div>

                {/* Hiring Status */}
                {employer.hiring_status === "actively_hiring" && (
                  <div className="bg-success/10 border border-success/20 rounded-lg p-4 mb-4">
                    <div className="flex items-center text-success font-semibold mb-2">
                      <CheckCircle className="h-5 w-5 mr-2" />
                      Currently Hiring - {employer.positions_open} Open Positions
                    </div>
                    <p className="text-sm text-gray-700">
                      Salary Range: {new Intl.NumberFormat("en-RW").format(employer.salary_range_min)} -{" "}
                      {new Intl.NumberFormat("en-RW").format(employer.salary_range_max)} RWF
                    </p>
                  </div>
                )}

                {/* Contact Button */}
                <button
                  onClick={() => handleContactEmployer(employer)}
                  className="w-full bg-secondary text-white px-6 py-3 rounded-lg font-semibold hover:bg-secondary/90 transition-colors flex items-center justify-center"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Connect with {employer.company_name}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Stats */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">TVET Hiring Success Across Rwanda</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div>
                <div className="text-3xl font-bold text-secondary mb-2">{stats.totalEmployers}</div>
                <div className="text-gray-600">Partner Companies</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-success mb-2">{stats.totalHired}</div>
                <div className="text-gray-600">Graduates Hired</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-accent mb-2">{stats.activelyHiring}</div>
                <div className="text-gray-600">Actively Hiring</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-primary mb-2">{stats.totalPositions}</div>
                <div className="text-gray-600">Open Positions</div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-secondary to-primary rounded-xl p-6 text-white">
              <h3 className="text-xl font-bold mb-3">Ready to Join These Success Stories?</h3>
              <p className="mb-4 opacity-90">
                Connect with skilled TVET graduates who bring practical experience and strong work ethic to your team.
              </p>
              <button
                onClick={() =>
                  window.open("mailto:partnerships@tvetcareercatalyst.rw?subject=Partnership Inquiry", "_blank")
                }
                className="bg-white text-secondary px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Start Hiring TVET Talent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EmployerStories
