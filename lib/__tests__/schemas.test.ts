import { describe, it, expect } from 'vitest'
import { SymptomSchema, IntakeSchema, AdviceSchema } from '../schemas'

describe('Zod Schemas', () => {
  describe('SymptomSchema', () => {
    it('should validate correct symptom data', () => {
      const validSymptom = { key: 'light', value: 'Check Engine Light' }
      const result = SymptomSchema.safeParse(validSymptom)
      
      expect(result.success).toBe(true)
    })

    it('should reject empty key', () => {
      const invalidSymptom = { key: '', value: 'Check Engine Light' }
      const result = SymptomSchema.safeParse(invalidSymptom)
      
      expect(result.success).toBe(false)
    })

    it('should reject empty value', () => {
      const invalidSymptom = { key: 'light', value: '' }
      const result = SymptomSchema.safeParse(invalidSymptom)
      
      expect(result.success).toBe(false)
    })
  })

  describe('IntakeSchema', () => {
    it('should validate correct intake data', () => {
      const validIntake = {
        vehicle: { make: 'Toyota', fuel: 'petrol' },
        symptoms: [{ key: 'light', value: 'Check Engine Light' }],
        notes: 'Additional info'
      }
      const result = IntakeSchema.safeParse(validIntake)
      
      expect(result.success).toBe(true)
    })

    it('should require at least one symptom', () => {
      const invalidIntake = {
        vehicle: { make: 'Toyota' },
        symptoms: []
      }
      const result = IntakeSchema.safeParse(invalidIntake)
      
      expect(result.success).toBe(false)
    })

    it('should validate fuel enum', () => {
      const validIntake = {
        vehicle: { fuel: 'diesel' },
        symptoms: [{ key: 'light', value: 'Check Engine Light' }]
      }
      const result = IntakeSchema.safeParse(validIntake)
      
      expect(result.success).toBe(true)
    })

    it('should reject invalid fuel type', () => {
      const invalidIntake = {
        vehicle: { fuel: 'gas' },
        symptoms: [{ key: 'light', value: 'Check Engine Light' }]
      }
      const result = IntakeSchema.safeParse(invalidIntake)
      
      expect(result.success).toBe(false)
    })
  })

  describe('AdviceSchema', () => {
    it('should validate correct advice data', () => {
      const validAdvice = {
        severity: 'OK',
        driveability: 'Safe to drive',
        causes: [
          {
            cause: 'Dirty air filter',
            why: 'Restricts airflow',
            confidence: 0.8
          }
        ],
        checks: ['Check air filter', 'Inspect for damage']
      }
      const result = AdviceSchema.safeParse(validAdvice)
      
      expect(result.success).toBe(true)
    })

    it('should validate severity enum', () => {
      const validAdvice = {
        severity: 'STOP',
        driveability: 'Do not drive',
        causes: [{ cause: 'Test', why: 'Test', confidence: 0.5 }],
        checks: ['Test check']
      }
      const result = AdviceSchema.safeParse(validAdvice)
      
      expect(result.success).toBe(true)
    })

    it('should reject invalid severity', () => {
      const invalidAdvice = {
        severity: 'DANGER',
        driveability: 'Do not drive',
        causes: [{ cause: 'Test', why: 'Test', confidence: 0.5 }],
        checks: ['Test check']
      }
      const result = AdviceSchema.safeParse(invalidAdvice)
      
      expect(result.success).toBe(false)
    })

    it('should validate confidence range', () => {
      const validAdvice = {
        severity: 'OK',
        driveability: 'Safe to drive',
        causes: [{ cause: 'Test', why: 'Test', confidence: 1.0 }],
        checks: ['Test check']
      }
      const result = AdviceSchema.safeParse(validAdvice)
      
      expect(result.success).toBe(true)
    })

    it('should reject confidence outside range', () => {
      const invalidAdvice = {
        severity: 'OK',
        driveability: 'Safe to drive',
        causes: [{ cause: 'Test', why: 'Test', confidence: 1.5 }],
        checks: ['Test check']
      }
      const result = AdviceSchema.safeParse(invalidAdvice)
      
      expect(result.success).toBe(false)
    })
  })
})
