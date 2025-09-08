"use client"

import { useState } from "react"
import { ArrowLeft, Users, TrendingUp, Award, Phone, MessageCircle, BookOpen, Briefcase } from "lucide-react"
import { Link } from "react-router-dom"

const ParentGuide = () => {
  const [activeSection, setActiveSection] = useState("overview")

  const sections = [
    { id: "overview", title: "TVET Overview", icon: BookOpen },
    { id: "benefits", title: "Career Benefits", icon: TrendingUp },
    { id: "support", title: "How to Support", icon: Users },
    { id: "success", title: "Success Stories", icon: Award },
  ]

  const careerPaths = [
    {
      name: "Information Technology",
      averageSalary: "800,000 - 2,500,000 RWF",
      employmentRate: "92%",
      description: "High demand in Rwanda's digital transformation",
    },
    {
      name: "Hospitality & Tourism",
      averageSalary: "400,000 - 1,200,000 RWF",
      employmentRate: "88%",
      description: "Growing sector with international opportunities",
    },
    {
      name: "Construction & Engineering",
      averageSalary: "600,000 - 1,800,000 RWF",
      employmentRate: "85%",
      description: "Essential for Rwanda's infrastructure development",
    },
  ]

  const supportTips = [
    {
      title: "Research Together",
      description: "Explore career options and salary ranges with your child",
      action: "Use this platform to understand different TVET paths",
    },
    {
      title: "Visit Schools",
      description: "Tour TVET institutions to see facilities and programs",
      action: "Contact schools directly through our platform",
    },
    {
      title: "Connect with Graduates",
      description: "Speak with successful TVET graduates about their experiences",
      action: "Use WhatsApp contacts provided in graduate stories",
    },
    {
      title: "Understand Costs",
      description: "TVET programs are often more affordable than university",
      action: "Compare program costs and potential earnings",
    },
  ]

  const successStories = [
    {
      parentName: "Marie Uwimana",
      childName: "Jean Claude",
      program: "Automotive Technology",
      outcome: "Now works at Toyota Rwanda, earning 1.2M RWF monthly",
      quote: "I was worried about TVET at first, but seeing Jean Claude's success changed my mind completely.",
    },
    {
      parentName: "Joseph Nkurunziza",
      childName: "Grace",
      program: "Hospitality Management",
      outcome: "Manager at Kigali Marriott Hotel, 1.8M RWF monthly",
      quote: "Grace found her passion in hospitality. TVET gave her practical skills that universities couldn't.",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-sky">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="p-2 hover:bg-gray-100 rounded-lg">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Parent Guide</h1>
              <p className="text-gray-600">Supporting your child's TVET journey</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Navigation */}
        <div className="flex flex-wrap gap-2 mb-8">
          {sections.map((section) => {
            const Icon = section.icon
            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === section.id ? "bg-green-600 text-white" : "bg-white text-gray-700 hover:bg-gray-100"
                }`}
              >
                <Icon className="w-4 h-4" />
                {section.title}
              </button>
            )
          })}
        </div>

        {/* Content Sections */}
        {activeSection === "overview" && (
          <div className="space-y-8">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-4">What is TVET?</h2>
              <p className="text-gray-700 mb-4">
                Technical and Vocational Education and Training (TVET) provides practical skills and knowledge for
                specific careers. In Rwanda, TVET is a pathway to well-paying jobs and economic independence.
              </p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">2-3 Years</div>
                  <div className="text-sm text-gray-600">Program Duration</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">85%+</div>
                  <div className="text-sm text-gray-600">Employment Rate</div>
                </div>
                <div className="text-center p-4 bg-orange-50 rounded-lg">
                  <div className="text-2xl font-bold text-orange-600">400K-2.5M</div>
                  <div className="text-sm text-gray-600">Salary Range (RWF)</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Career Paths</h3>
              <div className="space-y-4">
                {careerPaths.map((career, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{career.name}</h4>
                      <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded">
                        {career.employmentRate} employed
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{career.description}</p>
                    <div className="text-sm font-medium text-blue-600">Average Salary: {career.averageSalary}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeSection === "benefits" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Why Choose TVET?</h2>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Briefcase className="w-4 h-4 text-green-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Job-Ready Skills</h3>
                      <p className="text-gray-600 text-sm">
                        Students learn practical skills that employers need immediately
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <TrendingUp className="w-4 h-4 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">High Employment Rate</h3>
                      <p className="text-gray-600 text-sm">85%+ of TVET graduates find employment within 6 months</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Award className="w-4 h-4 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Competitive Salaries</h3>
                      <p className="text-gray-600 text-sm">
                        TVET graduates often earn more than university graduates initially
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Users className="w-4 h-4 text-purple-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Industry Connections</h3>
                      <p className="text-gray-600 text-sm">
                        Direct partnerships with employers for internships and jobs
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeSection === "support" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">How to Support Your Child</h2>
              <div className="space-y-6">
                {supportTips.map((tip, index) => (
                  <div key={index} className="border-l-4 border-green-500 pl-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                    <p className="text-gray-600 mb-2">{tip.description}</p>
                    <div className="text-sm text-green-600 font-medium">{tip.action}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
              <h3 className="font-semibold text-blue-900 mb-3">Questions to Ask Schools</h3>
              <ul className="space-y-2 text-blue-800">
                <li>• What is the job placement rate for graduates?</li>
                <li>• Which companies hire your students?</li>
                <li>• What equipment and facilities do you have?</li>
                <li>• How much does the program cost?</li>
                <li>• Are there scholarship opportunities?</li>
                <li>• What support do you provide for job searching?</li>
              </ul>
            </div>
          </div>
        )}

        {activeSection === "success" && (
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Parent Success Stories</h2>
              <div className="space-y-6">
                {successStories.map((story, index) => (
                  <div key={index} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Users className="w-6 h-6 text-green-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-2">
                          <span className="font-semibold text-gray-900">{story.parentName}</span>
                          <span className="text-gray-500">•</span>
                          <span className="text-gray-600">Parent of {story.childName}</span>
                        </div>
                        <div className="text-sm text-blue-600 font-medium mb-2">
                          {story.program} → {story.outcome}
                        </div>
                        <blockquote className="text-gray-700 italic">"{story.quote}"</blockquote>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Contact Section */}
        <div className="bg-green-600 rounded-lg p-6 text-white mt-8">
          <h3 className="text-lg font-bold mb-4">Need More Information?</h3>
          <p className="mb-4">
            Connect with our education counselors who can help you and your child make the best decision for their
            future.
          </p>
          <div className="flex flex-wrap gap-3">
            <a
              href="tel:+250788123456"
              className="flex items-center gap-2 bg-white text-green-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors"
            >
              <Phone className="w-4 h-4" />
              Call Counselor
            </a>
            <a
              href="https://wa.me/250788123456"
              className="flex items-center gap-2 bg-green-700 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-800 transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Chat
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ParentGuide
