import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'

// Mocks
const createIfNotExistsMock = vi.fn()
const fetchMock = vi.fn().mockResolvedValue(null)
const patchCommitMock = vi.fn().mockResolvedValue({})
const patchMock = vi.fn(() => ({ set: () => ({ commit: patchCommitMock }) }))

vi.mock('next-sanity', () => ({
    createClient: () => ({
        createIfNotExists: createIfNotExistsMock,
        fetch: fetchMock,
        patch: patchMock,
    }),
}))

vi.mock('resend', () => ({
    Resend: vi.fn().mockReturnValue({ emails: { send: vi.fn().mockResolvedValue({}) } }),
}))

vi.mock('googleapis', () => ({
    google: {
        auth: { JWT: vi.fn() },
        calendar: vi.fn(() => ({
            events: {
                insert: vi.fn().mockResolvedValue({ data: { id: 'evt_1' } }),
                delete: vi.fn().mockResolvedValue({}),
            },
        })),
    },
}))

// Ensure webhook branch uses parse (no STRIPE_WEBHOOK_SECRET) and SANITY_WRITE_TOKEN is present
// Provide a fake Stripe secret at module load time so the Stripe constructor doesn't throw
process.env.STRIPE_SECRET_KEY = 'sk_test_123'
beforeEach(() => {
    process.env.SANITY_WRITE_TOKEN = 'test-token'
    createIfNotExistsMock.mockReset()
    fetchMock.mockReset()
    patchMock.mockClear()
    patchCommitMock.mockClear()
})

afterEach(() => {
    delete process.env.SANITY_WRITE_TOKEN
    delete process.env.STRIPE_SECRET_KEY
    delete process.env.STRIPE_WEBHOOK_SECRET
    createIfNotExistsMock.mockReset()
    fetchMock.mockReset()
    patchMock.mockClear()
    patchCommitMock.mockClear()
})

describe('Stripe webhook route', () => {
    it('persists stripeOrder when receiving checkout.session.completed', async () => {
        // Import the route dynamically to ensure environment variables (STRIPE_SECRET_KEY) are set before module init
        const route = await import('../app/api/webhook/stripe/route')
        const { POST } = route
        const session = {
            id: 'cs_test_123',
            amount_total: 5000,
            currency: 'eur',
            payment_status: 'paid',
            customer_email: 'test@example.com',
            metadata: { serviceId: 'reiki-kundalini', serviceName: 'Reiki' },
        }

        const event = { type: 'checkout.session.completed', data: { object: session } }
        const buf = Buffer.from(JSON.stringify(event))

        // Minimal mock NextRequest object expected by the handler
        const req = {
            arrayBuffer: async () => buf,
            headers: { get: (_: string) => '' },
        } as unknown as Request

        const res = await POST(req as unknown as Request)

        // Assert that Sanity createIfNotExists was called with the expected document
        expect(createIfNotExistsMock).toHaveBeenCalled()
        const createdDoc = createIfNotExistsMock.mock.calls[0][0]

        expect(createdDoc._id).toBe(`stripeOrder_${session.id}`)
        expect(createdDoc._type).toBe('stripeOrder')
        expect(createdDoc.sessionId).toBe(session.id)
        expect(createdDoc.amount_total).toBe(session.amount_total)
        expect(createdDoc.currency).toBe(session.currency)
        expect(createdDoc.payment_status).toBe(session.payment_status)
        expect(createdDoc.customer_email).toBe(session.customer_email)
        expect(createdDoc.metadata).toEqual(session.metadata)
        expect(createdDoc.receivedAt).toBeTruthy()
        expect(createdDoc.rawEvent).toBeTruthy()

        // Also verify the handler returned a positive response shape
        // NextResponse.json returns an object-like response depending on runtime; ensure there was no thrown error
        expect(res).toBeDefined()
    }, 15000)
})
