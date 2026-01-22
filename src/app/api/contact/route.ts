import { NextRequest, NextResponse } from "next/server";

// Rate limiting simples em memória (em produção usar Redis/Upstash)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minuto
const MAX_REQUESTS = 5; // 5 requests por minuto

interface ContactFormData {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    honeypot?: string; // Campo oculto anti-spam
}

/**
 * Validação de email com regex robusto
 */
function isValidEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

/**
 * Validação de telefone português
 */
function isValidPhone(phone: string): boolean {
    if (!phone) return true; // Opcional
    const phoneRegex = /^(\+351)?[9][0-9]{8}$/;
    return phoneRegex.test(phone.replace(/\s/g, ""));
}

/**
 * Sanitização básica de strings
 */
function sanitizeString(str: string): string {
    return str
        .trim()
        .replace(/<[^>]*>/g, "") // Remove HTML tags
        .replace(/[<>]/g, "") // Remove < > characters
        .slice(0, 1000); // Limita tamanho
}

/**
 * Rate limiting check
 */
function checkRateLimit(ip: string): { allowed: boolean; retryAfter?: number } {
    const now = Date.now();
    const record = rateLimitMap.get(ip);

    if (!record || now > record.resetTime) {
        rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
        return { allowed: true };
    }

    if (record.count >= MAX_REQUESTS) {
        return {
            allowed: false,
            retryAfter: Math.ceil((record.resetTime - now) / 1000),
        };
    }

    record.count++;
    return { allowed: true };
}

/**
 * POST /api/contact
 * Processa submissões do formulário de contacto
 */
export async function POST(request: NextRequest) {
    try {
        // 1. Rate Limiting
        const ip =
            request.headers.get("x-forwarded-for")?.split(",")[0] ||
            request.headers.get("x-real-ip") ||
            "unknown";

        const rateLimit = checkRateLimit(ip);
        if (!rateLimit.allowed) {
            return NextResponse.json(
                {
                    success: false,
                    error: "Demasiados pedidos. Tente novamente em breve.",
                    retryAfter: rateLimit.retryAfter,
                },
                {
                    status: 429,
                    headers: {
                        "Retry-After": String(rateLimit.retryAfter),
                    },
                }
            );
        }

        // 2. Parse body
        const body: ContactFormData = await request.json();

        // 3. Honeypot check (anti-spam)
        if (body.honeypot) {
            // Bot detectado - retorna success falso silenciosamente
            console.log("[SPAM] Honeypot triggered from IP:", ip);
            return NextResponse.json({
                success: true,
                message: "Mensagem enviada com sucesso!",
            });
        }

        // 4. Sanitização
        const sanitizedData = {
            name: sanitizeString(body.name || ""),
            email: sanitizeString(body.email || ""),
            phone: sanitizeString(body.phone || ""),
            subject: sanitizeString(body.subject || ""),
            message: sanitizeString(body.message || ""),
        };

        // 5. Validação
        const errors: Record<string, string> = {};

        if (!sanitizedData.name || sanitizedData.name.length < 2) {
            errors.name = "Nome é obrigatório (mínimo 2 caracteres)";
        }

        if (!sanitizedData.email) {
            errors.email = "Email é obrigatório";
        } else if (!isValidEmail(sanitizedData.email)) {
            errors.email = "Email inválido";
        }

        if (!sanitizedData.subject) {
            errors.subject = "Selecione um assunto";
        }

        if (!sanitizedData.message || sanitizedData.message.length < 10) {
            errors.message = "Mensagem é obrigatória (mínimo 10 caracteres)";
        }

        if (sanitizedData.phone && !isValidPhone(sanitizedData.phone)) {
            errors.phone = "Telefone inválido (formato: +351 9XX XXX XXX)";
        }

        if (Object.keys(errors).length > 0) {
            return NextResponse.json(
                {
                    success: false,
                    errors,
                },
                { status: 400 }
            );
        }

        // 6. Processar o contacto
        // Em produção: enviar email, guardar em DB, enviar para CRM, etc.

        // Log estruturado (em produção usar serviço de logging)
        console.log("[CONTACT]", {
            timestamp: new Date().toISOString(),
            ip,
            name: sanitizedData.name,
            email: sanitizedData.email,
            subject: sanitizedData.subject,
            messageLength: sanitizedData.message.length,
        });

        // Simular envio de email (em produção usar Resend, SendGrid, etc.)
        // await sendEmail({
        //   to: "contato@rafaellakally.com",
        //   subject: `[Website] ${sanitizedData.subject} - ${sanitizedData.name}`,
        //   html: `...`,
        // });

        // 7. Sucesso
        return NextResponse.json({
            success: true,
            message: "Mensagem enviada com sucesso! Entrarei em contacto em breve.",
        });
    } catch (error) {
        console.error("[CONTACT ERROR]", error);

        return NextResponse.json(
            {
                success: false,
                error: "Erro ao processar o pedido. Tente novamente.",
            },
            { status: 500 }
        );
    }
}

/**
 * OPTIONS - CORS preflight
 */
export async function OPTIONS() {
    return new NextResponse(null, {
        status: 204,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "POST, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type",
        },
    });
}

/**
 * GET - Método não permitido
 */
export async function GET() {
    return NextResponse.json(
        { error: "Method not allowed" },
        { status: 405 }
    );
}
