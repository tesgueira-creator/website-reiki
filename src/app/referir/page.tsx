import { Metadata } from "next";

import Link from "next/link";
import { Gift, Users, Heart, Share2, Mail, MessageCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Programa de Referência | Indica um Amigo e Recebe Desconto",
  description:
    "Indica um amigo para Reiki e terapias holísticas e recebe €15 de desconto na tua próxima sessão. Partilha o bem-estar com quem amas.",
  keywords: [
    "programa de referência reiki",
    "indicar amigo desconto",
    "partilhar reiki",
    "desconto sessão reiki",
  ],
};

export default function ReferralPage() {
  const shareUrl = "https://rafaellakally.pt/referir";

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-white dark:from-gray-900 dark:to-gray-800 py-20 md:py-32">
        <div className="content-container text-center">
          <div>
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Gift className="text-primary" size={40} />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              Partilha o Bem-Estar
            </h1>
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
              Indica um amigo e recebem ambos{" "}
              <strong className="text-primary">€15 de desconto</strong> na
              próxima sessão
            </p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="content-container">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Como Funciona?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Processo simples em 3 passos
            </p>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {[
              {
                step: "1",
                icon: <Share2 size={32} />,
                title: "Partilha o Teu Link",
                description:
                  "Envia o teu link de referência por WhatsApp, email ou redes sociais para amigos e família que possam beneficiar de Reiki.",
              },
              {
                step: "2",
                icon: <Users size={32} />,
                title: "O Teu Amigo Agenda",
                description:
                  "Quando o teu amigo agendar e completar a primeira sessão usando o teu link, ambos ficam elegíveis para o desconto.",
              },
              {
                step: "3",
                icon: <Gift size={32} />,
                title: "(EXEMPLO) Recebem Ambos €15",
                description:
                  "Tu recebes €15 de crédito para a tua próxima sessão e o teu amigo recebe €15 de desconto na segunda sessão dele! (EXEMPLO)",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 relative">
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {item.step}
                  </div>
                  <div className="text-primary">{item.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="content-container max-w-2xl">
          <ReferralShare shareUrl={shareUrl} />
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="content-container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Porquê Indicar?
            </h2>
            </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {[
              {
                icon: <Heart size={24} />,
                title: "Partilha Bem-Estar",
                description:
                  "Ajuda alguém que amas a descobrir os benefícios transformadores do Reiki e terapias holísticas.",
              },
              {
                icon: <Gift size={24} />,
                title: "Poupa Dinheiro",
                description:
                  "Recebe €15 de desconto por cada indicação bem-sucedida. Sem limite de indicações!",
              },
              {
                icon: <Users size={24} />,
                title: "Constrói Comunidade",
                description:
                  "Faz parte de uma comunidade de pessoas comprometidas com o crescimento pessoal e bem-estar.",
              },
              {
                icon: <MessageCircle size={24} />,
                title: "Simples e Rápido",
                description:
                  "Partilha em segundos através de WhatsApp, email ou redes sociais. Sem complicações.",
              },
            ].map((benefit, index) => (
              <div
                key={index}
                className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
              >
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary flex-shrink-0">
                  {benefit.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {benefit.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="content-container max-w-3xl">
          <div>
            <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white mb-6 text-center">
              Termos e Condições
            </h3>
            <div className="bg-white dark:bg-gray-800 rounded-lg p-8 shadow-md">
              <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    O desconto de €15 é aplicável apenas após o teu amigo
                    completar a primeira sessão.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    O crédito é válido por 12 meses a partir da data de emissão.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Não há limite de indicações. Indica quantas pessoas
                    quiseres!
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    Os descontos não são cumuláveis com outras promoções.
                  </span>
                </li>
                <li className="flex gap-2">
                  <span className="text-primary">•</span>
                  <span>
                    O amigo indicado também recebe €15 de desconto na sua
                    segunda sessão.
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="content-container text-center">
          <div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-6">
              Tens Questões?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8 max-w-2xl mx-auto">
              Estamos aqui para ajudar! Entra em contacto connosco para qualquer
              dúvida sobre o programa de referência.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold text-lg transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5"
            >
              Contactar-nos
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
