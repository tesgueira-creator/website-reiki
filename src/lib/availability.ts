import { client } from './sanity'

const SLOT_DURATION_MIN = 90
const BUFFER_MIN = 15
const STEP_MIN = SLOT_DURATION_MIN + BUFFER_MIN
const DAY_START_MIN = 9 * 60
const DAY_END_MIN = 19 * 60

type Slot = { time: string; available: boolean }
export type DayAvailability = {
    date: string
    dayName: string
    dayNum: number
    month: string
    isWeekend: boolean
    slots: Slot[]
}

function formatTime(minutes: number): string {
    const h = Math.floor(minutes / 60)
    const m = minutes % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}`
}

function isWeekend(date: Date) {
    const day = date.getDay()
    return day === 0 || day === 6
}

export async function getAvailability(options?: { startDate?: string; days?: number }) {
    const days = options?.days ?? 14
    const start = options?.startDate ? new Date(options.startDate) : new Date()

    const startDate = new Date(Date.UTC(start.getFullYear(), start.getMonth(), start.getDate()))
    const endDate = new Date(startDate)
    endDate.setDate(endDate.getDate() + days)

    const startStr = startDate.toISOString().split('T')[0]
    const endStr = endDate.toISOString().split('T')[0]

    const bookings: { date: string; startTime: string }[] = await client.fetch(
        `*[_type == "appointment" && status != "canceled" && date >= $start && date <= $end]{date, startTime}`,
        { start: startStr, end: endStr },
    )

    const bookedSet = new Set(bookings.map((b) => `${b.date}|${b.startTime}`))

    const daysAvailability: DayAvailability[] = []

    for (let i = 0; i < days; i += 1) {
        const date = new Date(startDate)
        date.setDate(startDate.getDate() + i + 1) // start from tomorrow by default

        const dateStr = date.toISOString().split('T')[0]
        const weekend = isWeekend(date)

        const slots: Slot[] = []
        for (let minutes = DAY_START_MIN; minutes + SLOT_DURATION_MIN <= DAY_END_MIN; minutes += STEP_MIN) {
            const time = formatTime(minutes)
            const available = !weekend && !bookedSet.has(`${dateStr}|${time}`)
            slots.push({ time, available })
        }

        if (!weekend) {
            daysAvailability.push({
                date: dateStr,
                dayName: date.toLocaleDateString('pt-PT', { weekday: 'short' }),
                dayNum: date.getDate(),
                month: date.toLocaleDateString('pt-PT', { month: 'short' }),
                isWeekend: weekend,
                slots,
            })
        }
    }

    return daysAvailability
}