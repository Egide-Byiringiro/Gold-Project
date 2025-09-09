TVET Career Catalyst — Admin Analysis

Technology stack
- Frontend: React 18 with React Router DOM v6, Vite, Tailwind CSS (with custom gradients/utilities), Radix UI components and lucide-react icons.
- State/i18n: Simple React context `src/context/i18n.jsx` for translations and language toggle.
- Data source: Static JSON files under `src/data/` (e.g., `careers.json`, `scenarios.json`, `job_postings.json`, `employers.json`, `graduates.json`, `schools.json`). Business logic utilities in `src/utils/` read from these JSON files and return computed datasets.
- Build: Vite config with PWA plugin; app served as SPA. No backend server code is present in this repository.

Routing
- Entrypoint: `src/main.jsx` mounts `App` within `BrowserRouter` and `I18nProvider`.
- Layout wrapper: `src/components/Layout.jsx` provides header/footer and language switcher.
- Routes in `src/App.jsx`:
  - `/` → `HomePage`
  - `/scenarios/:userType` → `ScenarioSelector`
  - `/career-match/:scenarioId` → `CareerMatch`
  - `/graduates/:careerId` → `GraduateStories`
  - `/ready/:careerId` → `ReadyToStart`
  - `/employers` → `EmployerDashboard`
  - `/employer-stories` → `EmployerStories`
  - `/jobs` → `JobPostings`
  - `/parents` → `ParentGuide`

Data models (inferred from JSON)
- careers.json: career objects with fields like `id`, `title`, `description`, `average_salary_min`, `average_salary_max`, `employment_rate`, `demand_level`, `growth_potential`, `key_skills`, localized `*_rw` variants.
- scenarios.json: scenario objects with `id`, `title`, `description`, `icon`, localized fields.
- job_postings.json: job objects with `id`, `career_id`, `title`, `location`, `posted_date`, salary range, `requirements`, `responsibilities`, `urgent`, `apply_url`.
- employers.json / graduates.json / schools.json: collections used by employer dashboard utilities for stats and lists.

APIs and authentication
- No network API calls or auth system are present. All data is local JSON and utility functions in `src/utils/matching.js` and `src/utils/employer_matching.js`.
- No user accounts/roles currently implemented.

Architecture and patterns
- Pure frontend SPA with component-driven pages, tailwind styling, and utility modules for data selection/matching.
- PWA via `vite-plugin-pwa` with `public/sw.js` and manifest assets.

User roles and permissions
- None implemented in current codebase. All pages are public.

Implications for admin panel
- There is no backend; to avoid modifying existing functionality, admin must be isolated and client-side only.
- We will implement a static admin SPA under `public/admin/` to be served standalone (e.g., at `/admin/index.html`), avoiding changes to React Router in the main app.
- Admin data writes will use LocalStorage overlays (shadow copies) keyed by dataset name (e.g., `admin_overrides.careers`) so we do not alter the shipped JSON. The runtime UI will remain unchanged.
- We will implement lightweight client-side auth (password hash stored in env/localStorage) with RBAC (roles: superadmin, editor, viewer) enforced within the admin SPA only.
- Audit logging will be stored in LocalStorage and visible in admin. Rate limiting will be enforced client-side per action to deter accidental misuse.

Security notes
- Without a backend, true security is limited. The admin SPA is intended for demo/local environments. In production, a backend with real auth, CSRF, and server-side authorization is required. We’ll still add best-effort client-side protections (input validation, action confirmation, basic lockouts).

Integration plan
- Place admin SPA under `public/admin/` with its own HTML, CSS, JS bundle and no impact on `src/` routes.
- Do not modify existing components/utilities. Admin code reads existing JSON for display and writes to LocalStorage overlays only.


