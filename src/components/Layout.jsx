"use client"

import React from "react"
import { Link, useLocation } from "react-router-dom"
import { useI18n } from "../context/i18n"
import { Home, Users, Building2, Users2, Phone, Mail, MapPin } from "lucide-react"

const Layout = ({ children }) => {
  const { pathname } = useLocation()
  const isHomePage = pathname === "/"
  const { lang, setLang, t } = useI18n()

  return (
    <div className="min-h-screen bg-gradient-sky flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center gap-2 font-bold text-xl text-gray-900">
              <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">TC</span>
              </div>
              TVET Career Catalyst
            </Link>

            <nav className="hidden md:flex items-center gap-6">
              <Link to="/" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <Home className="w-4 h-4" />
                {t("nav.home")}
              </Link>
              <Link to="/scenarios/student" className="flex items-center gap-2 text-gray-600 hover:text-green-600 transition-colors">
                <Users className="w-4 h-4" />
                {t("nav.students")}
              </Link>
              <Link to="/employers" className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
                <Building2 className="w-4 h-4" />
                {t("nav.employers")}
              </Link>
              <Link to="/parents" className="flex items-center gap-2 text-gray-600 hover:text-orange-600 transition-colors">
                <Users2 className="w-4 h-4" />
                {t("nav.parents")}
              </Link>
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value)}
                className="ml-4 border border-gray-300 rounded-md px-2 py-1 text-sm text-gray-700 bg-white hover:border-gray-400"
              >
                <option value="en">English</option>
                <option value="rw">Kinyarwanda</option>
              </select>
            </nav>

            <Link to="/" className="md:hidden p-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Home className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">TC</span>
                </div>
                <span className="font-bold text-lg">TVET Career Catalyst</span>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                Connecting Rwanda's TVET students with career opportunities and employers with skilled talent.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link to="/scenarios/student" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Career Matching
                </Link>
                <Link to="/employers" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Find Talent
                </Link>
                <Link to="/parents" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Parent Guide
                </Link>
                <Link to="/jobs" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Job Postings
                </Link>
                <Link to="/faqs" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  FAQs
                </Link>
              </div>
            </div>

            {/* Resources */}
            <div>
              <h3 className="font-semibold mb-4">Resources</h3>
              <div className="space-y-2">
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  TVET Schools
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Success Stories
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Career Guides
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors text-sm">
                  Salary Information
                </a>
              </div>
            </div>

            {/* Contact */}
            <div>
              <h3 className="font-semibold mb-4">Contact Us</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Phone className="w-4 h-4" />
                  +250 788 123 456
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <Mail className="w-4 h-4" />
                  info@tvetcareer.rw
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm">
                  <MapPin className="w-4 h-4" />
                  Kigali, Rwanda
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 TVET Career Catalyst. Supporting Rwanda's Vision 2050 through skills development.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <Link to="/legal" className="text-gray-400 hover:text-white transition-colors">
                  Legal Terms & Conditions
                </Link>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
