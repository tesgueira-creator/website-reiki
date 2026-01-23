"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { Gift, Clock, ArrowRight, Star, Sparkles, Heart } from "lucide-react";

interface GiftCard {
  id: string;
  value: number;
  description: string;
  popular?: boolean;
}

const giftCards: GiftCard[] = [
  {
    id: "gc-50",
    value: 50,
    description: "Ideal para uma sessão de Reiki ou Mesa Radiónica",
  },
  {
    id: "gc-75",
    value: 75,
    description: "Perfeito para Limpeza Energética ou Leitura de Aura",
  },
  {
    id: "gc-100",
    value: 100,
    description: "Para uma experiência completa de Cura Holística",
    popular: true,
  },
  {
    id: "gc-150",
    value: 150,
    description: "Pack de 2-3 sessões à escolha do presenteado",
  },
  { id: "gc-custom", value: 0, description: "Escolha o valor que desejar" },
];

export default function CartaoPresentePage() {
  const [selectedCard, setSelectedCard] = useState<string | null>("gc-100");
  const [customValue, setCustomValue] = useState("");
  const [recipientName, setRecipientName] = useState("");
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [deliveryDate, setDeliveryDate] = useState("");
  const [step, setStep] = useState(1);

  const selectedCardData = giftCards.find((c) => c.id === selectedCard);
  const finalValue =
    selectedCard === "gc-custom"
      ? Number(customValue) || 0
      : selectedCardData?.value || 0;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-rose-50 to-white">
        <div className="content-container max-w-4xl mx-auto">
          {/* Hero */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-rose-100 text-rose-600 px-4 py-2 rounded-full text-sm font-medium mb-4"
            >
              <Gift className="w-4 h-4" />
              Ofereça Bem-Estar
            </motion.div>
            <h1 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Cartões Presente
            </h1>
            <p className="text-text-secondary text-lg max-w-xl mx-auto">
              O presente perfeito para quem ama. Ofereça uma experiência de
              transformação e cura que ficará para sempre no coração.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1fr_380px] gap-8">
            {/* Main Form */}
            <div className="space-y-8">
              {/* Step 1: Choose Value */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
              >
                <h2 className="font-semibold text-xl text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm">
                    1
                  </span>
                  Escolha o Valor
                </h2>

                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  {giftCards
                    .filter((c) => c.id !== "gc-custom")
                    .map((card) => (
                      <button
                        key={card.id}
                        onClick={() => setSelectedCard(card.id)}
                        className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                          selectedCard === card.id
                            ? "border-primary bg-primary/5"
                            : "border-gray-200 hover:border-primary/50"
                        }`}
                      >
                        {card.popular && (
                          <span className="absolute -top-2 -right-2 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-full">
                            POPULAR
                          </span>
                        )}
                        <p className="text-3xl font-bold text-primary mb-1">
                          {card.value}€
                        </p>
                        <p className="text-sm text-gray-500">
                          {card.description}
                        </p>
                      </button>
                    ))}
                </div>

                <div
                  onClick={() => setSelectedCard("gc-custom")}
                  className={`p-5 rounded-2xl border-2 transition-all cursor-pointer ${
                    selectedCard === "gc-custom"
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                  }`}
                >
                  <p className="font-semibold text-gray-900 mb-2">
                    Valor Personalizado
                  </p>
                  <div className="flex items-center gap-2">
                    <input
                      type="number"
                      placeholder="25"
                      min="25"
                      value={customValue}
                      onChange={(e) => setCustomValue(e.target.value)}
                      onFocus={() => setSelectedCard("gc-custom")}
                      className="w-24 px-4 py-2 border-2 border-gray-200 rounded-xl focus:border-primary outline-none text-xl font-bold"
                    />
                    <span className="text-xl font-bold text-gray-400">€</span>
                    <span className="text-sm text-gray-500 ml-2">
                      Mínimo: 25€
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Step 2: Recipient Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100"
              >
                <h2 className="font-semibold text-xl text-gray-900 mb-6 flex items-center gap-2">
                  <span className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm">
                    2
                  </span>
                  Para Quem?
                </h2>

                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome do Destinatário
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary outline-none"
                      placeholder="Nome de quem vai receber"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email do Destinatário
                    </label>
                    <input
                      type="email"
                      value={recipientEmail}
                      onChange={(e) => setRecipientEmail(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary outline-none"
                      placeholder="email@exemplo.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      O Seu Nome
                    </label>
                    <input
                      type="text"
                      value={senderName}
                      onChange={(e) => setSenderName(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary outline-none"
                      placeholder="O seu nome"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Data de Envio
                    </label>
                    <input
                      type="date"
                      value={deliveryDate}
                      onChange={(e) => setDeliveryDate(e.target.value)}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary outline-none"
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Mensagem Pessoal (opcional)
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary outline-none resize-none"
                    rows={4}
                    placeholder="Escreva uma mensagem especial para acompanhar o presente..."
                  />
                </div>
              </motion.div>
            </div>

            {/* Preview & Checkout */}
            <div className="lg:sticky lg:top-32 space-y-6">
              {/* Card Preview */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gradient-to-br from-primary via-primary-dark to-purple-700 p-8 rounded-3xl text-white relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />

                <div className="relative">
                  <div className="flex items-center gap-2 mb-8">
                    <Sparkles className="w-6 h-6" />
                    <span className="font-serif text-xl">Rafaella Kally</span>
                  </div>

                  <p className="text-white/70 text-sm mb-1">Cartão Presente</p>
                  <p className="text-5xl font-bold mb-6">{finalValue}€</p>

                  <div className="space-y-1 text-sm text-white/80">
                    {recipientName && (
                      <p>
                        Para:{" "}
                        <span className="text-white font-medium">
                          {recipientName}
                        </span>
                      </p>
                    )}
                    {senderName && (
                      <p>
                        De:{" "}
                        <span className="text-white font-medium">
                          {senderName}
                        </span>
                      </p>
                    )}
                  </div>

                  {message && (
                    <div className="mt-4 p-3 bg-white/10 rounded-xl">
                      <p className="text-sm italic">&ldquo;{message}&rdquo;</p>
                    </div>
                  )}
                </div>
              </motion.div>

              {/* Checkout */}
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-gray-600">Valor do Cartão</span>
                  <span className="text-xl font-bold text-gray-900">
                    {finalValue}€
                  </span>
                </div>

                <button
                  disabled={
                    finalValue < 25 || !recipientName || !recipientEmail
                  }
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                    finalValue >= 25 && recipientName && recipientEmail
                      ? "bg-primary text-white hover:bg-primary-dark shadow-lg"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  <Gift className="w-5 h-5" />
                  Comprar Cartão Presente
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  🔒 Pagamento seguro • O cartão é enviado por email
                </p>
              </div>

              {/* Benefits */}
              <div className="bg-rose-50 p-6 rounded-2xl">
                <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-500" />
                  Porque oferecer?
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    Válido por 12 meses
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    Utilizável em qualquer terapia
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    Envio imediato ou agendado
                  </li>
                  <li className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500" />
                    Design personalizado
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
