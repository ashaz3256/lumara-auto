import { openai } from '@ai-sdk/openai'
import { generateObject } from 'ai'
import { z } from 'zod'
import { AdviceSchema, type Intake } from './schemas'
import { getKB, getFuelContext } from './kb'

const model = openai('gpt-4o-mini', {
  objectGenerationMode: 'json'
})

// Safety gates for critical symptoms
export function applySafetyGates(symptoms: Array<{ key: string; value: string }>): { severity: 'STOP' | 'LIMIT' | 'OK' | null; message?: string } {
  const symptomValues = symptoms.map(s => s.value.toLowerCase())
  
  // STOP conditions - never override these
  if (symptomValues.some(v => v.includes('oil-pressure') || v.includes('oil pressure'))) {
    return { 
      severity: 'STOP', 
      message: 'CRITICAL: Oil pressure warning detected. Turn off engine immediately and do not drive. This can cause severe engine damage within minutes.' 
    }
  }
  
  if (symptomValues.some(v => v.includes('overheating') || v.includes('overheat') || v.includes('temp red'))) {
    return { 
      severity: 'STOP', 
      message: 'CRITICAL: Engine overheating detected. Pull over immediately and turn off engine. Do not open radiator cap when hot.' 
    }
  }
  
  if (symptomValues.some(v => v.includes('brake') && (v.includes('soft') || v.includes('floor')))) {
    return { 
      severity: 'STOP', 
      message: 'CRITICAL: Brake system failure detected. Do not drive. Brake pedal going to floor indicates loss of hydraulic pressure.' 
    }
  }
  
  // LIMIT conditions
  if (symptomValues.some(v => v.includes('battery') || v.includes('charging'))) {
    return { 
      severity: 'LIMIT', 
      message: 'Battery/charging issue detected. Safe for short trips during daylight only. Avoid long distances or night driving.' 
    }
  }
  
  return { severity: null }
}

export async function generateAdvice(intake: Intake): Promise<{ advice: any; safetyMessage?: string }> {
  // Apply safety gates first
  const safetyCheck = applySafetyGates(intake.symptoms)
  
  // Get relevant knowledge base content
  const symptomText = intake.symptoms.map(s => `${s.key}: ${s.value}`).join(', ')
  const kbContent = await getKB(symptomText)
  const fuelContext = getFuelContext(intake.vehicle)
  
  const systemPrompt = `You are a cautious automotive triage assistant. Use ONLY the user's structured symptoms and the provided knowledge base snippets. Never suggest hazardous actions.

SAFETY RULES:
- If oil pressure warning, overheating, or brake failure detected → severity = "STOP"
- Battery/charging issues only → severity = "LIMIT" 
- Never suggest fuel system work, airbag work, high-voltage work, or lifting the car
- Always recommend professional diagnosis for complex issues

Return JSON matching this schema:
- severity: "STOP" | "LIMIT" | "OK"
- driveability: Clear advice on whether they can drive
- causes: 3-5 ranked causes with "why" explanation and confidence (0-1)
- checks: 3-6 safe checks a beginner could do
- notes: Additional safety considerations

Vehicle context: ${fuelContext} fuel
Symptoms: ${symptomText}
${intake.notes ? `Additional notes: ${intake.notes}` : ''}

Knowledge base:
${kbContent}

Be conservative with safety assessments. If uncertain, recommend professional help.`

  try {
    const { object: advice } = await generateObject({
      model,
      schema: AdviceSchema,
      prompt: systemPrompt,
    })
    
    return { 
      advice,
      safetyMessage: safetyCheck.message 
    }
  } catch (error) {
    console.error('AI generation error:', error)
    throw new Error('Failed to generate advice')
  }
}
