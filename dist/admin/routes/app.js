import { initRouter } from "./router.js"
import { requireAuth, initAuth } from "../middleware/auth.js"
import { renderLayout } from "../views/layout.js"
import { Audit } from "../middleware/audit.js"

initAuth()

const root = document.getElementById("admin-root")

const routes = [
  { path: "#/login", render: () => import("../views/login.js").then(m => m.renderLogin()) },
  { path: "#/dashboard", guard: requireAuth(["viewer","editor","superadmin"]), render: () => import("../views/dashboard.js").then(m => m.renderDashboard()) },
  { path: "#/users", guard: requireAuth(["editor","superadmin"]), render: () => import("../views/users.js").then(m => m.renderUsers()) },
  { path: "#/content", guard: requireAuth(["editor","superadmin"]), render: () => import("../views/content.js").then(m => m.renderContent()) },
  { path: "#/requests", guard: requireAuth(["editor","superadmin"]), render: () => import("../views/requests.js").then(m => m.renderRequests()) },
  { path: "#/system", guard: requireAuth(["superadmin"]), render: () => import("../views/system.js").then(m => m.renderSystem()) },
  { path: "#/analytics", guard: requireAuth(["viewer","editor","superadmin"]), render: () => import("../views/analytics.js").then(m => m.renderAnalytics()) },
  { path: "*", redirect: "#/dashboard" },
]

const appRender = async (view) => {
  root.innerHTML = ""
  root.appendChild(renderLayout(view))
}

const router = initRouter(routes, appRender)

window.addEventListener("load", () => {
  Audit.record("admin_app_loaded", {})
  router.navigate(location.hash || "#/dashboard")
})

window.addEventListener("hashchange", () => router.handle())


