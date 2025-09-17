import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    
    const sessions = await prisma.session.findMany({
      where: userId ? { userId } : {},
      include: {
        symptoms: true,
        insights: true,
        vehicle: true
      },
      orderBy: { createdAt: 'desc' },
      take: 50
    })
    
    return NextResponse.json({ sessions })
    
  } catch (error) {
    console.error('Sessions API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { userId, vehicleId, severity, summary, symptoms, insights } = body
    
    const session = await prisma.session.create({
      data: {
        userId,
        vehicleId,
        severity,
        summary,
        symptoms: {
          create: symptoms.map((s: any) => ({
            key: s.key,
            value: s.value
          }))
        },
        insights: {
          create: insights.map((i: any) => ({
            label: i.label,
            why: i.why,
            confidence: i.confidence,
            steps: i.steps
          }))
        }
      },
      include: {
        symptoms: true,
        insights: true
      }
    })
    
    return NextResponse.json({ session })
    
  } catch (error) {
    console.error('Create session error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
