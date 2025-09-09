const KEY = "admin_employer_requests"

function read(){ try { return JSON.parse(localStorage.getItem(KEY) || "[]") } catch { return [] } }
function write(v){ localStorage.setItem(KEY, JSON.stringify(v)) }

export const Requests = {
  list(){ return read().sort((a,b) => b.ts - a.ts) },
  add(req){ const all = read(); all.unshift({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, ts: Date.now(), status: "pending", ...req }); write(all); return all[0] },
  update(id, updates){ const all = read(); const i = all.findIndex(r=>r.id===id); if (i<0) return null; all[i] = { ...all[i], ...updates }; write(all); return all[i] },
  remove(id){ const all = read(); const i = all.findIndex(r=>r.id===id); if (i<0) return false; all.splice(i,1); write(all); return true },
}


