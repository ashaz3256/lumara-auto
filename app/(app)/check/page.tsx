'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { type Intake, type Symptom } from '@/lib/schemas'

const SYMPTOM_OPTIONS = {
  lights: [
    { key: 'light', value: 'Check Engine Light', description: 'Yellow/orange engine symbol' },
    { key: 'light', value: 'EPC Light', description: 'Electronic Power Control (VW/Audi)' },
    { key: 'light', value: 'Oil Pressure Light', description: 'Red oil can symbol' },
    { key: 'light', value: 'Coolant Temperature', description: 'Red thermometer symbol' },
    { key: 'light', value: 'Brake Warning', description: 'Red exclamation mark in circle' },
    { key: 'light', value: 'Battery/Charging', description: 'Red battery symbol' },
    { key: 'light', value: 'ABS Warning', description: 'Yellow ABS letters' },
    { key: 'light', value: 'Airbag Warning', description: 'Red person with airbag' }
  ],
  engine: [
    { key: 'start', value: 'Won\'t Start', description: 'Engine doesn\'t turn over' },
    { key: 'start', value: 'Hard to Start', description: 'Takes multiple attempts' },
    { key: 'start', value: 'Rough Idle', description: 'Engine shakes or stumbles at idle' },
    { key: 'noise', value: 'Knocking Sound', description: 'Metallic knocking from engine' },
    { key: 'noise', value: 'Squealing Sound', description: 'High-pitched squeal' },
    { key: 'noise', value: 'Grinding Sound', description: 'Metal grinding noise' },
    { key: 'performance', value: 'Loss of Power', description: 'Reduced acceleration' },
    { key: 'performance', value: 'Poor Fuel Economy', description: 'Lower than usual MPG' }
  ],
  smoke: [
    { key: 'smoke', value: 'White Smoke', description: 'White smoke from exhaust' },
    { key: 'smoke', value: 'Blue Smoke', description: 'Blue smoke from exhaust' },
    { key: 'smoke', value: 'Black Smoke', description: 'Black smoke from exhaust' },
    { key: 'smoke', value: 'Steam from Hood', description: 'Steam coming from engine bay' }
  ],
  temperature: [
    { key: 'temp', value: 'Overheating', description: 'Temperature gauge in red' },
    { key: 'temp', value: 'Running Hot', description: 'Temperature higher than normal' },
    { key: 'temp', value: 'Running Cold', description: 'Temperature lower than normal' }
  ],
  brakes: [
    { key: 'brake', value: 'Soft Pedal', description: 'Brake pedal goes to floor' },
    { key: 'brake', value: 'Grinding Noise', description: 'Grinding when braking' },
    { key: 'brake', value: 'Pulling to Side', description: 'Car pulls left or right when braking' },
    { key: 'brake', value: 'Vibration', description: 'Steering wheel shakes when braking' }
  ]
}

export default function CheckPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [vehicle, setVehicle] = useState({
    make: '',
    model: '',
    year: '',
    fuel: ''
  })
  const [symptoms, setSymptoms] = useState<Symptom[]>([])
  const [notes, setNotes] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSymptomToggle = (symptom: { key: string; value: string }) => {
    setSymptoms(prev => {
      const exists = prev.some(s => s.key === symptom.key && s.value === symptom.value)
      if (exists) {
        return prev.filter(s => !(s.key === symptom.key && s.value === symptom.value))
      } else {
        return [...prev, symptom]
      }
    })
  }

  const handleSubmit = async () => {
    if (symptoms.length === 0) {
      alert('Please select at least one symptom')
      return
    }

    setIsSubmitting(true)
    try {
      const intake: Intake = {
        vehicle: {
          make: vehicle.make || undefined,
          model: vehicle.model || undefined,
          year: vehicle.year ? parseInt(vehicle.year) : undefined,
          fuel: vehicle.fuel as any || undefined
        },
        symptoms,
        notes: notes || undefined
      }

      const response = await fetch('/api/ai/triage', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(intake)
      })

      if (!response.ok) {
        throw new Error('Failed to submit check')
      }

      const data = await response.json()
      router.push(`/result/${data.sessionId}`)
    } catch (error) {
      console.error('Submit error:', error)
      alert('Failed to submit check. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Car Symptom Check</h1>
          <p className="text-gray-600">Describe what's happening with your car</p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">Step {step} of 3</span>
            <span className="text-sm text-gray-500">{Math.round((step / 3) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>

        {/* Step 1: Vehicle Information */}
        {step === 1 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Vehicle Information (Optional)</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Make</label>
                <input
                  type="text"
                  value={vehicle.make}
                  onChange={(e) => setVehicle(prev => ({ ...prev, make: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Toyota, Ford, BMW"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Model</label>
                <input
                  type="text"
                  value={vehicle.model}
                  onChange={(e) => setVehicle(prev => ({ ...prev, model: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Camry, Focus, X3"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Year</label>
                <input
                  type="number"
                  value={vehicle.year}
                  onChange={(e) => setVehicle(prev => ({ ...prev, year: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., 2020"
                  min="1990"
                  max="2024"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Type</label>
                <select
                  value={vehicle.fuel}
                  onChange={(e) => setVehicle(prev => ({ ...prev, fuel: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">Select fuel type</option>
                  <option value="petrol">Petrol/Gasoline</option>
                  <option value="diesel">Diesel</option>
                  <option value="hybrid">Hybrid</option>
                  <option value="ev">Electric</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors"
              >
                Next: Select Symptoms
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Symptoms */}
        {step === 2 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Select All That Apply</h2>
            
            {Object.entries(SYMPTOM_OPTIONS).map(([category, options]) => (
              <div key={category} className="mb-8">
                <h3 className="text-lg font-medium text-gray-800 mb-4 capitalize">
                  {category.replace('_', ' ')} Issues
                </h3>
                <div className="grid md:grid-cols-2 gap-3">
                  {options.map((option, index) => (
                    <label
                      key={index}
                      className="flex items-start p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={symptoms.some(s => s.key === option.key && s.value === option.value)}
                        onChange={() => handleSymptomToggle(option)}
                        className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900">{option.value}</div>
                        <div className="text-xs text-gray-500">{option.description}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            ))}

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(1)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={() => setStep(3)}
                disabled={symptoms.length === 0}
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next: Review & Submit
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Review & Submit */}
        {step === 3 && (
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Check</h2>
            
            <div className="space-y-6">
              {/* Vehicle Info */}
              {(vehicle.make || vehicle.model || vehicle.year || vehicle.fuel) && (
                <div>
                  <h3 className="text-lg font-medium text-gray-800 mb-2">Vehicle</h3>
                  <div className="text-gray-600">
                    {[vehicle.make, vehicle.model, vehicle.year, vehicle.fuel].filter(Boolean).join(' ')}
                  </div>
                </div>
              )}

              {/* Symptoms */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-2">Selected Symptoms ({symptoms.length})</h3>
                <div className="space-y-1">
                  {symptoms.map((symptom, index) => (
                    <div key={index} className="text-gray-600">
                      • {symptom.value}
                    </div>
                  ))}
                </div>
              </div>

              {/* Notes */}
              <div>
                <label className="block text-lg font-medium text-gray-800 mb-2">Additional Notes (Optional)</label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                  placeholder="Any additional details about the symptoms or conditions..."
                />
              </div>
            </div>

            <div className="flex justify-between mt-8">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
              >
                Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || symptoms.length === 0}
                className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Analyzing...' : 'Submit Check'}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
