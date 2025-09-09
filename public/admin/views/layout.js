import { getSession, logout } from "../middleware/auth.js"

export function renderLayout(contentNode){
  const session = getSession()
  const wrapper = document.createElement("div")
  wrapper.innerHTML = `
    <div class="header">
      <div class="header-inner">
        <div class="brand"><div class="brand-badge">TC</div> Admin</div>
        <div>
          ${session ? `<span class="chip">${session.user.email} (${session.user.role})</span>
          <button id="logoutBtn" class="btn ghost">Logout</button>` : ""}
        </div>
      </div>
    </div>
    <div class="main">
      <div class="sidebar">
        <div style="padding:12px">
          <a href="#/dashboard" class="nav-link">Dashboard</a>
          <a href="#/users" class="nav-link">Users</a>
          <a href="#/content" class="nav-link">Content</a>
          <a href="#/requests" class="nav-link">Requests</a>
          <a href="#/analytics" class="nav-link">Analytics</a>
          <a href="#/system" class="nav-link">System</a>
        </div>
      </div>
      <div class="content"></div>
    </div>
  `

  const content = wrapper.querySelector(".content")
  content.appendChild(contentNode)

  const links = wrapper.querySelectorAll(".nav-link")
  links.forEach(a => {
    if (a.getAttribute("href") === location.hash) a.classList.add("active")
    else a.classList.remove("active")
  })

  const logoutBtn = wrapper.querySelector("#logoutBtn")
  if (logoutBtn){
    logoutBtn.addEventListener("click", () => { logout(); location.hash = "#/login" })
  }

  return wrapper
}


