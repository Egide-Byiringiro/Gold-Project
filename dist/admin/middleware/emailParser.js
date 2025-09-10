// Parse semi-structured employer emails into a job object draft
// Expected free text with key: value lines; flexible on casing and spacing.

const KEY_MAP = {
  title: ["title", "job title", "position"],
  company: ["company", "employer", "organization"],
  career_id: ["career_id", "career", "category", "field"],
  location: ["location", "city", "district"],
  salary_min: ["salary_min", "min salary", "salary from"],
  salary_max: ["salary_max", "max salary", "salary to"],
  posted_date: ["posted_date", "date", "posting date"],
  urgent: ["urgent", "priority"],
  apply_url: ["apply_url", "application url", "apply link", "apply email"],
}

function normKey(k){ return k.trim().toLowerCase().replace(/[^a-z0-9_ ]+/g, "").replace(/\s+/g, " ") }

function findCanonical(key){
  const nk = normKey(key)
  for (const [canon, aliases] of Object.entries(KEY_MAP)){
    if (aliases.includes(nk)) return canon
  }
  return null
}

export function parseEmailToJobDraft(text){
  const draft = {
    title: "",
    company: "",
    career_id: "",
    location: "",
    salary_min: 0,
    salary_max: 0,
    posted_date: new Date().toISOString().slice(0,10),
    urgent: false,
    apply_url: "",
    requirements: [],
    responsibilities: [],
  }

  const lines = text.split(/\r?\n/)
  const block = { requirements: [], responsibilities: [] }
  let currentList = null

  for (const raw of lines){
    const line = raw.trim()
    if (!line) continue
    const m = line.match(/^([^:]+):\s*(.+)$/)
    if (m){
      const key = findCanonical(m[1])
      const val = m[2].trim()
      if (key){
        if (key === "salary_min" || key === "salary_max"){ draft[key] = Number(val.replace(/[^0-9.]/g, "")) || 0 }
        else if (key === "urgent"){ draft.urgent = /^(true|yes|y|1|urgent)$/i.test(val) }
        else if (key === "apply_url" && /@/.test(val) && !/^https?:/i.test(val)){ draft.apply_url = `mailto:${val}` }
        else { draft[key] = val }
        currentList = null
        continue
      }
    }
    // Section headers
    if (/^requirements\b/i.test(line)) { currentList = "requirements"; continue }
    if (/^responsibilit(y|ies)\b/i.test(line)) { currentList = "responsibilities"; continue }
    // Bulleted items
    if (currentList && /^[-*•]\s+/.test(line)){
      block[currentList].push(line.replace(/^[-*•]\s+/, ""))
    }
  }

  if (block.requirements.length) draft.requirements = block.requirements
  if (block.responsibilities.length) draft.responsibilities = block.responsibilities
  return draft
}


