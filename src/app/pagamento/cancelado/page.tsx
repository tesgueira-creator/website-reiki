import Link from "next/link";
import { XCircle } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function PagamentoCanceladoPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-20 section-padding bg-gradient-to-br from-orange-50 to-red-50">
        <div className="content-container content-grid">
          <div className="col-span-12 md:col-span-8 md:col-start-3 text-center">
            <div className="bg-white p-12 rounded-3xl shadow-2xl border border-orange-100">
              {/* Cancel Icon */}
              <div className="flex justify-center mb-8">
                <div className="bg-gradient-to-br from-orange-500 to-red-600 p-6 rounded-full shadow-xl">
                  <XCircle className="w-16 h-16 text-white" strokeWidth={2} />
                </div>
              </div>

              {/* Cancel Message */}
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Pagamento Cancelado
              </h1>

              <p className="text-xl text-gray-700 mb-8 leading-relaxed">
                O seu pagamento foi cancelado. Não se preocupe, nenhuma cobrança
                foi efetuada.
              </p>

              <div className="bg-orange-50 p-6 rounded-xl mb-8 border border-orange-200">
                <h2 className="font-semibold text-lg text-gray-800 mb-3">
                  💭 O que aconteceu?
                </h2>
                <p className="text-gray-700">
                  O processo de pagamento foi interrompido. Isto pode ter
                  acontecido por:
                </p>
                <ul className="text-left text-gray-700 space-y-2 max-w-md mx-auto mt-4">
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Cancelamento manual durante o checkout</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Problema com o método de pagamento</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-orange-600 font-bold">•</span>
                    <span>Timeout na sessão de pagamento</span>
                  </li>
                </ul>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
                <Link
                  href="/servicos"
                  className="inline-flex items-center justify-center bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-dark)] hover:to-[var(--color-primary)] text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 shadow-lg hover:shadow-2xl hover:-translate-y-1"
                >
                  Tentar Novamente
                </Link>

                <Link
                  href="/contacto"
                  className="inline-flex items-center justify-center border-2 border-gray-300 bg-white hover:bg-gray-50 text-gray-700 hover:text-gray-900 px-8 py-4 rounded-xl font-semibold transition-all duration-300"
                >
                  Contactar-nos
                </Link>
              </div>

              {/* Help Section */}
              <div className="mt-12 pt-8 border-t border-gray-200">
                <p className="text-sm text-gray-600 mb-4">
                  💡 <strong>Precisa de ajuda?</strong>
                </p>
                <p className="text-sm text-gray-600">
                  Estamos aqui para ajudar! Entre em contacto connosco:{" "}
                  <a
                    href="mailto:contato@rafaellakally.com"
                    className="text-[var(--color-primary)] hover:underline font-medium"
                  >
                    contato@rafaellakally.com
                  </a>{" "}
                  ou pelo WhatsApp:{" "}
                  <a
                    href="https://wa.me/351912345678"
                    target="_blank"
                    rel="noopener noreferrer"
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
