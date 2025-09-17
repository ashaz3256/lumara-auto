import { NextRequest, NextResponse } from 'next/server'
import { IntakeSchema, type Intake, type Advice } from '@/lib/schemas'
import { generateAdvice } from '@/lib/ai'
import { prisma } from '@/lib/db'
import { z } from 'zod'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate input
    const intake: Intake = IntakeSchema.parse(body)
    
    // Generate advice using AI
    const { advice, safetyMessage } = await generateAdvice(intake)
    
    // Create session in database
    const session = await prisma.session.create({
      data: {
        severity: advice.severity,
        summary: advice.driveability,
        symptoms: {
          create: intake.symptoms.map(symptom => ({
            key: symptom.key,
            value: symptom.value
          }))
        },
        insights: {
          create: advice.causes.map(cause => ({
            label: cause.cause,
            why: cause.why,
            confidence: cause.confidence,
            steps: advice.checks
          }))
        }
      },
      include: {
        symptoms: true,
        insights: true
      }
    })
    
    // Return advice with session ID
    return NextResponse.json({
      sessionId: session.id,
      advice: {
        ...advice,
        safetyMessage
      }
    })
    
  } catch (error) {
    console.error('Triage API error:', error)
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid input data', details: error.errors },
        { status: 400 }
      )
    }
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
