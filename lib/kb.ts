import fs from 'fs'
import path from 'path'

const KB_DIR = path.join(process.cwd(), 'packages', 'kb')

// Simple keyword mapping for KB retrieval
const KB_MAPPING: Record<string, string[]> = {
  'epc': ['epc-light-vag.md'],
  'check-engine': ['check-engine-generic.md'],
  'white-smoke': ['white-smoke-petrol.md', 'white-smoke-diesel.md'],
  'overheating': ['overheating.md'],
  'no-crank': ['no-crank.md'],
  'oil-pressure': ['oil-pressure-warning.md'],
  'coolant': ['coolant-low.md'],
  'brake': ['brake-warning.md'],
  'battery': ['battery-charging.md'],
  'dpf': ['diesel-dpf-warning.md'],
  'idle': ['rough-idle-cold-petrol.md'],
  'light': ['epc-light-vag.md', 'check-engine-generic.md'],
  'smoke': ['white-smoke-petrol.md', 'white-smoke-diesel.md'],
  'start': ['no-crank.md'],
  'temp': ['overheating.md', 'coolant-low.md'],
  'pressure': ['oil-pressure-warning.md'],
  'warning': ['oil-pressure-warning.md', 'brake-warning.md', 'coolant-low.md']
}

export async function getKB(topic: string): Promise<string> {
  const keywords = topic.toLowerCase().split(/[\s,-]+/)
  const relevantFiles = new Set<string>()
  
  // Find relevant files based on keywords
  for (const keyword of keywords) {
    if (KB_MAPPING[keyword]) {
      KB_MAPPING[keyword].forEach(file => relevantFiles.add(file))
    }
  }
  
  // If no specific matches, try broader matches
  if (relevantFiles.size === 0) {
    for (const [key, files] of Object.entries(KB_MAPPING)) {
      if (keywords.some(k => k.includes(key) || key.includes(k))) {
        files.forEach(file => relevantFiles.add(file))
      }
    }
  }
  
  // Load and combine relevant files
  const contents: string[] = []
  for (const file of Array.from(relevantFiles)) {
    try {
      const filePath = path.join(KB_DIR, file)
      const content = fs.readFileSync(filePath, 'utf-8')
      // Extract first 300-600 words
      const words = content.split(/\s+/)
      const excerpt = words.slice(0, 500).join(' ')
      contents.push(`## ${file.replace('.md', '')}\n${excerpt}`)
    } catch (error) {
      console.warn(`Failed to load KB file ${file}:`, error)
    }
  }
  
  return contents.join('\n\n') || 'No relevant knowledge base information found.'
}

export function getFuelContext(vehicle: { fuel?: string }): string {
  if (!vehicle.fuel) return 'unknown'
  return vehicle.fuel
}
