import { login, getSession } from "../middleware/auth.js"

export function renderLogin(){
  const wrap = document.createElement("div")
  wrap.className = "card login"
  wrap.innerHTML = `
    <h2>Admin Login</h2>
    <p class="muted">Demo credentials in README_ADMIN.md</p>
    <div style="margin-top:12px">
      <label>Email</label>
      <input id="email" class="input" placeholder="admin@example.com" />
    </div>
    <div style="margin-top:12px">
      <label>Password</label>
      <input id="password" class="input" type="password" placeholder="••••••••" />
    </div>
    <div style="margin-top:16px;display:flex;gap:8px;align-items:center">
      <button id="loginBtn" class="btn primary">Sign In</button>
      <span id="msg" class="muted"></span>
    </div>
  `

  const btn = wrap.querySelector("#loginBtn")
  const msg = wrap.querySelector("#msg")
  btn.addEventListener("click", () => {
    const email = wrap.querySelector("#email").value.trim()
    const password = wrap.querySelector("#password").value
    const s = login(email, password)
    if (!s){ msg.textContent = "Invalid credentials"; return }
    location.hash = "#/dashboard"
  })

  // Auto-redirect if already logged in
  if (getSession()){ location.hash = "#/dashboard" }

  return wrap
}


