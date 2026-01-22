"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Calendar,
  Clock,
  Check,
  ArrowRight,
  ChevronDown,
  User,
  Mail,
  Phone,
} from "lucide-react";

type TherapyType =
  | "reiki-kundalini"
  | "mesa-radionica"
  | "terapia-multidimensional"
  | "leitura-aura"
  | "meditacao-guiada"
  | "limpeza-energetica";
type TimeSlot = { time: string; available: boolean };

const therapies: {
  id: TherapyType;
  name: string;
  duration: string;
  price: number;
}[] = [
  {
    id: "reiki-kundalini",
    name: "Reiki Kundalini",
    duration: "60 min",
    price: 55,
  },
  {
    id: "mesa-radionica",
    name: "Mesa Radiónica",
    duration: "60 min",
    price: 50,
  },
  {
    id: "terapia-multidimensional",
    name: "Terapia Multidimensional",
    duration: "50 min",
    price: 50,
  },
  {
    id: "leitura-aura",
    name: "Leitura de Aura",
    duration: "45 min",
    price: 60,
  },
  {
    id: "meditacao-guiada",
    name: "Meditação Guiada",
    duration: "50 min",
    price: 50,
  },
  {
    id: "limpeza-energetica",
    name: "Limpeza Energética",
    duration: "60 min",
    price: 75,
  },
];

// Simular disponibilidade (em produção viria de uma API)
const generateTimeSlots = (): TimeSlot[] => [
  { time: "09:00", available: true },
  { time: "10:00", available: true },
  { time: "11:00", available: false },
  { time: "14:00", available: true },
  { time: "15:00", available: true },
  { time: "16:00", available: false },
  { time: "17:00", available: true },
];

export default function AgendarPage() {
  const [step, setStep] = useState(1);
  const [selectedTherapy, setSelectedTherapy] = useState<TherapyType | null>(
    null,
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [sessionType, setSessionType] = useState<"presencial" | "online">(
    "presencial",
  );
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  const selectedTherapyData = therapies.find((t) => t.id === selectedTherapy);

  // Gerar próximos 14 dias
  const availableDates = Array.from({ length: 14 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i + 1);
    return {
      date: date.toISOString().split("T")[0],
      dayName: date.toLocaleDateString("pt-PT", { weekday: "short" }),
      dayNum: date.getDate(),
      month: date.toLocaleDateString("pt-PT", { month: "short" }),
      isWeekend: date.getDay() === 0 || date.getDay() === 6,
    };
  }).filter((d) => !d.isWeekend); // Excluir fins de semana

  const timeSlots = generateTimeSlots();

  const handleSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <>
        <Header />
        <main className="min-h-screen pt-32 pb-24 bg-gradient-to-br from-green-50 to-emerald-50">
          <div className="content-container max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-24 h-24 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-8"
            >
              <Check className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">
              Agendamento Confirmado! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              A sua sessão foi agendada com sucesso.
            </p>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 mb-8 text-left">
              <h2 className="font-semibold text-lg text-gray-900 mb-4">
                Detalhes da Sessão:
              </h2>
              <div className="space-y-3 text-gray-600">
                <p>
                  <strong>Terapia:</strong> {selectedTherapyData?.name}
                </p>
                <p>
                  <strong>Data:</strong> {selectedDate}
                </p>
                <p>
                  <strong>Hora:</strong> {selectedTime}
                </p>
                <p>
                  <strong>Modalidade:</strong>{" "}
                  {sessionType === "presencial" ? "Presencial" : "Online"}
                </p>
                <p>
                  <strong>Duração:</strong> {selectedTherapyData?.duration}
                </p>
                <p>
                  <strong>Valor:</strong> {selectedTherapyData?.price}€
                </p>
              </div>
            </div>

            <p className="text-gray-500 mb-8">
              Receberá um email de confirmação com todos os detalhes e
              instruções de preparação.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center bg-primary text-white px-8 py-4 rounded-xl font-semibold hover:bg-primary-dark transition-all"
              >
                Voltar à Página Inicial
              </Link>
              <Link
                href="/cliente"
                className="inline-flex items-center justify-center border-2 border-gray-300 bg-white text-gray-700 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all"
              >
                Área de Cliente
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-background">
        <div className="content-container max-w-4xl mx-auto">
          {/* Progress Steps */}
          <div className="flex items-center justify-center gap-4 mb-12">
            {[1, 2, 3, 4].map((s) => (
              <div key={s} className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                    step >= s
                      ? "bg-primary text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step > s ? <Check className="w-5 h-5" /> : s}
                </div>
                {s < 4 && (
                  <div
                    className={`w-12 h-1 rounded-full transition-all ${
                      step > s ? "bg-primary" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {/* Step 1: Choose Therapy */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 md:p-12 rounded-3xl shadow-xl"
              >
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                  Escolha a Terapia
                </h2>
                <p className="text-gray-500 mb-8">
                  Selecione a terapia que deseja agendar
                </p>

                <div className="grid sm:grid-cols-2 gap-4 mb-8">
                  {therapies.map((therapy) => (
                    <button
                      key={therapy.id}
                      onClick={() => setSelectedTherapy(therapy.id)}
                      className={`p-5 rounded-xl border-2 text-left transition-all ${
                        selectedTherapy === therapy.id
                          ? "border-primary bg-primary/5"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">
                          {therapy.name}
                        </h3>
                        {selectedTherapy === therapy.id && (
                          <Check className="w-5 h-5 text-primary" />
                        )}
                      </div>
                      <div className="flex gap-4 text-sm text-gray-500">
                        <span>{therapy.duration}</span>
                        <span className="font-semibold text-primary">
                          {therapy.price}€
                        </span>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Session Type */}
                <div className="mb-8">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Modalidade
                  </h3>
                  <div className="flex gap-4">
                    {(["presencial", "online"] as const).map((type) => (
                      <button
                        key={type}
                        onClick={() => setSessionType(type)}
                        className={`flex-1 p-4 rounded-xl border-2 font-medium transition-all ${
                          sessionType === type
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 text-gray-600 hover:border-primary/50"
                        }`}
                      >
                        {type === "presencial" ? "📍 Presencial" : "💻 Online"}
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!selectedTherapy}
                  className={`w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                    selectedTherapy
                      ? "bg-primary text-white hover:bg-primary-dark"
                      : "bg-gray-200 text-gray-400 cursor-not-allowed"
                  }`}
                >
                  Continuar
                  <ArrowRight className="w-5 h-5" />
                </button>
              </motion.div>
            )}

            {/* Step 2: Choose Date */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 md:p-12 rounded-3xl shadow-xl"
              >
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                  Escolha a Data
                </h2>
                <p className="text-gray-500 mb-8">
                  Selecione o dia preferido para a sua sessão
                </p>

                <div className="grid grid-cols-5 sm:grid-cols-7 gap-3 mb-8">
                  {availableDates.map((d) => (
                    <button
                      key={d.date}
                      onClick={() => setSelectedDate(d.date)}
                      className={`p-3 rounded-xl text-center transition-all ${
                        selectedDate === d.date
                          ? "bg-primary text-white"
                          : "bg-gray-50 hover:bg-primary/10"
                      }`}
                    >
                      <p className="text-xs uppercase">{d.dayName}</p>
                      <p className="text-xl font-bold">{d.dayNum}</p>
                      <p className="text-xs">{d.month}</p>
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-4 rounded-xl border-2 border-gray-200 font-medium text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!selectedDate}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                      selectedDate
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Continuar
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Choose Time */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 md:p-12 rounded-3xl shadow-xl"
              >
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                  Escolha o Horário
                </h2>
                <p className="text-gray-500 mb-8">
                  Horários disponíveis para {selectedDate}
                </p>

                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-8">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() =>
                        slot.available && setSelectedTime(slot.time)
                      }
                      disabled={!slot.available}
                      className={`p-4 rounded-xl font-medium transition-all ${
                        selectedTime === slot.time
                          ? "bg-primary text-white"
                          : slot.available
                            ? "bg-gray-50 hover:bg-primary/10"
                            : "bg-gray-100 text-gray-300 cursor-not-allowed line-through"
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="px-6 py-4 rounded-xl border-2 border-gray-200 font-medium text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    disabled={!selectedTime}
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                      selectedTime
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    Continuar
                    <ArrowRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 4: Contact Info */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white p-8 md:p-12 rounded-3xl shadow-xl"
              >
                <h2 className="font-serif text-2xl font-bold text-gray-900 mb-2">
                  Os Seus Dados
                </h2>
                <p className="text-gray-500 mb-8">
                  Complete os seus dados para finalizar o agendamento
                </p>

                {/* Summary */}
                <div className="bg-primary/5 p-6 rounded-xl mb-8">
                  <h3 className="font-semibold text-gray-900 mb-3">
                    Resumo do Agendamento
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-3 text-sm">
                    <p>
                      <strong>Terapia:</strong> {selectedTherapyData?.name}
                    </p>
                    <p>
                      <strong>Valor:</strong> {selectedTherapyData?.price}€
                    </p>
                    <p>
                      <strong>Data:</strong> {selectedDate}
                    </p>
                    <p>
                      <strong>Hora:</strong> {selectedTime}
                    </p>
                    <p>
                      <strong>Modalidade:</strong>{" "}
                      {sessionType === "presencial" ? "Presencial" : "Online"}
                    </p>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nome Completo *
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="text"
                        value={contactInfo.name}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            name: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary outline-none"
                        placeholder="O seu nome"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email *
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="email"
                        value={contactInfo.email}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            email: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary outline-none"
                        placeholder="email@exemplo.com"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Telefone
                    </label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input
                        type="tel"
                        value={contactInfo.phone}
                        onChange={(e) =>
                          setContactInfo({
                            ...contactInfo,
                            phone: e.target.value,
                          })
                        }
                        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary outline-none"
                        placeholder="+351 912 345 678"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Notas (opcional)
                    </label>
                    <textarea
                      value={contactInfo.notes}
                      onChange={(e) =>
                        setContactInfo({
                          ...contactInfo,
                          notes: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:border-primary outline-none resize-none"
                      rows={3}
                      placeholder="Alguma informação que gostaria de partilhar..."
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(3)}
                    className="px-6 py-4 rounded-xl border-2 border-gray-200 font-medium text-gray-600 hover:bg-gray-50 transition-all"
                  >
                    Voltar
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={
                      !contactInfo.name || !contactInfo.email || isSubmitting
                    }
                    className={`flex-1 flex items-center justify-center gap-2 py-4 rounded-xl font-semibold transition-all ${
                      contactInfo.name && contactInfo.email
                        ? "bg-primary text-white hover:bg-primary-dark"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {isSubmitting ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        A processar...
                      </>
                    ) : (
                      <>
                        Confirmar Agendamento
                        <Check className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
