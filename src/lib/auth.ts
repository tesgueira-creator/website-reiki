import NextAuth, { type NextAuthOptions } from 'next-auth'
import GoogleProvider from 'next-auth/providers/google'
import EmailProvider from 'next-auth/providers/email'
import { Resend } from 'resend'

const resendApiKey = process.env.RESEND_API_KEY
const resendFrom = process.env.RESEND_FROM || 'Reiki <login@reiki.com>'

const emailProvider = EmailProvider({
    from: resendFrom,
    maxAge: 60 * 60, // 1 hour link validity
    async sendVerificationRequest(params) {
        const { identifier, url } = params
        if (!resendApiKey) {
            throw new Error('RESEND_API_KEY em falta para login por email')
        }

        const resend = new Resend(resendApiKey)
        await resend.emails.send({
            from: resendFrom,
            to: identifier,
            subject: 'Confirme o seu login',
            text: `Use o link para entrar: ${url}`,
        })
    },
})

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET,
    session: { strategy: 'jwt' },
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || '',
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
        }),
        emailProvider,
    ],
    callbacks: {
        async session({ session, token }) {
            if (token?.email) {
                session.user = session.user || {}
                session.user.email = token.email as string
            }
            return session
        },
        async jwt({ token, user }) {
            if (user?.email) {
                token.email = user.email
            }
            return token
        },
    },
}

// Export handler factory for route usage
export const { handlers, auth } = NextAuth(authOptions)