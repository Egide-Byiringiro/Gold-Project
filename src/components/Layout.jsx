"use client"

import React, { useState, useEffect } from "react"
import { Link, useLocation } from "react-router-dom"
import { useI18n } from "../context/i18n"
import { Home, Users, Building2, Users2, Phone, Mail, MapPin, Menu, X } from "lucide-react"

const Layout = ({ children }) => {
  const { pathname } = useLocation()
  const isHomePage = pathname === "/"
  const { lang, setLang, t } = useI18n()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const siteName = (() => {
    try {
      const raw = typeof window !== "undefined" ? window.localStorage.getItem("admin_settings") : null
      if (!raw) return "TVET Career Catalyst"
      const parsed = JSON.parse(raw)
      return parsed?.siteName || "TVET Career Catalyst"
    } catch {
      return "TVET Career Catalyst"
    }
  })()

  // Close mobile menu and scroll to top when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
    // Scroll to top when route changes
    window.scrollTo(0, 0)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isMobileMenuOpen])

  // Logo options
  const LogoA = () => (
    <svg
      className="w-9 h-9 transition-transform duration-300 ease-out group-hover:scale-110"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <defs>
        <linearGradient id="huza-lg-a" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#047857" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      <rect x="8" y="8" width="32" height="32" rx="10" fill="url(#huza-lg-a)" />
      <path d="M16 30V18h2.8v4.3h6.3V18H28v12h-2.9v-5h-6.3v5H16Zm16 0v-8.6h-3.2V18h9.1v3.4H34V30h-2Z" fill="#fff" opacity="0.95" />
    </svg>
  )

  const LogoB = () => (
    <svg
      className="w-9 h-9 transition-transform duration-300 ease-out group-hover:scale-110"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <circle cx="24" cy="24" r="14" stroke="#047857" strokeWidth="3" opacity="0.9" />
      <circle cx="24" cy="24" r="6" fill="#0ea5e9" opacity="0.9" />
      <path d="M24 10v4M24 34v4M10 24h4M34 24h4" stroke="#0ea5e9" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )

  const LogoC = () => (
    <svg
      className="w-9 h-9 transition-transform duration-300 ease-out group-hover:scale-110"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      role="img"
    >
      <rect x="10" y="14" width="28" height="4" rx="2" fill="#047857" />
      <rect x="14" y="22" width="20" height="4" rx="2" fill="#0ea5e9" />
      <rect x="18" y="30" width="12" height="4" rx="2" fill="#f97316" />
    </svg>
  )

  const ActiveLogo = LogoA

  return (
    <div className="min-h-screen bg-gradient-to-r from-sky-200 to-white-900
flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="group flex items-center gap-3 font-bold text-xl text-gray-900 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-white">
              <ActiveLogo />
              <span className="tracking-tight transition-colors duration-300 group-hover:text-primary">HUZA</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-2">
              <Link to="/" className="flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors px-2 py-2 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                <Home className="w-5 h-5" />
              </Link>
              <Link to="/scenarios/student" className="flex items-center gap-2 text-gray-700 hover:text-green-800 transition-colors px-3 py-2 rounded-lg bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                <Users className="w-4 h-4" />
                {t("nav.students")}
              </Link>
              <Link to="/employers" className="flex items-center gap-2 text-gray-700 hover:text-green-800 transition-colors px-3 py-2 rounded-lg bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
                <Building2 className="w-4 h-4" />
                {t("nav.employers")}
              </Link>
              <Link to="/parents" className="flex items-center gap-2 text-gray-700 hover:text-green-800 transition-colors px-3 py-2 rounded-lg bg-green-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white">
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

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-3 text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-blue-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Navigation Menu */}
          <div className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen 
              ? 'max-h-screen opacity-100 pb-4' 
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}>
            <nav className="flex flex-col space-y-2 pt-4 border-t border-gray-200">
              <Link 
                to="/" 
<<<<<<< HEAD
                className="flex items-center justify-center text-gray-600 hover:text-green-600 transition-colors py-3 px-4 rounded-lg hover:bg-gray-50 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
=======
                className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors py-3 px-4 rounded-lg hover:bg-blue-100 min-h-[44px]"
>>>>>>> ft/mybuttons
              >
                <Home className="w-6 h-6" />
              </Link>
              <Link 
                to="/scenarios/student" 
<<<<<<< HEAD
                className="flex items-center gap-3 text-gray-700 hover:text-green-800 transition-colors py-3 px-4 rounded-lg bg-green-100 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
=======
                className="flex items-center gap-3 text-gray-600 hover:text-green-600 transition-colors py-3 px-4 rounded-lg hover:bg-blue-100 min-h-[44px]"
>>>>>>> ft/mybuttons
              >
                <Users className="w-5 h-5" />
                {t("nav.students")}
              </Link>
              <Link 
                to="/employers" 
<<<<<<< HEAD
                className="flex items-center gap-3 text-gray-700 hover:text-green-800 transition-colors py-3 px-4 rounded-lg bg-green-100 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
=======
                className="flex items-center gap-3 text-gray-600 hover:text-blue-600 transition-colors py-3 px-4 rounded-lg hover:bg-blue-100 min-h-[44px]"
>>>>>>> ft/mybuttons
              >
                <Building2 className="w-5 h-5" />
                {t("nav.employers")}
              </Link>
              <Link 
                to="/parents" 
<<<<<<< HEAD
                className="flex items-center gap-3 text-gray-700 hover:text-green-800 transition-colors py-3 px-4 rounded-lg bg-green-100 min-h-[44px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-green-600 focus-visible:ring-offset-2 focus-visible:ring-offset-white"
=======
                className="flex items-center gap-3 text-gray-600 hover:text-orange-600 transition-colors py-3 px-4 rounded-lg hover:bg-blue-100 min-h-[44px]"
>>>>>>> ft/mybuttons
              >
                <Users2 className="w-5 h-5" />
                {t("nav.parents")}
              </Link>
              <div className="px-4 py-3">
                <select
                  value={lang}
                  onChange={(e) => setLang(e.target.value)}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm text-gray-700 bg-white hover:border-gray-400 min-h-[44px]"
                >
                  <option value="en">English</option>
                  <option value="rw">Kinyarwanda</option>
                </select>
              </div>
            </nav>
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
                  <span className="text-white font-bold text-sm">HU</span>
                </div>
                <span className="font-bold text-lg">HUZA</span>
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

          <div className="border-t border-gray-700 mt-8 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © 2024 {siteName}. Supporting Rwanda's Vision 2050 through skills development.
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm">
                <Link to="/legal" className="text-gray-400 hover:text-white transition-colors">
                  Legal Terms & Conditions
                </Link>
                <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                  Privacy Policy
                </Link>
                {/* <Link to="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default Layout
