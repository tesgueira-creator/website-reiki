"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Check,
  Star,
  Sparkles,
  Heart,
  Crown,
  ArrowRight,
  Gift,
  Calendar,
  Users,
  Percent,
  Clock,
} from "lucide-react";

const membershipPlans = [
  {
    id: "essencial",
    name: "Essencial",
    description: "Perfeito para quem está a começar a jornada",
    price: 29,
    period: "mês",
    color: "from-green-500 to-emerald-600",
    features: [
      "1 sessão de Reiki por mês",
      "Acesso à biblioteca de meditações",
      "10% desconto na loja",
      "Newsletter exclusiva",
      "Acesso ao grupo privado Telegram",
    ],
    notIncluded: [
      "Sessões de emergência",
      "Mentoria personalizada",
      "Acesso a workshops",
    ],
  },
  {
    id: "equilibrio",
    name: "Equilíbrio",
    description: "O plano mais popular para transformação contínua",
    price: 79,
    period: "mês",
    color: "from-primary to-primary-dark",
    popular: true,
    features: [
      "2 sessões de Reiki por mês",
      "1 consulta energética/mês",
      "Acesso total à biblioteca premium",
      "20% desconto na loja",
      "Acesso prioritário a eventos",
      "Suporte por WhatsApp",
      "1 sessão de emergência/trimestre",
    ],
    notIncluded: ["Mentoria 1:1 semanal"],
  },
  {
    id: "transformacao",
    name: "Transformação",
    description: "Acompanhamento completo e personalizado",
    price: 149,
    period: "mês",
    color: "from-purple-600 to-violet-700",
    features: [
      "4 sessões de terapia por mês",
      "Mentoria 1:1 quinzenal",
      "Acesso ilimitado à biblioteca",
      "30% desconto na loja",
      "Entrada gratuita em workshops",
      "Suporte prioritário 24/7",
      "Sessões de emergência ilimitadas",
      "Programa personalizado de evolução",
    ],
    notIncluded: [],
  },
];

const benefits = [
  {
    icon: Percent,
    title: "Poupança Garantida",
    description: "Economize até 40% comparado com sessões avulsas",
  },
  {
    icon: Calendar,
    title: "Agendamento Prioritário",
    description: "Reserve os melhores horários antes de todos",
  },
  {
    icon: Gift,
    title: "Surpresas Mensais",
    description: "Receba brindes exclusivos e recursos especiais",
  },
  {
    icon: Users,
    title: "Comunidade Exclusiva",
    description: "Faça parte de um grupo de apoio e crescimento",
  },
];

const faqs = [
  {
    question: "Posso cancelar a qualquer momento?",
    answer:
      "Sim! Não há fidelização. Pode cancelar ou pausar a sua subscrição quando quiser, sem custos adicionais.",
  },
  {
    question: "As sessões não utilizadas acumulam?",
    answer:
      "Sim, até 2 sessões podem transitar para o mês seguinte. Incentivamos a regularidade, mas entendemos que a vida acontece.",
  },
  {
    question: "Posso mudar de plano?",
    answer:
      "Absolutamente! Pode fazer upgrade ou downgrade a qualquer momento. A diferença é ajustada no próximo ciclo de faturação.",
  },
  {
    question: "As sessões podem ser online?",
    answer:
      "Sim! Todas as sessões incluídas nos planos podem ser realizadas presencialmente ou online, à sua escolha.",
  },
];

export default function MembrosPage() {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "annual">(
    "monthly",
  );
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const getPrice = (monthlyPrice: number) => {
    if (billingCycle === "annual") {
      return Math.round(monthlyPrice * 0.8); // 20% desconto anual
    }
    return monthlyPrice;
  };

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-background to-white">
        <div className="content-container">
          <SectionTitle
            label="Programa de Membros"
            title="Investir em Si é o Melhor Investimento"
            subtitle="Planos de acompanhamento contínuo para uma transformação duradoura"
          />

          {/* Billing Toggle */}
          <div className="flex items-center justify-center gap-4 mt-8 mb-12">
            <span
              className={`text-sm font-medium ${
                billingCycle === "monthly" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Mensal
            </span>
            <button
              onClick={() =>
                setBillingCycle(
                  billingCycle === "monthly" ? "annual" : "monthly",
                )
              }
              className={`relative w-14 h-8 rounded-full transition-colors ${
                billingCycle === "annual" ? "bg-primary" : "bg-gray-300"
              }`}
            >
              <div
                className={`absolute top-1 w-6 h-6 bg-white rounded-full shadow-md transition-transform ${
                  billingCycle === "annual" ? "translate-x-7" : "translate-x-1"
                }`}
              />
            </button>
            <span
              className={`text-sm font-medium flex items-center gap-2 ${
                billingCycle === "annual" ? "text-gray-900" : "text-gray-500"
              }`}
            >
              Anual
              <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                -20%
              </span>
            </span>
          </div>

          {/* Plans Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
            {membershipPlans.map((plan, index) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`relative bg-white rounded-3xl overflow-hidden shadow-lg border-2 ${
                  plan.popular
                    ? "border-primary shadow-2xl shadow-primary/20 scale-105 z-10"
                    : "border-gray-100"
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-primary to-primary-dark text-white text-center py-2 text-sm font-medium flex items-center justify-center gap-2">
                    <Star className="w-4 h-4" />
                    Mais Popular
                  </div>
                )}

                <div className={`p-8 ${plan.popular ? "pt-14" : ""}`}>
                  {/* Header */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center mb-4`}
                  >
                    {plan.id === "essencial" && (
                      <Heart className="w-7 h-7 text-white" />
                    )}
                    {plan.id === "equilibrio" && (
                      <Sparkles className="w-7 h-7 text-white" />
                    )}
                    {plan.id === "transformacao" && (
                      <Crown className="w-7 h-7 text-white" />
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-6">
                    {plan.description}
                  </p>

                  {/* Price */}
                  <div className="mb-6">
                    <span className="text-4xl font-bold text-gray-900">
                      {getPrice(plan.price)}€
                    </span>
                    <span className="text-gray-500">/{plan.period}</span>
                    {billingCycle === "annual" && (
                      <p className="text-sm text-green-600 mt-1">
                        Poupa {plan.price * 12 * 0.2}€/ano
                      </p>
                    )}
                  </div>

                  {/* CTA */}
                  <Link
                    href="/contacto"
                    className={`w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all ${
                      plan.popular
                        ? "bg-primary hover:bg-primary-dark text-white"
                        : "bg-gray-100 hover:bg-gray-200 text-gray-900"
                    }`}
                  >
                    Começar Agora
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {/* Features */}
                  <div className="mt-8 pt-6 border-t border-gray-100">
                    <p className="text-sm font-semibold text-gray-900 mb-4">
                      Inclui:
                    </p>
                    <ul className="space-y-3">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-600">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {plan.notIncluded.length > 0 && (
                      <>
                        <p className="text-sm font-semibold text-gray-400 mt-6 mb-3">
                          Não inclui:
                        </p>
                        <ul className="space-y-2">
                          {plan.notIncluded.map((feature, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-3 text-gray-400"
                            >
                              <span className="w-5 h-5 flex items-center justify-center shrink-0">
                                —
                              </span>
                              <span className="text-sm">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Benefits */}
          <div className="mb-20">
            <h2 className="font-serif text-2xl font-bold text-gray-900 text-center mb-12">
              Vantagens de Ser Membro
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white p-6 rounded-2xl border border-gray-100 text-center hover:shadow-lg transition-all"
                >
                  <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <benefit.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-sm text-gray-600">{benefit.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* FAQs */}
          <div className="max-w-3xl mx-auto mb-16">
            <h2 className="font-serif text-2xl font-bold text-gray-900 text-center mb-8">
              Perguntas Frequentes
            </h2>

            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="bg-white rounded-xl border border-gray-100 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    className="w-full flex items-center justify-between p-5 text-left"
                  >
                    <span className="font-medium text-gray-900">
                      {faq.question}
                    </span>
                    <span
                      className={`transform transition-transform ${
                        openFaq === index ? "rotate-180" : ""
                      }`}
                    >
                      ▼
                    </span>
                  </button>
                  {openFaq === index && (
                    <div className="px-5 pb-5 text-gray-600">{faq.answer}</div>
                  )}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-3xl p-8 md:p-12 text-center border border-green-100"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <h3 className="font-serif text-2xl font-bold text-gray-900 mb-4">
              Garantia de 30 Dias
            </h3>
            <p className="text-gray-600 max-w-lg mx-auto mb-6">
              Experimente qualquer plano durante 30 dias. Se não estiver
              completamente satisfeito, devolvemos 100% do valor investido, sem
              perguntas.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl font-medium transition-all"
            >
              Começar Sem Risco
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
