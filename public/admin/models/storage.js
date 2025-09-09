// Overlay storage to avoid modifying shipped JSON
const PREFIX = "admin_overrides."

export function readOverrides(key){
  try { return JSON.parse(localStorage.getItem(PREFIX + key) || "[]") } catch { return [] }
}

export function writeOverrides(key, value){
  localStorage.setItem(PREFIX + key, JSON.stringify(value))
}

export async function readBaseJson(path){
  try {
    const res = await fetch(path, { cache: "no-store" })
    if (!res.ok) throw new Error("fetch failed")
    return await res.json()
  } catch {
    return []
  }
}

export async function getDataset(name, basePath){
  const [base, overrides, adminData] = await Promise.all([
    readBaseJson(basePath),
    Promise.resolve(readOverrides(name)),
    Promise.resolve(readAdminData(name)),
  ])
  // Merge by id; admin data wins over overrides, overrides win over base
  const byId = new Map(base.map(x => [x.id, x]))
  for (const item of overrides){ byId.set(item.id, item) }
  for (const item of adminData){ byId.set(item.id, item) }
  return Array.from(byId.values())
}

function readAdminData(name){
  try { 
    const key = `admin_${name === "jobs" ? "job_postings" : name}_data`
    return JSON.parse(localStorage.getItem(key) || "[]") 
  } catch { 
    return [] 
  }
}


