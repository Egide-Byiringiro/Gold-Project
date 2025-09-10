import { Audit } from "./audit.js"

const LS_KEY = "admin_session"

const demoUsers = [
  { id: "1", email: "admin@example.com", name: "Admin", role: "superadmin", password: "admin123" },
  { id: "2", email: "editor@example.com", name: "Editor", role: "editor", password: "editor123" },
  { id: "3", email: "viewer@example.com", name: "Viewer", role: "viewer", password: "viewer123" },
]

export function initAuth(){
  if (!localStorage.getItem("admin_users")){
    localStorage.setItem("admin_users", JSON.stringify(demoUsers))
  }
}

export function getSession(){
  const raw = localStorage.getItem(LS_KEY)
  try { return raw ? JSON.parse(raw) : null } catch { return null }
}

export function setSession(session){
  localStorage.setItem(LS_KEY, JSON.stringify(session))
}

export function clearSession(){
  localStorage.removeItem(LS_KEY)
}

export function login(email, password){
  const users = JSON.parse(localStorage.getItem("admin_users") || "[]")
  const user = users.find(u => u.email === email && u.password === password)
  if (!user) return null
  const session = { user: { id: user.id, email: user.email, name: user.name, role: user.role }, ts: Date.now() }
  setSession(session)
  Audit.record("login", { email })
  return session
}

export function logout(){
  Audit.record("logout", {})
  clearSession()
}

export function requireAuth(roles){
  return () => {
    const s = getSession()
    if (!s) return false
    if (!roles) return true
    return roles.includes(s.user.role)
  }
}


