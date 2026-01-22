import { Suspense } from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

function SuccessContent() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 section-padding bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="content-container content-grid">
          <div className="col-span-12 md:col-span-8 md:col-start-3 text-center">
            <div className="bg-white p-12 rounded-3xl shadow-2xl border border-green-100">
              {/* Success Icon */}
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-6 rounded-full shadow-xl">
                  <CheckCircle
                    className="w-16 h-16 text-white"
                    strokeWidth={2}
                  />
                </div>
              </div>

              {/* Success Message */}
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Pagamento Confirmado! 🎉
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                Obrigada pela sua confiança! O seu pagamento foi processado com
                sucesso.
              </p>

              <div className="bg-green-50 p-6 rounded-xl mb-8 border border-green-200">
                <h2 className="font-semibold text-lg text-gray-800 mb-3">
                  📧 Próximos Passos:
                </h2>
                <ul className="text-left text-gray-700 space-y-2 max-w-md mx-auto">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Receberá um email de confirmação em breve</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>
                      Entraremos em contacto para agendar a sua sessão
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">✓</span>
                    <span>Respondo a todas as mensagens em até 24 horas</span>
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  href="/"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-dark)] hover:to-[var(--color-primary)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                >
                  Voltar à Página Inicial
                </Link>

                <Link
                  href="/servicos"
                  className="inline-flex items-center justify-center border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  Explorar Mais Serviços
                </Link>
              </div>

              {/* Contact Info */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Alguma dúvida? Entre em contacto:{" "}
                  <a
                    href="mailto:contato@rafaellakally.com"
                    className="text-[var(--color-primary)] hover:underline font-medium"
                  >
                    contato@rafaellakally.com
                  </a>{" "}
                  ou{" "}
                  <a
                    href="tel:+351912345678"
                    className="text-[var(--color-primary)] hover:underline font-medium"
                  >
                    +351 91 234 5678
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default function PagamentoSucessoPage() {
  return (
    <Suspense fallback={<div>Carregando...</div>}>
      <SuccessContent />
    </Suspense>
  );
}
