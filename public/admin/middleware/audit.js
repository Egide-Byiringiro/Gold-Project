const AUDIT_KEY = "admin_audit_log"

function read(){
  try { return JSON.parse(localStorage.getItem(AUDIT_KEY) || "[]") } catch { return [] }
}
function write(entries){ localStorage.setItem(AUDIT_KEY, JSON.stringify(entries)) }

export const Audit = {
  record(event, detail){
    const entries = read()
    entries.unshift({ id: `${Date.now()}-${Math.random().toString(36).slice(2)}`, ts: Date.now(), event, detail })
    write(entries.slice(0, 1000))
  },
  list(){ return read() },
  clear(){ write([]) },
}


