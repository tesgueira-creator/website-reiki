"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion } from "framer-motion";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  ArrowLeft,
  Check,
  Star,
  Share2,
  Heart,
  ChevronRight,
} from "lucide-react";

// Em produção, estes dados viriam de uma API/CMS
const eventsData: Record<string, unknown> = {
  "retiro-despertar": {
    title: "Retiro de Despertar Espiritual",
    description: `Um fim de semana transformador de imersão total em práticas de meditação, Reiki e conexão com a natureza.

Este retiro é uma oportunidade única para se desligar do quotidiano e mergulhar numa experiência de profunda transformação interior. Durante três dias, irá:

• Participar em cerimónias de abertura e encerramento sagradas
• Experienciar múltiplas sessões de Reiki em grupo
• Aprender técnicas de meditação que pode praticar em casa
• Conectar-se com a natureza através de caminhadas meditativas
• Partilhar momentos com pessoas em busca do mesmo crescimento

O retiro inclui alojamento em quarto partilhado (opção de individual com suplemento), todas as refeições vegetarianas/veganas preparadas com amor, e todos os materiais necessários.`,
    type: "retiro",
    date: "15-17 Fevereiro 2026",
    time: "Sexta 18h - Domingo 16h",
    duration: "3 dias",
    location: "Serra da Arrábida, Setúbal",
    address: "Quinta da Paz Interior, Estrada Nacional 379, Setúbal",
    isOnline: false,
    price: 350,
    earlyBirdPrice: 299,
    earlyBirdDeadline: "31 Janeiro 2026",
    spotsTotal: 20,
    spotsLeft: 6,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&h=600&fit=crop",
    instructor: "Rafaella Kally",
    instructorBio:
      "Terapeuta holística com mais de 10 anos de experiência em Reiki Kundalini e retiros espirituais.",
    includes: [
      "Alojamento (2 noites)",
      "Todas as refeições (vegetariano/vegan)",
      "4 sessões de Reiki em grupo",
      "6 sessões de meditação guiada",
      "Caminhada meditativa na natureza",
      "Cerimónia de fogo sagrado",
      "Kit de boas-vindas com cristal",
      "Certificado de participação",
    ],
    notIncluded: [
      "Transporte até ao local",
      "Seguro de viagem",
      "Quarto individual (+ 80€)",
    ],
    schedule: [
      {
        day: "Sexta",
        events: [
          "18:00 Check-in",
          "19:30 Jantar",
          "21:00 Cerimónia de abertura",
        ],
      },
      {
        day: "Sábado",
        events: [
          "07:00 Meditação",
          "08:00 Pequeno-almoço",
          "10:00 Sessão Reiki",
          "13:00 Almoço",
          "15:00 Caminhada meditativa",
          "18:00 Workshop Chakras",
          "20:00 Jantar",
          "21:30 Cerimónia de fogo",
        ],
      },
      {
        day: "Domingo",
        events: [
          "07:00 Meditação",
          "08:00 Pequeno-almoço",
          "10:00 Sessão Reiki final",
          "12:00 Partilha e encerramento",
          "13:00 Almoço",
          "16:00 Despedida",
        ],
      },
    ],
    testimonials: [
      {
        name: "Ana M.",
        text: "O retiro mudou a minha vida. Voltei uma pessoa diferente.",
        rating: 5,
      },
      {
        name: "Pedro S.",
        text: "Experiência incrível. A energia do grupo foi transformadora.",
        rating: 5,
      },
    ],
  },
};

export default function EventoDetalhePage() {
  const params = useParams();
  const eventId = params.eventId as string;
  const event = eventsData[eventId];

  const [selectedTicket, setSelectedTicket] = useState<
    "standard" | "earlybird"
  >("earlybird");
  const [quantity, setQuantity] = useState(1);
  const [isSaved, setIsSaved] = useState(false);

  if (!event) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-32 pb-24 bg-background">
          <div className="content-container text-center">
            <h1 className="font-serif text-3xl font-bold text-gray-900 mb-4">
              Evento não encontrado
            </h1>
            <p className="text-gray-600 mb-8">
              O evento que procura não existe ou foi removido.
            </p>
            <Link
              href="/eventos"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Ver Todos os Eventos
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const totalPrice =
    selectedTicket === "earlybird"
      ? event.earlyBirdPrice * quantity
      : event.price * quantity;

  return (
    <>
      <Header />
      <main className="min-h-screen pt-24 pb-24 bg-background">
        {/* Hero Image */}
        <div className="relative h-[40vh] md:h-[50vh]">
          <img
            src={event.image}
            alt={event.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Back Button */}
          <Link
            href="/eventos"
            className="absolute top-8 left-8 inline-flex items-center gap-2 px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          {/* Actions */}
          <div className="absolute top-8 right-8 flex gap-2">
            <button
              onClick={() => setIsSaved(!isSaved)}
              className={`p-3 rounded-full backdrop-blur-sm transition ${
                isSaved
                  ? "bg-red-500 text-white"
                  : "bg-white/90 text-gray-700 hover:bg-white"
              }`}
            >
              <Heart className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} />
            </button>
            <button className="p-3 bg-white/90 backdrop-blur-sm rounded-full text-gray-700 hover:bg-white transition">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="content-container -mt-20 relative z-10">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title Card */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-8 rounded-3xl shadow-xl"
              >
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full capitalize">
                    {event.type}
                  </span>
                  {event.isOnline && (
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-medium rounded-full flex items-center gap-1">
                      <Video className="w-3 h-3" />
                      Online
                    </span>
                  )}
                  {event.spotsLeft <= 5 && (
                    <span className="px-3 py-1 bg-orange-100 text-orange-700 text-sm font-medium rounded-full">
                      ⚡ Últimas {event.spotsLeft} vagas!
                    </span>
                  )}
                </div>

                <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {event.title}
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-5 h-5 text-primary" />
                    {event.date}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-5 h-5 text-primary" />
                    {event.duration}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <MapPin className="w-5 h-5 text-primary" />
                    {event.location}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Users className="w-5 h-5 text-primary" />
                    {event.spotsLeft} vagas
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-white p-8 rounded-3xl shadow-sm"
              >
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-4">
                  Sobre Este Evento
                </h2>
                <div className="prose prose-gray max-w-none">
                  {event.description
                    .split("\n")
                    .map((paragraph: string, index: number) => (
                      <p key={index} className="text-gray-600 mb-4">
                        {paragraph}
                      </p>
                    ))}
                </div>
              </motion.div>

              {/* Schedule */}
              {event.schedule && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="bg-white p-8 rounded-3xl shadow-sm"
                >
                  <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                    Programa
                  </h2>
                  <div className="space-y-6">
                    {event.schedule.map(
                      (
                        day: { day: string; events: string[] },
                        index: number,
                      ) => (
                        <div key={index}>
                          <h3 className="font-semibold text-primary mb-3">
                            {day.day}
                          </h3>
                          <ul className="space-y-2">
                            {day.events.map((e: string, i: number) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-gray-600"
                              >
                                <Check className="w-4 h-4 text-green-500 mt-1 shrink-0" />
                                {e}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ),
                    )}
                  </div>
                </motion.div>
              )}

              {/* What's Included */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-white p-8 rounded-3xl shadow-sm"
              >
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-6">
                  O Que Está Incluído
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {event.includes.map((item: string, index: number) => (
                    <div key={index} className="flex items-start gap-3">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </div>
                  ))}
                </div>

                {event.notIncluded && event.notIncluded.length > 0 && (
                  <>
                    <h3 className="font-semibold text-gray-400 mt-8 mb-4">
                      Não Incluído
                    </h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {event.notIncluded.map((item: string, index: number) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 text-gray-400"
                        >
                          <span className="w-5 text-center">—</span>
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </motion.div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-6 rounded-3xl shadow-xl sticky top-28"
              >
                {/* Price Options */}
                <div className="space-y-3 mb-6">
                  {event.earlyBirdPrice && (
                    <label
                      className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition ${
                        selectedTicket === "earlybird"
                          ? "border-primary bg-primary/5"
                          : "border-gray-100 hover:border-primary/30"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="ticket"
                          checked={selectedTicket === "earlybird"}
                          onChange={() => setSelectedTicket("earlybird")}
                          className="w-4 h-4 text-primary"
                        />
                        <div>
                          <p className="font-medium text-gray-900">
                            Early Bird
                          </p>
                          <p className="text-xs text-gray-500">
                            Até {event.earlyBirdDeadline}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-primary">
                          {event.earlyBirdPrice}€
                        </p>
                        <p className="text-xs text-gray-400 line-through">
                          {event.price}€
                        </p>
                      </div>
                    </label>
                  )}

                  <label
                    className={`flex items-center justify-between p-4 border-2 rounded-xl cursor-pointer transition ${
                      selectedTicket === "standard"
                        ? "border-primary bg-primary/5"
                        : "border-gray-100 hover:border-primary/30"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="ticket"
                        checked={selectedTicket === "standard"}
                        onChange={() => setSelectedTicket("standard")}
                        className="w-4 h-4 text-primary"
                      />
                      <div>
                        <p className="font-medium text-gray-900">Standard</p>
                        <p className="text-xs text-gray-500">Preço normal</p>
                      </div>
                    </div>
                    <p className="font-bold text-gray-900">{event.price}€</p>
                  </label>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between mb-6">
                  <span className="text-gray-700">Quantidade</span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                    >
                      -
                    </button>
                    <span className="font-medium w-8 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() =>
                        setQuantity(Math.min(event.spotsLeft, quantity + 1))
                      }
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Total */}
                <div className="flex items-center justify-between py-4 border-t border-gray-100 mb-6">
                  <span className="text-gray-700">Total</span>
                  <span className="font-bold text-2xl text-gray-900">
                    {totalPrice}€
                  </span>
                </div>

                {/* CTA */}
                <button className="w-full py-4 bg-primary hover:bg-primary-dark text-white rounded-xl font-semibold transition-all flex items-center justify-center gap-2">
                  Reservar Agora
                  <ChevronRight className="w-5 h-5" />
                </button>

                {/* Spots Left */}
                <div className="mt-4 text-center">
                  <p className="text-sm text-gray-500">
                    <span className="font-medium text-orange-600">
                      {event.spotsLeft}
                    </span>{" "}
                    vagas disponíveis
                  </p>
                </div>

                {/* Instructor */}
                <div className="mt-6 pt-6 border-t border-gray-100">
                  <p className="text-xs text-gray-500 mb-2">Facilitado por</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center text-primary font-bold">
                      RK
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">
                        {event.instructor}
                      </p>
                      <p className="text-xs text-gray-500">
                        Terapeuta Holística
                      </p>
                    </div>
                  </div>
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
