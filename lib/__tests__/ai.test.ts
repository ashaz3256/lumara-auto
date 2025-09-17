import { describe, it, expect } from 'vitest'
import { applySafetyGates } from '../ai'

describe('AI Safety Gates', () => {
  it('should return STOP for oil pressure warning', () => {
    const symptoms = [{ key: 'light', value: 'Oil Pressure Light' }]
    const result = applySafetyGates(symptoms)
    
    expect(result.severity).toBe('STOP')
    expect(result.message).toContain('Oil pressure warning')
  })

  it('should return STOP for overheating', () => {
    const symptoms = [{ key: 'temp', value: 'Overheating' }]
    const result = applySafetyGates(symptoms)
    
    expect(result.severity).toBe('STOP')
    expect(result.message).toContain('overheating')
  })

  it('should return STOP for brake failure', () => {
    const symptoms = [{ key: 'brake', value: 'Soft Pedal' }]
    const result = applySafetyGates(symptoms)
    
    expect(result.severity).toBe('STOP')
    expect(result.message).toContain('Brake system failure')
  })

  it('should return LIMIT for battery issues', () => {
    const symptoms = [{ key: 'light', value: 'Battery Warning' }]
    const result = applySafetyGates(symptoms)
    
    expect(result.severity).toBe('LIMIT')
    expect(result.message).toContain('Battery/charging issue')
  })

  it('should return null for non-critical symptoms', () => {
    const symptoms = [{ key: 'light', value: 'Check Engine Light' }]
    const result = applySafetyGates(symptoms)
    
    expect(result.severity).toBe(null)
  })

  it('should handle multiple symptoms correctly', () => {
    const symptoms = [
      { key: 'light', value: 'Check Engine Light' },
      { key: 'temp', value: 'Overheating' }
    ]
    const result = applySafetyGates(symptoms)
    
    expect(result.severity).toBe('STOP')
  })
})
