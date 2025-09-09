Admin Panel (Client-only) — Setup and Usage

Overview
This repository has no backend. The admin panel is implemented as a self-contained static SPA served at /admin, designed to avoid any changes to the existing application code and routes. All writes occur in LocalStorage overlays; original JSON under src/data remains unchanged.

Accessing the Admin
- Dev: npm run dev then open /admin/index.html (e.g., http://localhost:5173/admin/)
- Build: npm run build then serve dist and visit /admin/

Default Credentials (demo only)
- superadmin: admin@example.com / admin123
- editor: editor@example.com / editor123
- viewer: viewer@example.com / viewer123

Security Note
This is a demo-only client-side admin. Do not use in production without a proper backend, server-side auth, CSRF protection, and authorization. Client-side checks are best-effort and not secure against malicious users.

Data Behavior
- Read-only: Admin reads existing JSON from src/data when available; if not retrievable (depending on static serving), the views still function on top of LocalStorage overlays.
- Write path: Edits are stored under LocalStorage keys: `admin_overrides.<dataset>` (e.g., admin_overrides.careers).
- Effective data = overrides if present, else base JSON.

Features Included
- Auth + RBAC roles: superadmin, editor, viewer
- Users: CRUD (LocalStorage), role assignment, import/export JSON
- Content: Careers, Scenarios, Job Postings — view base data, add/update/delete overrides
- System: Site settings (LocalStorage), email templates, audit logs viewer
- Analytics: Simple charts from datasets (counts, recent activity)
- Security: Client-side route guards, basic rate limiting, audit logging of admin actions

File Structure (under public/admin)
/admin/
  controllers/     — Orchestrate view actions and audit logging
  models/          — Schemas and helpers for datasets
  views/           — Render functions for pages
  middleware/      — Auth guards, rate limits, audit helpers
  routes/          — Route table and router setup
  assets/          — CSS and images
  config/          — Admin-specific configuration
  migrations/      — Placeholder (no DB in this repo)

Extending
- Add a backend API and replace storage.js overlay reads/writes with API calls.
- Replace demo auth with real authentication; persist JWT/session cookies and enforce server-side RBAC.


