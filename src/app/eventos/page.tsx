"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  Video,
  ChevronRight,
  Filter,
  Star,
  Ticket,
} from "lucide-react";

type EventType = "all" | "workshop" | "retiro" | "online" | "palestra";

interface Event {
  id: string;
  title: string;
  description: string;
  type: EventType;
  date: string;
  time: string;
  duration: string;
  location: string;
  isOnline: boolean;
  price: number;
  spotsTotal: number;
  spotsLeft: number;
  image: string;
  instructor: string;
  isFeatured?: boolean;
}

const events: Event[] = [
  {
    id: "retiro-despertar",
    title: "Retiro de Despertar Espiritual",
    description:
      "Um fim de semana transformador de imersão total em práticas de meditação, Reiki e conexão com a natureza. Inclui alojamento e refeições.",
    type: "retiro",
    date: "15-17 Fevereiro 2026",
    time: "Sexta 18h - Domingo 16h",
    duration: "3 dias",
    location: "Serra da Arrábida, Setúbal",
    isOnline: false,
    price: 350,
    spotsTotal: 20,
    spotsLeft: 6,
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&h=400&fit=crop",
    instructor: "Rafaella Kally",
    isFeatured: true,
  },
  {
    id: "workshop-reiki-1",
    title: "Workshop Reiki Nível 1 - Iniciação",
    description:
      "Aprenda os fundamentos do Reiki e receba a sua primeira iniciação. Inclui manual e certificado.",
    type: "workshop",
    date: "8 Fevereiro 2026",
    time: "10:00 - 18:00",
    duration: "8 horas",
    location: "Espaço Luz Interior, Lisboa",
    isOnline: false,
    price: 180,
    spotsTotal: 12,
    spotsLeft: 4,
    image:
      "https://images.unsplash.com/photo-1544367567-0d6fcffe7f1f?w=600&h=400&fit=crop",
    instructor: "Rafaella Kally",
  },
  {
    id: "meditacao-lua-cheia",
    title: "Círculo de Meditação da Lua Cheia",
    description:
      "Cerimónia mensal de meditação coletiva sob a energia poderosa da lua cheia. Liberação e renovação.",
    type: "online",
    date: "12 Fevereiro 2026",
    time: "21:00 - 22:30",
    duration: "1h30",
    location: "Online via Zoom",
    isOnline: true,
    price: 15,
    spotsTotal: 50,
    spotsLeft: 23,
    image:
      "https://images.unsplash.com/photo-1532767153582-b1a0e5145009?w=600&h=400&fit=crop",
    instructor: "Rafaella Kally",
  },
  {
    id: "palestra-cristais",
    title: "Palestra: O Poder Curativo dos Cristais",
    description:
      "Descubra como utilizar cristais para cura, proteção e manifestação. Demonstração prática incluída.",
    type: "palestra",
    date: "22 Fevereiro 2026",
    time: "19:00 - 21:00",
    duration: "2 horas",
    location: "Livraria Bertrand, Chiado",
    isOnline: false,
    price: 0,
    spotsTotal: 40,
    spotsLeft: 12,
    image:
      "https://images.unsplash.com/photo-1615486511484-92e172cc4fe0?w=600&h=400&fit=crop",
    instructor: "Rafaella Kally",
  },
  {
    id: "workshop-chakras",
    title: "Workshop Intensivo de Chakras",
    description:
      "Mergulhe no sistema dos chakras. Aprenda a diagnosticar desequilíbrios e técnicas de harmonização.",
    type: "workshop",
    date: "1 Março 2026",
    time: "09:30 - 17:30",
    duration: "7 horas",
    location: "Espaço Luz Interior, Lisboa",
    isOnline: false,
    price: 120,
    spotsTotal: 15,
    spotsLeft: 8,
    image:
      "https://images.unsplash.com/photo-1593811167562-9cef47bfc4d7?w=600&h=400&fit=crop",
    instructor: "Rafaella Kally",
  },
  {
    id: "jornada-online",
    title: "Jornada de Autocura - Programa Online",
    description:
      "4 semanas de transformação com aulas ao vivo, meditações guiadas e acompanhamento personalizado.",
    type: "online",
    date: "Início 10 Março 2026",
    time: "Terças e Quintas 20:00",
    duration: "4 semanas",
    location: "Online via Plataforma Exclusiva",
    isOnline: true,
    price: 197,
    spotsTotal: 30,
    spotsLeft: 18,
    image:
      "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=600&h=400&fit=crop",
    instructor: "Rafaella Kally",
    isFeatured: true,
  },
];

const eventTypes = [
  { id: "all" as EventType, label: "Todos" },
  { id: "workshop" as EventType, label: "Workshops" },
  { id: "retiro" as EventType, label: "Retiros" },
  { id: "online" as EventType, label: "Online" },
  { id: "palestra" as EventType, label: "Palestras" },
];

export default function EventosPage() {
  const [activeType, setActiveType] = useState<EventType>("all");

  const filteredEvents = events.filter(
    (event) => activeType === "all" || event.type === activeType,
  );

  const featuredEvent = events.find((e) => e.isFeatured);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-background to-white">
        <div className="content-container">
          <SectionTitle
            label="Agenda 2026"
            title="Eventos & Workshops"
            subtitle="Experiências transformadoras para aprofundar a sua jornada de crescimento espiritual"
          />

          {/* Featured Event */}
          {featuredEvent && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-8 mb-12 relative rounded-3xl overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0">
                <img
                  src={featuredEvent.image}
                  alt={featuredEvent.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
              </div>

              <div className="relative z-10 p-8 md:p-12 lg:p-16">
                <div className="max-w-2xl">
                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-3 py-1 bg-primary text-white text-sm font-medium rounded-full">
                      ⭐ Evento em Destaque
                    </span>
                    {featuredEvent.isOnline && (
                      <span className="px-3 py-1 bg-blue-500 text-white text-sm font-medium rounded-full flex items-center gap-1">
                        <Video className="w-3 h-3" />
                        Online
                      </span>
                    )}
                  </div>

                  <h2 className="font-serif text-3xl md:text-4xl font-bold text-white mb-4">
                    {featuredEvent.title}
                  </h2>

                  <p className="text-gray-200 text-lg mb-6 line-clamp-2">
                    {featuredEvent.description}
                  </p>

                  <div className="flex flex-wrap gap-4 mb-8 text-white/80">
                    <span className="flex items-center gap-2">
                      <Calendar className="w-5 h-5" />
                      {featuredEvent.date}
                    </span>
                    <span className="flex items-center gap-2">
                      <MapPin className="w-5 h-5" />
                      {featuredEvent.location}
                    </span>
                    <span className="flex items-center gap-2">
                      <Users className="w-5 h-5" />
                      {featuredEvent.spotsLeft} vagas disponíveis
                    </span>
                  </div>

                  <div className="flex items-center gap-4">
                    <Link
                      href={`/eventos/${featuredEvent.id}`}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-all"
                    >
                      Reservar Lugar
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                    <span className="text-2xl font-bold text-white">
                      {featuredEvent.price}€
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8">
            {eventTypes.map((type) => (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  activeType === type.id
                    ? "bg-primary text-white shadow-lg shadow-primary/30"
                    : "bg-white text-gray-600 border border-gray-200 hover:border-primary/30"
                }`}
              >
                {type.label}
              </button>
            ))}
          </div>

          {/* Events Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event, index) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all group"
              >
                {/* Image */}
                <div className="relative h-48">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                  {/* Type Badge */}
                  <div className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-gray-700 capitalize">
                    {event.type}
                  </div>

                  {/* Online Badge */}
                  {event.isOnline && (
                    <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 bg-blue-500 rounded-full text-xs font-medium text-white">
                      <Video className="w-3 h-3" />
                      Online
                    </div>
                  )}

                  {/* Price */}
                  <div className="absolute bottom-3 right-3 px-3 py-1 bg-primary rounded-full text-white font-bold">
                    {event.price === 0 ? "Grátis" : `${event.price}€`}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {event.title}
                  </h3>

                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">
                    {event.description}
                  </p>

                  {/* Meta */}
                  <div className="space-y-2 text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" />
                      {event.date}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      {event.time} ({event.duration})
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-primary" />
                      {event.location}
                    </div>
                  </div>

                  {/* Spots */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-500">Vagas disponíveis</span>
                      <span className="font-medium text-gray-700">
                        {event.spotsLeft}/{event.spotsTotal}
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          event.spotsLeft <= 5 ? "bg-orange-500" : "bg-primary"
                        }`}
                        style={{
                          width: `${
                            ((event.spotsTotal - event.spotsLeft) /
                              event.spotsTotal) *
                            100
                          }%`,
                        }}
                      />
                    </div>
                    {event.spotsLeft <= 5 && (
                      <p className="text-xs text-orange-600 mt-1 font-medium">
                        ⚡ Últimas vagas!
                      </p>
                    )}
                  </div>

                  {/* Action Button */}
                  <Link
                    href={`/eventos/${event.id}`}
                    className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-gray-100 hover:bg-primary hover:text-white text-gray-700 rounded-xl font-medium transition-all"
                  >
                    <Ticket className="w-4 h-4" />
                    Ver Detalhes
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Private Events CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 md:p-12 text-center text-white"
          >
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Eventos Privados & Corporativos
            </h3>
            <p className="text-gray-300 mb-6 max-w-lg mx-auto">
              Organize um workshop exclusivo para a sua empresa ou grupo.
              Programas personalizados de bem-estar e desenvolvimento.
            </p>
            <Link
              href="/contacto"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium transition-all"
            >
              Solicitar Proposta
              <ChevronRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
