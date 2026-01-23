import { NextRequest, NextResponse } from 'next/server'
import { getAvailability } from '@/lib/availability'

export async function GET(req: NextRequest) {
    const { searchParams } = new URL(req.url)
    const startDate = searchParams.get('startDate') || undefined
    const daysParam = searchParams.get('days')
    const days = daysParam ? Number(daysParam) : undefined

    try {
        const availability = await getAvailability({ startDate, days })
        return NextResponse.json({ availability })
    } catch (err: unknown) {
        console.error('Erro ao obter disponibilidade:', err)
        return NextResponse.json({ error: 'Falha ao obter disponibilidade' }, { status: 500 })
    }
}