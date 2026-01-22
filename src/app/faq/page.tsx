"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, MessageCircle } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  // Sobre as Terapias
  {
    category: "Sobre as Terapias",
    question: "O que é Reiki Kundalini e como funciona?",
    answer:
      "O Reiki Kundalini é uma técnica de cura energética que trabalha com a energia vital (Kundalini) que reside na base da coluna. Durante a sessão, atuo como canal para direcionar energia de cura através das mãos, reequilibrando os seus chakras e removendo bloqueios energéticos. É uma experiência profundamente relaxante que pode trazer benefícios físicos, emocionais e espirituais.",
  },
  {
    category: "Sobre as Terapias",
    question: "O que é a Mesa Radiónica?",
    answer:
      "A Mesa Radiónica é uma ferramenta de diagnóstico energético que permite identificar com precisão bloqueios, desequilíbrios e influências energéticas negativas no seu campo áurico. Através de pêndulos e gráficos específicos, consigo medir o estado dos seus chakras, detectar presença de energias externas e realizar limpezas profundas. No final, recebe um relatório completo do seu estado energético.",
  },
  {
    category: "Sobre as Terapias",
    question: "Qual a diferença entre Terapia Multidimensional e Reiki?",
    answer:
      "Enquanto o Reiki trabalha principalmente com a energia vital e os chakras, a Terapia Multidimensional (também chamada de 'Cirurgia Espiritual') é uma técnica mais profunda que atua em múltiplas dimensões do ser. É especialmente indicada para traumas emocionais profundos, lutos, divórcios e padrões kármicos. Durante a sessão, a Equipa Espiritual atua através de meditação guiada.",
  },
  {
    category: "Sobre as Terapias",
    question: "As terapias holísticas substituem tratamento médico?",
    answer:
      "Não. As terapias holísticas são complementares e não substituem diagnósticos médicos, medicação prescrita ou tratamento psicológico/psiquiátrico. O meu trabalho foca no bem-estar energético e emocional, atuando em paralelo com a medicina convencional para uma abordagem integral da saúde.",
  },
  // Sobre as Sessões
  {
    category: "Sobre as Sessões",
    question: "Como funcionam as sessões online?",
    answer:
      "As sessões online são tão eficazes quanto as presenciais, pois a energia não conhece distância física. Utilizamos videochamada (Zoom ou Google Meet) para manter a conexão visual. Você deverá estar num local calmo, confortável e onde não seja interrompido. Recomendo deitar-se durante a parte prática da sessão.",
  },
  {
    category: "Sobre as Sessões",
    question: "Quanto tempo dura uma sessão?",
    answer:
      "A duração varia conforme o tipo de terapia: Reiki Kundalini dura cerca de 60 minutos, Mesa Radiónica 60 minutos, Terapia Multidimensional 50 minutos, e Leitura de Aura 45 minutos. A primeira sessão pode demorar um pouco mais devido à anamnese inicial.",
  },
  {
    category: "Sobre as Sessões",
    question: "O que devo fazer para me preparar para uma sessão?",
    answer:
      "Recomendo: usar roupa confortável, evitar refeições pesadas antes da sessão, beber bastante água, estar num ambiente tranquilo, e manter a mente aberta. Não use perfumes fortes. Após a sessão, descanse e hidrate-se bem para ajudar o corpo a processar as mudanças energéticas.",
  },
  {
    category: "Sobre as Sessões",
    question: "Quantas sessões preciso fazer?",
    answer:
      "Depende do seu objetivo e situação. Algumas pessoas sentem transformações significativas numa única sessão, enquanto outras beneficiam de um acompanhamento contínuo. Geralmente, recomendo um mínimo de 3 sessões espaçadas de 1-2 semanas para resultados mais profundos e duradouros. Na primeira consulta, faço uma avaliação e sugiro um plano personalizado.",
  },
  // Pagamentos e Agendamento
  {
    category: "Pagamentos e Agendamento",
    question: "Quais são os métodos de pagamento aceites?",
    answer:
      "Aceito pagamento por cartão de crédito/débito (via Stripe), transferência bancária (MB Way ou IBAN), e pagamento em numerário para sessões presenciais. O pagamento é feito no momento da reserva para garantir a sua vaga.",
  },
  {
    category: "Pagamentos e Agendamento",
    question: "Qual é a política de cancelamento?",
    answer:
      "Cancelamentos com mais de 24 horas de antecedência: reembolso total ou reagendamento sem custos. Cancelamentos com menos de 24 horas: sem reembolso, mas pode reagendar pagando 50% do valor. Faltas sem aviso: sem reembolso. Em caso de emergência, contacte-me o mais rápido possível para encontrarmos uma solução.",
  },
  {
    category: "Pagamentos e Agendamento",
    question: "Como posso agendar uma sessão?",
    answer:
      "Pode agendar através da página de Serviços (escolhendo a terapia desejada), pela página de Contacto (formulário ou WhatsApp), ou fazendo primeiro o Questionário Holístico para receber uma recomendação personalizada. Após o agendamento, receberá um email de confirmação com todos os detalhes.",
  },
  // Resultados e Expectativas
  {
    category: "Resultados e Expectativas",
    question: "O que posso sentir durante e após uma sessão?",
    answer:
      "Durante: relaxamento profundo, calor ou formigueiro nas mãos/pés, visões de cores ou imagens, emoções a virem à superfície. Após: sensação de leveza e paz, maior clareza mental, sono mais profundo, e ocasionalmente sintomas de 'desintoxicação energética' (cansaço temporário, emoções intensas). Beba muita água e descanse nas primeiras 24 horas.",
  },
  {
    category: "Resultados e Expectativas",
    question: "Os resultados são garantidos?",
    answer:
      "Cada pessoa é única e os resultados variam. O que posso garantir é o meu compromisso total, formação profissional e experiência de mais de 10 anos. A maioria dos meus clientes reporta melhorias significativas, como evidenciado nos depoimentos. A sua abertura e intenção também influenciam os resultados.",
  },
  {
    category: "Resultados e Expectativas",
    question: "Sou cético. As terapias funcionam mesmo assim?",
    answer:
      "Sim, não é necessário 'acreditar' para que a energia atue. Muitos dos meus clientes mais satisfeitos chegaram céticos. O mais importante é estar aberto à experiência. A energia trabalha independentemente das crenças conscientes, embora uma mente aberta possa potenciar os resultados.",
  },
];

const categories = [...new Set(faqs.map((f) => f.category))];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | "all">("all");

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const groupedFaqs = categories.reduce(
    (acc, category) => {
      acc[category] = filteredFaqs.filter((f) => f.category === category);
      return acc;
    },
    {} as Record<string, FAQItem[]>,
  );

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="content-container">
          <SectionTitle
            label="Perguntas Frequentes"
            title="Dúvidas? Temos Respostas"
            subtitle="Encontre respostas para as perguntas mais comuns sobre as nossas terapias e serviços"
          />

          {/* Search & Filter */}
          <div className="max-w-2xl mx-auto mt-12 mb-10">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Pesquisar pergunta..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
              />
            </div>

            <div className="flex flex-wrap gap-2 mt-4 justify-center">
              <button
                onClick={() => setActiveCategory("all")}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === "all"
                    ? "bg-primary text-white"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-primary"
                }`}
              >
                Todas
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    activeCategory === cat
                      ? "bg-primary text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:border-primary"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* FAQ List */}
          <div className="max-w-3xl mx-auto space-y-8">
            {activeCategory === "all" ? (
              Object.entries(groupedFaqs).map(
                ([category, items]) =>
                  items.length > 0 && (
                    <div key={category}>
                      <h3 className="font-serif text-xl font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <span className="w-2 h-2 bg-primary rounded-full" />
                        {category}
                      </h3>
                      <div className="space-y-3">
                        {items.map((faq, index) => {
                          const globalIndex = faqs.indexOf(faq);
                          return (
                            <FAQAccordion
                              key={globalIndex}
                              faq={faq}
                              isOpen={openIndex === globalIndex}
                              onClick={() =>
                                setOpenIndex(
                                  openIndex === globalIndex
                                    ? null
                                    : globalIndex,
                                )
                              }
                            />
                          );
                        })}
                      </div>
                    </div>
                  ),
              )
            ) : (
              <div className="space-y-3">
                {filteredFaqs.map((faq, index) => {
                  const globalIndex = faqs.indexOf(faq);
                  return (
                    <FAQAccordion
                      key={globalIndex}
                      faq={faq}
                      isOpen={openIndex === globalIndex}
                      onClick={() =>
                        setOpenIndex(
                          openIndex === globalIndex ? null : globalIndex,
                        )
                      }
                    />
                  );
                })}
              </div>
            )}

            {filteredFaqs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 mb-4">
                  Nenhuma pergunta encontrada para "{searchQuery}"
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-primary hover:underline"
                >
                  Limpar pesquisa
                </button>
              </div>
            )}
          </div>

          {/* Still have questions CTA */}
          <div className="mt-16 text-center bg-gradient-to-r from-primary/10 to-secondary/10 p-10 rounded-3xl max-w-3xl mx-auto">
            <MessageCircle className="w-12 h-12 text-primary mx-auto mb-4" />
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-3">
              Ainda tem dúvidas?
            </h3>
            <p className="text-gray-600 mb-6">
              Estou aqui para ajudar! Entre em contacto e terei todo o gosto em
              esclarecer as suas questões.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all shadow-lg"
              >
                Enviar Mensagem
              </Link>
              <a
                href="https://wa.me/351912345678"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center border-2 border-primary bg-white text-primary px-8 py-4 rounded-xl font-semibold hover:bg-primary hover:text-white transition-all"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

function FAQAccordion({
  faq,
  isOpen,
  onClick,
}: {
  faq: FAQItem;
  isOpen: boolean;
  onClick: () => void;
}) {
  return (
    <motion.div
      className={`bg-white rounded-xl border-2 overflow-hidden transition-all ${
        isOpen
          ? "border-primary shadow-lg"
          : "border-gray-100 hover:border-primary/30"
      }`}
    >
      <button
        onClick={onClick}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span
          className={`font-medium pr-4 ${isOpen ? "text-primary" : "text-gray-800"}`}
        >
          {faq.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown
            className={`w-5 h-5 flex-shrink-0 ${isOpen ? "text-primary" : "text-gray-400"}`}
          />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="px-5 pb-5 text-gray-600 leading-relaxed border-t border-gray-100 pt-4">
              {faq.answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
