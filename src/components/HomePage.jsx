'use client'
import { Link } from "react-router-dom"
import { useI18n } from "../context/i18n"
import {
  Users,
  Building2,
  Users2,
  ArrowRight,
  CheckCircle,
  TrendingUp,
  Zap,
  Car,
  Smartphone,
  Landmark
} from "lucide-react"

const HomePage = () => {
  const { t } = useI18n()
  return (
   <div className="min-h-screen bg-gradient-to-b from-sky-500 via-sky-500 to-sky-400">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            {t("home.hero.title.line1")}
            <span className="text-primary block mt-2">{t("home.hero.title.line2")}</span>
          </h1>

          <p className="text-xl md:text-2xl text-gray-600 mb-8 leading-relaxed">{t("home.hero.subtitle")}</p>

          {/* Success Statistics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-3xl mx-auto">
            <StatCard icon={<CheckCircle className="h-8 w-8 text-success" />} value="850+" label={t("home.stats.graduates")} />
            <StatCard icon={<Building2 className="h-8 w-8 text-secondary" />} value="120+" label={t("home.stats.companies")} />
            <StatCard icon={<TrendingUp className="h-8 w-8 text-accent" />} value="85%" label={t("home.stats.rate")} />
          </div>

          {/* User Type Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <UserCard
              href="/scenarios/student"
              icon={<Users className="h-12 w-12 text-primary" />}
              bg="primary"
              title={t("home.user.student.title")}
              description={t("home.user.student.desc")}
              cta={t("home.user.student.cta")}
            />
            <UserCard
              href="/employers"
              icon={<Building2 className="h-12 w-12 text-secondary" />}
              bg="secondary"
              title={t("home.user.employer.title")}
              description={t("home.user.employer.desc")}
              cta={t("home.user.employer.cta")}
            />
            <UserCard
              href="/parents"
              icon={<Users2 className="h-12 w-12 text-accent" />}
              bg="accent"
              title={t("home.user.parent.title")}
              description={t("home.user.parent.desc")}
              cta={t("home.user.parent.cta")}
            />
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 text-center">
            <p className="text-gray-500 mb-6">{t("home.trusted")}</p>
            <div className="flex flex-wrap justify-center items-center gap-8">
              {[
                { name: "Rwanda Energy Group", icon: <Zap className="h-8 w-8 text-primary" /> },
                { name: "Kigali Motors", icon: <Car className="h-8 w-8 text-secondary" /> },
                { name: "MTN Rwanda", icon: <Smartphone className="h-8 w-8 text-accent" /> },
                { name: "Bank of Kigali", icon: <Landmark className="h-8 w-8 text-success" /> }
              ].map((company, idx) => (
                <div key={idx} className="flex flex-col items-center gap-2 p-4 rounded-lg hover:bg-white/50 transition-colors">
                  <div className="p-3 bg-white rounded-full shadow-md">
                    {company.icon}
                  </div>
                  <span className="text-sm font-medium text-gray-600">{company.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const StatCard = ({ icon, value, label }) => (
  <div className="group bg-white rounded-2xl p-8 shadow-lg border border-gray-100 text-center hover:shadow-2xl hover:scale-105 transition-all duration-500 hover:border-primary/20 relative overflow-hidden">
    {/* Animated background gradient */}
    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
    
    {/* Content */}
    <div className="relative z-10">
      <div className="flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
        <div className="p-3 rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 group-hover:from-primary/20 group-hover:to-secondary/20 transition-all duration-300">
          {icon}
        </div>
      </div>
      <div className="text-4xl md:text-5xl font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300">
        {value}
      </div>
      <div className="text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">
        {label}
      </div>
    </div>
    
    {/* Decorative elements */}
    <div className="absolute top-4 right-4 w-2 h-2 bg-primary/20 rounded-full group-hover:bg-primary/40 transition-colors duration-300"></div>
    <div className="absolute bottom-4 left-4 w-1 h-1 bg-secondary/20 rounded-full group-hover:bg-secondary/40 transition-colors duration-300"></div>
  </div>
)

const UserCard = ({ href, icon, bg, title, description, cta }) => (
  <Link to={href} className={`group bg-white rounded-xl p-8 shadow-lg border-2 border-transparent hover:border-${bg} transition-all duration-300 hover:shadow-xl transform hover:-translate-y-1`}>
    <div className="flex flex-col items-center text-center">
      <div className={`bg-${bg}/10 rounded-full p-4 mb-4 group-hover:bg-${bg}/20 transition-colors`}>
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">{title}</h3>
      <p className="text-gray-600 mb-4 leading-relaxed group-hover:text-gray-700 transition-colors">{description}</p>
      <div className={`flex items-center text-${bg} font-semibold group-hover:translate-x-1 transition-transform opacity-100 group-hover:opacity-100`}>
        {cta} <ArrowRight className="ml-2 h-5 w-5" />
      </div>
    </div>
  </Link>
)

export default HomePage
