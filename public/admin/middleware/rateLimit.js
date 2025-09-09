const KEY = "admin_rate_limits"

function read(){ try { return JSON.parse(localStorage.getItem(KEY) || "{}") } catch { return {} } }
function write(v){ localStorage.setItem(KEY, JSON.stringify(v)) }

export const RateLimit = {
  allow(action, { windowMs = 60_000, max = 20 } = {}){
    const now = Date.now()
    const all = read()
    const list = (all[action] || []).filter(ts => now - ts < windowMs)
    if (list.length >= max) return false
    list.push(now)
    all[action] = list
    write(all)
    return true
  }
}


