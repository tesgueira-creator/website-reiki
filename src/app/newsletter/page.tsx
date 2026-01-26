"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Mail,
  Gift,
  Sparkles,
  Check,
  ArrowRight,
  Heart,
  BookOpen,
  Calendar,
} from "lucide-react";

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const interestOptions = [
    { id: "reiki", label: "Reiki & Energia" },
    { id: "meditacao", label: "Meditação" },
    { id: "cristais", label: "Cristais" },
    { id: "desenvolvimento", label: "Desenvolvimento Pessoal" },
    { id: "eventos", label: "Eventos & Workshops" },
    { id: "ofertas", label: "Ofertas Especiais" },
  ];

  const handleInterestToggle = (id: string) => {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-background to-white flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-md mx-auto text-center p-8"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="font-serif text-3xl font-bold text-gray-900 mb-4">
              Bem-vindo à Comunidade! 🎉
            </h1>
            <p className="text-gray-600 mb-6">
              A sua subscrição foi confirmada. Verifique o seu email para
              receber o seu presente de boas-vindas.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-all"
            >
              Voltar à Página Inicial
              <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-background to-white">
        <div className="content-container">
          <div className="max-w-4xl mx-auto">
            {/* Hero */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary text-sm font-medium mb-6">
                <Sparkles className="w-4 h-4" />
                Newsletter Exclusiva
              </div>
              <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Junte-se à Nossa Comunidade
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center">
                Receba meditações guiadas, dicas de bem-estar e ofertas
                exclusivas diretamente no seu email.
              </p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-12 items-start">
              {/* Benefits */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                  O que vai receber:
                </h2>

                <div className="space-y-4">
                  {[
                    {
                      icon: Gift,
                      title: "Presente de Boas-vindas",
                      description:
                        "Meditação guiada exclusiva + Guia de Iniciação ao Reiki (PDF)",
                    },
                    {
                      icon: Mail,
                      title: "Newsletter Semanal",
                      description:
                        "Dicas práticas de bem-estar, reflexões e inspiração",
                    },
                    {
                      icon: Calendar,
                      title: "Acesso Prioritário",
                      description:
                        "Seja o primeiro a saber sobre eventos e workshops",
                    },
                    {
                      icon: Heart,
                      title: "Descontos Exclusivos",
                      description:
                        "Ofertas especiais reservadas para subscritores",
                    },
                  ].map((benefit, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center shrink-0">
                        <benefit.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">
                          {benefit.title}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Testimonial */}
                <div className="mt-8 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                  <p className="text-gray-700 italic mb-4">
                    &quot;As meditações que recebo por email tornaram-se parte
                    essencial da minha rotina matinal. Obrigada, Rafaella!&quot;
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                      A
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Ana Rodrigues</p>
                      <p className="text-sm text-gray-500">
                        Subscritora desde 2024
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Form */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <form
                  onSubmit={handleSubmit}
                  className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100"
                >
                  <h2 className="font-serif text-xl font-bold text-gray-900 mb-6">
                    Subscreva Agora
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nome
                      </label>
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="O seu primeiro nome"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="seu@email.com"
                        required
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary transition"
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Interesses (opcional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {interestOptions.map((option) => (
                        <button
                          key={option.id}
                          type="button"
                          onClick={() => handleInterestToggle(option.id)}
                          className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                            interests.includes(option.id)
                              ? "bg-primary text-white"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          {option.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting || !email}
                    className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        A processar...
                      </>
                    ) : (
                      <>
                        <Mail className="w-5 h-5" />
                        Quero Receber!
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-500 text-center mt-4">
                    Ao subscrever, concorda com a nossa{" "}
                    <a
                      href="/politica-privacidade"
                      className="text-primary hover:underline"
                    >
                      Política de Privacidade
                    </a>
                    . Pode cancelar a qualquer momento.
                  </p>
                </form>

                {/* Stats */}
                <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                  {[
                    { value: "2.5K+", label: "Subscritores" },
                    { value: "98%", label: "Satisfação" },
                    { value: "0", label: "Spam" },
                  ].map((stat, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded-xl">
                      <p className="font-bold text-primary text-lg">
                        {stat.value}
                      </p>
                      <p className="text-xs text-gray-500">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
