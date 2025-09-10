"use client"

import { useState } from "react"
import { MapPin, Calendar, DollarSign, Clock, Building2, ExternalLink, Filter } from "lucide-react"
import { getUrgentJobs, getAllCareers } from "../utils/matching"
import jobPostingsData from "../data/job_postings.json"

const JobPostings = () => {
  const [selectedCareer, setSelectedCareer] = useState("all")
  const [selectedLocation, setSelectedLocation] = useState("all")
  const [showUrgentOnly, setShowUrgentOnly] = useState(false)

  const careers = getAllCareers()
  const allJobs = jobPostingsData
  const urgentJobs = getUrgentJobs()

  // Filter jobs based on selections
  const filteredJobs = allJobs.filter((job) => {
    if (selectedCareer !== "all" && job.career_id !== selectedCareer) return false
    if (selectedLocation !== "all" && !job.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false
    if (showUrgentOnly && !job.urgent) return false
    return true
  })

  const locations = [...new Set(allJobs.map((job) => job.location))].sort()

  const handleApply = (job) => {
    if (job.apply_url.startsWith("mailto:")) {
      window.open(job.apply_url, "_self")
    } else {
      window.open(job.apply_url, "_blank")
    }
  }

  const getCareerTitle = (careerId) => {
    const career = careers.find((c) => c.id === careerId)
    return career ? career.title : careerId
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffTime = Math.abs(now - date)
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "1 day ago"
    if (diffDays < 7) return `${diffDays} days ago`
    if (diffDays < 30) return `${Math.ceil(diffDays / 7)} weeks ago`
    return date.toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-3 sm:mb-4 px-2">
            Current <span className="text-primary">Job Openings</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-3xl mx-auto px-2">
            Discover the latest job opportunities for TVET graduates across Rwanda. Companies are actively seeking
            skilled technical professionals.
          </p>
        </div>

        {/* Stats Bar */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="text-2xl font-bold text-primary mb-1">{allJobs.length}</div>
                <div className="text-gray-600">Total Openings</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-accent mb-1">{urgentJobs.length}</div>
                <div className="text-gray-600">Urgent Positions</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-success mb-1">{locations.length}</div>
                <div className="text-gray-600">Locations</div>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="max-w-6xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center mb-4">
              <Filter className="h-5 w-5 text-gray-600 mr-2" />
              <h3 className="text-lg font-semibold text-gray-900">Filter Jobs</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Career Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Career Field</label>
                <select
                  value={selectedCareer}
                  onChange={(e) => setSelectedCareer(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Careers</option>
                  {careers.map((career) => (
                    <option key={career.id} value={career.id}>
                      {career.title}
                    </option>
                  ))}
                </select>
              </div>

              {/* Location Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                <select
                  value={selectedLocation}
                  onChange={(e) => setSelectedLocation(e.target.value)}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="all">All Locations</option>
                  {locations.map((location) => (
                    <option key={location} value={location}>
                      {location}
                    </option>
                  ))}
                </select>
              </div>

              {/* Urgent Filter */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showUrgentOnly}
                    onChange={(e) => setShowUrgentOnly(e.target.checked)}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="ml-2 text-sm text-gray-700">Urgent positions only</span>
                </label>
              </div>

              {/* Results Count */}
              <div className="flex items-end">
                <div className="text-sm text-gray-600">
                  Showing {filteredJobs.length} of {allJobs.length} jobs
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Job Listings */}
        <div className="max-w-6xl mx-auto">
          <div className="space-y-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="bg-white rounded-lg shadow-sm border hover:shadow-md transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <h3 className="text-xl font-bold text-gray-900 mr-3">{job.title}</h3>
                        {job.urgent && (
                          <span className="bg-red-100 text-red-800 text-xs font-semibold px-2 py-1 rounded-full flex items-center">
                            <Clock className="h-3 w-3 mr-1" />
                            Urgent
                          </span>
                        )}
                      </div>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <div className="flex items-center">
                          <Building2 className="h-4 w-4 mr-1" />
                          {getCareerTitle(job.career_id)}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {job.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {formatDate(job.posted_date)}
                        </div>
                      </div>

                      <div className="flex items-center mb-4">
                        <DollarSign className="h-4 w-4 text-success mr-1" />
                        <span className="font-semibold text-success">
                          {new Intl.NumberFormat("en-RW").format(job.salary_min)} -{" "}
                          {new Intl.NumberFormat("en-RW").format(job.salary_max)} RWF
                        </span>
                        <span className="text-gray-600 ml-1">per month</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleApply(job)}
                      className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors flex items-center"
                    >
                      Apply Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </button>
                  </div>

                  {/* Requirements */}
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Requirements:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {job.requirements.map((req, index) => (
                        <li key={index}>{req}</li>
                      ))}
                    </ul>
                  </div>

                  {/* Responsibilities */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Key Responsibilities:</h4>
                    <ul className="list-disc list-inside text-sm text-gray-700 space-y-1">
                      {job.responsibilities.map((resp, index) => (
                        <li key={index}>{resp}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredJobs.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">No jobs found matching your criteria</div>
              <button
                onClick={() => {
                  setSelectedCareer("all")
                  setSelectedLocation("all")
                  setShowUrgentOnly(false)
                }}
                className="text-primary hover:text-primary/80 font-semibold"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="max-w-4xl mx-auto mt-12">
          <div className="bg-gradient-to-r from-primary to-secondary rounded-2xl p-8 text-white text-center">
            <h2 className="text-2xl font-bold mb-4">Don't See Your Dream Job?</h2>
            <p className="text-lg mb-6 opacity-90">
              New opportunities are posted regularly. Set up job alerts or contact companies directly to express your
              interest in future openings.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.open("mailto:jobs@tvetcareercatalyst.rw?subject=Job Alert Request", "_blank")}
                className="bg-white text-primary px-8 py-3 rounded-lg font-semibold hover:bg-blue-100 transition-colors"
              >
                Set Up Job Alerts
              </button>
              <button
                onClick={() => window.open("/", "_self")}
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-500 transition-colors"
              >
                Explore Career Paths
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default JobPostings
