"use client"

import React, { createContext, useContext, useMemo, useState } from "react"

const I18nContext = createContext({
  lang: "en",
  setLang: () => {},
  t: (key, params) => key,
})

const translations = {
  en: {
    "nav.home": "Home",
    "nav.students": "For Students",
    "nav.employers": "For Employers",
    "nav.parents": "For Parents",

    "scenario.title.student": "What interests you most?",
    "scenario.desc.student": "Choose the activity that excites you most. We'll show you careers that match your interests.",
    "scenario.continue": "Continue to Career Match",

    "career.backToScenarios": "Back to Scenarios",
    "career.perfectMatch": "Perfect Match Found!",
    "career.meetGraduates": "Meet Real Graduates",

    "graduates.back": "Back to Career Match",
    "graduates.title": "Real Success Stories",
    "graduates.subtitle": "Meet graduates who started just like you and now have thriving careers in {career}. They're ready to share their experience and advice.",
    "graduates.takeAction": "Take action now",

    "actions.readyTitle": "Ready to Start Your Journey?",
    "actions.readyDesc": "Take the next step towards your career in {career}. Choose your path below.",
    "actions.apply": "Apply to School",
    "actions.applyDesc": "Start your TVET education today",
    "actions.viewSchools": "View Schools",
    "actions.mentor": "Get Mentorship",
    "actions.mentorDesc": "Connect with an industry mentor",
    "actions.contactMentor": "Contact Mentor",
    "actions.share": "Share with Friends",
    "actions.shareDesc": "Show others this career opportunity",
    "actions.parents": "Share with Parents",
    "actions.parentsDesc": "Help them understand TVET benefits",

    "common.back": "Back",

    // Home
    "home.hero.title.line1": "Your Future Starts with",
    "home.hero.title.line2": "TVET Skills",
    "home.hero.subtitle": "Discover high-paying careers through Technical and Vocational Education. Connect with employers who value your skills.",
    "home.stats.graduates": "Graduates Employed",
    "home.stats.companies": "Companies Hiring",
    "home.stats.rate": "Employment Rate",
    "home.user.student.title": "I'm a Student",
    "home.user.student.desc": "Discover careers that match your interests and see real salary potential",
    "home.user.student.cta": "Find My Career",
    "home.user.employer.title": "I'm Hiring",
    "home.user.employer.desc": "Connect with skilled TVET graduates ready to contribute from day one",
    "home.user.employer.cta": "Find Talent",
    "home.user.parent.title": "I'm a Parent",
    "home.user.parent.desc": "Learn why TVET offers better career prospects than traditional university",
    "home.user.parent.cta": "Learn More",
    "home.trusted": "Trusted by leading companies across Rwanda",

    // Employer Dashboard
    "emp.back": "← Back to Home",
    "emp.title": "Find TVET Talent",
    "emp.lead": "Connect with skilled graduates who are ready to contribute from day one. TVET graduates bring practical skills and strong work ethic to your team.",
    "emp.stats.partners": "Partner Companies",
    "emp.stats.hired": "Graduates Hired",
    "emp.stats.positions": "Open Positions",
    "emp.stats.active": "Actively Hiring",
    "emp.skills.title": "What Skills Do You Need?",
    "emp.skills.desc": "Select the type of work you need help with to see available talent and partnership options.",
    "emp.selected": "Selected",
    "emp.talent.title": "Available Talent",
    "emp.talent.graduates": "Experienced Graduates ({count})",
    "emp.talent.salary": "Current Salary",
    "emp.talent.expYears": "years exp.",
    "emp.talent.whatsapp": "Contact via WhatsApp",
    "emp.schools.title": "Partner Schools ({count})",
    "emp.schools.totalGrads": "Total Graduates",
    "emp.schools.contact": "Contact School",
    "emp.success.title": "Success Stories",
    "emp.success.lead": "See how other companies have successfully hired and worked with TVET graduates.",
    "emp.success.hiredIn": "Hired {count} TVET graduates in {year}",
    "emp.success.salary": "Salary: {min} - {max} RWF",
    "emp.success.currentlyHiring": "Currently hiring {count} positions",
    "emp.jobs.title": "Recent Job Postings",
    "emp.jobs.post": "Post a Job",
    "emp.jobs.urgent": "Urgent",
    "emp.jobs.posted": "Posted {date}",
    "emp.jobs.salary": "Salary: {min} - {max} RWF",
    "emp.jobs.view": "View Details",
    "emp.cta.title": "Ready to Hire TVET Talent?",
    "emp.cta.lead": "Join {count}+ companies who have successfully hired skilled TVET graduates. Get access to work-ready talent with practical skills and strong work ethic.",
    "emp.cta.postFirst": "Post Your First Job",
    "emp.cta.explore": "Explore Partnerships",

    // Career labels
    "career.monthlySalary": "Monthly Salary",
    "career.employmentRate": "Employment Rate",
    "career.marketDemand": "Market Demand",
    "career.growthPotential": "Growth Potential",
    "career.keySkills": "Key Skills You'll Learn",
    "career.whyMatch": "Why This Matches You",
  },
  rw: {
    "nav.home": "Ahabanza",
    "nav.students": "Abanyeshuri",
    "nav.employers": "Abakoresha",
    "nav.parents": "Ababyeyi",

    "scenario.title.student": "Ni iki kigushishikaje cyane?",
    "scenario.desc.student": "Hitamo igikorwa kigushimisha cyane. Tuzakwereka imirimo ihuye n'ibyo ukunda.",
    "scenario.continue": "Komeza kugereranya n'umwuga",

    "career.backToScenarios": "Subira ku byiciro",
    "career.perfectMatch": "Umwuga uhuye neza wabonetse!",
    "career.meetGraduates": "Sangamo abarangije nyabo",

    "graduates.back": "Subira ku guhuzwa n'umwuga",
    "graduates.title": "Inkuru z’intsinzi",
    "graduates.subtitle": "Hura n’abarangije batangiye nkawe kandi ubu bafite akazi keza muri {career}. Biteguye gusangiza ubunararibonye n'inama.",
    "graduates.takeAction": "Tangira gukora ubu",

    "actions.readyTitle": "Witeguye gutangira urugendo rwawe?",
    "actions.readyDesc": "Fata intambwe ikurikira mu mwuga wa {career}. Hitamo inzira ukunda hepfo.",
    "actions.apply": "Saba Ishuri",
    "actions.applyDesc": "Tangira amasomo ya TVET uyu munsi",
    "actions.viewSchools": "Reba Amashuri",
    "actions.mentor": "Shaka Uwamugira Inama",
    "actions.mentorDesc": "Huzwa n’inzobere mu mwuga",
    "actions.contactMentor": "Vugana n’umujyanama",
    "actions.share": "Sangiza Inshuti",
    "actions.shareDesc": "Bereka aya mahirwe y’umwuga",
    "actions.parents": "Sangiza Ababyeyi",
    "actions.parentsDesc": "Bafashe kumva ibyiza bya TVET",

    "common.back": "Subira inyuma",

    // Home
    "home.hero.title.line1": "Ahazaza Hawe Hatangirira kuri",
    "home.hero.title.line2": "Ubumenyi bwa TVET",
    "home.hero.subtitle": "Menya imirimo ihemba neza binyuze mu myigire ya tekiniki n’imyuga. Huza n’abakoresha bashima ubumenyi bwawe.",
    "home.stats.graduates": "Abarangije babonye akazi",
    "home.stats.companies": "Amakampani akora akazi",
    "home.stats.rate": "Igipimo cyo kubona akazi",
    "home.user.student.title": "Ndi Umunyeshuri",
    "home.user.student.desc": "Menya imirimo ihuye n’ibyo ukunda kandi urebe uko imishahara imeze",
    "home.user.student.cta": "Shakisha Umwuga Wanjye",
    "home.user.employer.title": "Ndashaka Abakozi",
    "home.user.employer.desc": "Hura n’abarangije ba TVET bafite ubumenyi bakitegura gukora ako kanya",
    "home.user.employer.cta": "Shakisha Impano",
    "home.user.parent.title": "Ndi Umubyeyi",
    "home.user.parent.desc": "Menya impamvu TVET itanga amahirwe meza kurusha kaminuza ya gakondo",
    "home.user.parent.cta": "Menya byinshi",
    "home.trusted": "Byizewe n’amakampani akomeye mu Rwanda hose",

    // Employer Dashboard
    "emp.back": "← Subira ku rubuga rw'itangira",
    "emp.title": "Shakisha Impano za TVET",
    "emp.lead": "Hura n’abarangije bafite ubumenyi biteguye gutanga umusanzu ako kanya. Abarangije TVET bazana ubumenyi ngiro n’imyitwarire myiza mu kazi mu ikipe yawe.",
    "emp.stats.partners": "Amakampani bafatanya",
    "emp.stats.hired": "Abarangije bakiriwe",
    "emp.stats.positions": "Imyanya ifunguye",
    "emp.stats.active": "Bakora isoko ry’abakozi",
    "emp.skills.title": "Ukeneye ubumenyi ki?",
    "emp.skills.desc": "Hitamo ubwoko bw’akazi ukeneyeho ubufasha kugira ngo urebemo impano zihari n’amahirwe yo gufatanya.",
    "emp.selected": "Byahiswemo",
    "emp.talent.title": "Impano zihari",
    "emp.talent.graduates": "Abarangije bafite uburambe ({count})",
    "emp.talent.salary": "Umushahara uriho",
    "emp.talent.expYears": "imyaka y’akazi.",
    "emp.talent.whatsapp": "Vugana kuri WhatsApp",
    "emp.schools.title": "Amashuri bafatanya ({count})",
    "emp.schools.totalGrads": "Umubare w’abarangije",
    "emp.schools.contact": "Vugana n’Ishuri",
    "emp.success.title": "Inkuru z’intsinzi",
    "emp.success.lead": "Reba uko andi makampani yakiriye neza kandi yakoranye n’abarangije TVET.",
    "emp.success.hiredIn": "Bakiriye abarangiye TVET {count} mu {year}",
    "emp.success.salary": "Umushahara: {min} - {max} RWF",
    "emp.success.currentlyHiring": "Bari gukira abantu ku myanya {count}",
    "emp.jobs.title": "Ibyamamaza by’imirimo biheruka",
    "emp.jobs.post": "Tanga itangazo ry’umurimo",
    "emp.jobs.urgent": "Byihutirwa",
    "emp.jobs.posted": "Byatangajwe {date}",
    "emp.jobs.salary": "Umushahara: {min} - {max} RWF",
    "emp.jobs.view": "Reba ibisobanuro",
    "emp.cta.title": "Witeguye Gukoresha Impano za TVET?",
    "emp.cta.lead": "Jya mu itsinda ry’amakampani {count}+ yakiriye neza abarangiye ba TVET bafite ubumenyi ngiro n’imyitwarire myiza mu kazi.",
    "emp.cta.postFirst": "Tanga itangazo ryawe rya mbere",
    "emp.cta.explore": "Reba amahirwe yo gufatanya",

    // Career labels
    "career.monthlySalary": "Umushahara w’ukwezi",
    "career.employmentRate": "Igipimo cyo kubona akazi",
    "career.marketDemand": "Isoko ry’umwuga",
    "career.growthPotential": "Amahirwe yo gukura",
    "career.keySkills": "Ubumenyi nyamukuru uziga",
    "career.whyMatch": "Impamvu uhuye n’uyu mwuga",
  },
}

export const I18nProvider = ({ children }) => {
  const [lang, setLang] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("lang") || "rw"
    }
    return "rw"
  })

  const t = useMemo(() => {
    return (key, params = {}) => {
      const dict = translations[lang] || translations.en
      let text = dict[key] || translations.en[key] || key
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(new RegExp(`{${k}}`, "g"), v)
      })
      return text
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang: (l) => { setLang(l); try { localStorage.setItem("lang", l) } catch (_) {} }, t }), [lang, t])
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export const useI18n = () => useContext(I18nContext)


