import { Metadata } from "next";
import { motion } from "framer-motion";
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
  const shareText =
    "Descobri a Rafaella Kally e as suas sessões de Reiki transformadoras! Experimenta também: ";

  const handleShare = (platform: string) => {
    const urls = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
      email: `mailto:?subject=${encodeURIComponent("Experimenta Reiki com a Rafaella Kally")}&body=${encodeURIComponent(shareText + shareUrl)}`,
    };

    window.open(
      urls[platform as keyof typeof urls],
      "_blank",
      "width=600,height=400",
    );
  };

  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary/10 via-primary/5 to-white dark:from-gray-900 dark:to-gray-800 py-20 md:py-32">
        <div className="content-container text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
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
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="content-container">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Como Funciona?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Processo simples em 3 passos
            </p>
          </motion.div>

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
              <motion.div
                key={index}
                className="text-center p-8 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Share Section */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="content-container max-w-2xl">
          <motion.div
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-gray-900 dark:text-white mb-6">
              Começa a Indicar Agora
            </h2>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">
              Escolhe como queres partilhar:
            </p>

            <div className="space-y-4">
              <button
                onClick={() => handleShare("whatsapp")}
                className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 px-6 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <MessageCircle size={24} />
                Partilhar via WhatsApp
              </button>

              <button
                onClick={() => handleShare("facebook")}
                className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#0d65d9] text-white py-4 px-6 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Share2 size={24} />
                Partilhar no Facebook
              </button>

              <button
                onClick={() => handleShare("email")}
                className="w-full flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 text-white py-4 px-6 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
              >
                <Mail size={24} />
                Enviar por Email
              </button>
            </div>

            {/* Copy Link */}
            <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">
                Ou copia o teu link de referência:
              </p>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={shareUrl}
                  readOnly
                  className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(shareUrl);
                    alert("Link copiado!");
                  }}
                  className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
                >
                  Copiar
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16">
        <div className="content-container">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
              Porquê Indicar?
            </h2>
          </motion.div>

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
              <motion.div
                key={index}
                className="flex gap-4 p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
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
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Terms */}
      <section className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="content-container max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20">
        <div className="content-container text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
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
          </motion.div>
        </div>
      </section>
    </main>
  );
}
