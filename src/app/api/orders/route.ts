import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'

// Placeholder endpoint: blocks orders until catálogo real estiver ativo
export async function GET(_req: NextRequest) {
    const session = await getServerSession(authOptions)
    if (!session?.user?.email) {
        return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    return NextResponse.json({
        enabled: false,
        message: 'Encomendas bloqueadas até produtos reais estarem online.',
        orders: [],
    })
}