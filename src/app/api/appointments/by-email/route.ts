import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { client } from '@/lib/sanity'

export async function GET(_req: NextRequest) {
    const session = await getServerSession(authOptions)
    const email = session?.user?.email

    if (!email) {
        return NextResponse.json({ error: 'Não autenticado' }, { status: 401 })
    }

    try {
        const appointments = await client.fetch(
            `*[_type == "appointment" && customerEmail == $email] | order(date desc, startTime asc){
                _id, date, startTime, endTime, serviceName, status, mode, notes, cancelToken
            }`,
            { email },
        )

        return NextResponse.json({ appointments })
    } catch (err: unknown) {
        console.error('Erro ao obter agendamentos:', err)
        return NextResponse.json({ error: 'Falha ao obter agendamentos' }, { status: 500 })
    }
}