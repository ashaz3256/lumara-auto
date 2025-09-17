import { z } from 'zod'

export const SymptomSchema = z.object({
  key: z.string().min(1),
  value: z.string().min(1)
})

export const IntakeSchema = z.object({
  vehicle: z.object({
    make: z.string().optional(),
    model: z.string().optional(),
    year: z.number().optional(),
    fuel: z.enum(['petrol', 'diesel', 'hybrid', 'ev']).optional()
  }),
  symptoms: z.array(SymptomSchema).min(1),
  notes: z.string().max(500).optional()
})

export const AdviceSchema = z.object({
  severity: z.enum(['STOP', 'LIMIT', 'OK']),
  driveability: z.string(),
  causes: z.array(z.object({
    cause: z.string(),
    why: z.string(),
    confidence: z.number().min(0).max(1)
  })).min(1),
  checks: z.array(z.string()).min(1),
  notes: z.string().optional()
})

export type Symptom = z.infer<typeof SymptomSchema>
export type Intake = z.infer<typeof IntakeSchema>
export type Advice = z.infer<typeof AdviceSchema>

export interface SessionData {
  id: string
  userId?: string
  vehicleId?: string
  createdAt: Date
  severity: string
  summary: string
  symptoms: Array<{
    key: string
    value: string
  }>
  insights: Array<{
    label: string
    why: string
    confidence: number
    steps: string[]
  }>
}