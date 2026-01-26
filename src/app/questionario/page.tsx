"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  Send,
  Sparkles,
  Heart,
  Zap,
  Brain,
  Moon,
  Sun,
  Users,
  Target,
} from "lucide-react";
import Link from "next/link";
import {
  scheduleCtaClass,
  scheduleSecondaryCtaClass,
} from "@/components/ui/buttonStyles";

interface QuestionOption {
  value: string;
  label: string;
  icon?: React.ReactNode;
}

interface Question {
  id: string;
  question: string;
  subtitle?: string;
  type: "single" | "multiple" | "scale" | "text";
  options?: QuestionOption[];
  required?: boolean;
}

const questions: Question[] = [
  {
    id: "goal",
    question:
      "Qual é o seu principal objetivo ao procurar uma terapia holística?",
    subtitle: "Escolha a opção que mais ressoa consigo",
    type: "single",
    options: [
      {
        value: "stress",
        label: "Reduzir stress e ansiedade",
        icon: <Brain className="w-5 h-5" />,
      },
      {
        value: "energy",
        label: "Aumentar energia e vitalidade",
        icon: <Zap className="w-5 h-5" />,
      },
      {
        value: "emotional",
        label: "Curar traumas emocionais",
        icon: <Heart className="w-5 h-5" />,
      },
      {
        value: "spiritual",
        label: "Desenvolvimento espiritual",
        icon: <Sparkles className="w-5 h-5" />,
      },
      {
        value: "sleep",
        label: "Melhorar qualidade do sono",
        icon: <Moon className="w-5 h-5" />,
      },
      {
        value: "clarity",
        label: "Clareza mental e foco",
        icon: <Target className="w-5 h-5" />,
      },
    ],
    required: true,
  },
  {
    id: "symptoms",
    question: "Que sintomas ou sensações tem experienciado?",
    subtitle: "Selecione todos os que se aplicam",
    type: "multiple",
    options: [
      { value: "fatigue", label: "Cansaço extremo / Esgotamento" },
      { value: "anxiety", label: "Ansiedade ou nervosismo constante" },
      { value: "insomnia", label: "Dificuldade em adormecer" },
      { value: "sadness", label: "Tristeza profunda ou vazio interior" },
      { value: "blocked", label: "Sensação de bloqueio ou estagnação" },
      { value: "pain", label: "Dores físicas sem causa aparente" },
      { value: "negativity", label: "Pensamentos negativos recorrentes" },
      { value: "disconnection", label: "Desconexão de si mesmo" },
    ],
    required: true,
  },
  {
    id: "stress_level",
    question: "Numa escala de 1 a 10, como avalia o seu nível de stress atual?",
    subtitle: "1 = Muito baixo | 10 = Extremamente alto",
    type: "scale",
    required: true,
  },
  {
    id: "experience",
    question: "Tem experiência prévia com terapias holísticas?",
    type: "single",
    options: [
      { value: "none", label: "Nunca experimentei" },
      { value: "some", label: "Já experimentei algumas vezes" },
      { value: "regular", label: "Pratico regularmente" },
      { value: "curious", label: "Sou curioso mas nunca tive oportunidade" },
    ],
  },
  {
    id: "therapy_interest",
    question: "Que tipo de terapia lhe desperta mais interesse?",
    subtitle: "Selecione todas as que gostaria de experimentar",
    type: "multiple",
    options: [
      { value: "reiki", label: "Reiki Kundalini" },
      {
        value: "mesa-radionica",
        label: "Mesa Radiónica (Diagnóstico Energético)",
      },
      { value: "multidimensional", label: "Terapia Multidimensional" },
      { value: "aura", label: "Leitura de Aura" },
      { value: "meditacao", label: "Meditação Guiada" },
      { value: "limpeza", label: "Limpeza Energética" },
      { value: "unsure", label: "Não tenho certeza, preciso de orientação" },
    ],
  },
  {
    id: "availability",
    question: "Qual é a sua disponibilidade para sessões?",
    type: "single",
    options: [
      { value: "weekday-morning", label: "Manhãs de dias úteis" },
      { value: "weekday-afternoon", label: "Tardes de dias úteis" },
      { value: "weekend", label: "Fins de semana" },
      { value: "flexible", label: "Tenho flexibilidade" },
      { value: "online", label: "Prefiro sessões online" },
    ],
  },
  {
    id: "story",
    question: "Gostaria de partilhar algo mais sobre a sua situação?",
    subtitle: "Opcional - Quanto mais soubermos, melhor poderemos ajudar",
    type: "text",
    required: false,
  },
  {
    id: "contact",
    question: "Como podemos entrar em contacto consigo?",
    subtitle: "Para enviar a sua análise personalizada",
    type: "text",
    required: true,
  },
];

export default function QuestionarioPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<
    Record<string, string | string[] | number>
  >({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [contactInfo, setContactInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  const handleSingleAnswer = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const handleMultipleAnswer = (value: string) => {
    const current = (answers[currentQuestion.id] as string[]) || [];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: updated }));
  };

  const handleScaleAnswer = (value: number) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const canProceed = () => {
    if (!currentQuestion.required) return true;
    const answer = answers[currentQuestion.id];
    if (currentQuestion.type === "multiple")
      return (answer as string[])?.length > 0;
    if (currentQuestion.id === "contact") return contactInfo.email.length > 0;
    return !!answer;
  };

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simular envio
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsComplete(true);
  };

  const getRecommendation = () => {
    const goal = answers.goal as string;
    const symptoms = answers.symptoms as string[];

    if (
      goal === "emotional" ||
      symptoms?.includes("sadness") ||
      symptoms?.includes("blocked")
    ) {
      return {
        therapy: "Terapia Multidimensional",
        reason:
          "Baseado nas suas respostas, a Terapia Multidimensional é ideal para trabalhar traumas emocionais profundos e desbloquear padrões energéticos.",
      };
    }
    if (goal === "energy" || symptoms?.includes("fatigue")) {
      return {
        therapy: "Reiki Kundalini",
        reason:
          "Para restaurar a sua energia vital e combater o cansaço, o Reiki Kundalini é a terapia mais indicada.",
      };
    }
    if (symptoms?.includes("negativity") || symptoms?.includes("blocked")) {
      return {
        therapy: "Mesa Radiónica",
        reason:
          "Um diagnóstico através da Mesa Radiónica pode identificar os bloqueios específicos que estão a afetar o seu bem-estar.",
      };
    }
    return {
      therapy: "Consulta Inicial",
      reason:
        "Recomendamos uma consulta inicial gratuita para entender melhor as suas necessidades e criar um plano personalizado.",
    };
  };

  if (isComplete) {
    const recommendation = getRecommendation();
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
              <CheckCircle className="w-12 h-12 text-white" />
            </motion.div>

            <h1 className="font-serif text-4xl font-bold text-gray-900 mb-4">
              Obrigada pela Partilha! 💚
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              As suas respostas foram recebidas e analisadas.
            </p>

            <div className="bg-white p-8 rounded-2xl shadow-lg border border-green-100 mb-8">
              <div className="flex items-center gap-2 text-primary mb-4">
                <Sparkles className="w-5 h-5" />
                <span className="font-semibold">
                  Recomendação Personalizada
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-gray-900 mb-3">
                {recommendation.therapy}
              </h2>
              <p className="text-gray-600">{recommendation.reason}</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/servicos"
                className={`${scheduleSecondaryCtaClass} justify-center px-8 py-4`}
              >
                Ver Serviços
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <Link
                href="/contacto"
                className={`${scheduleCtaClass} justify-center px-8 py-4`}
              >
                Agendar Sessão
              </Link>
            </div>

            <p className="mt-8 text-gray-500 text-sm">
              Entraremos em contacto em até 24 horas com mais detalhes.
            </p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-background to-white">
        <div className="content-container max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress Bar */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>
                Pergunta {currentStep + 1} de {questions.length}
              </span>
              <span>{Math.round(progress)}% completo</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-primary-dark"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Question Card */}
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="bg-white p-12 md:p-16 rounded-3xl shadow-xl border border-gray-100"
            >
              <h2 className="font-serif text-2xl md:text-3xl font-bold text-gray-900 mb-2">
                {currentQuestion.question}
              </h2>
              {currentQuestion.subtitle && (
                <p className="text-gray-500 mb-8">{currentQuestion.subtitle}</p>
              )}

              {/* Single Choice */}
              {currentQuestion.type === "single" && (
                <div className="grid gap-3">
                  {currentQuestion.options?.map((option) => (
                    <button
                      key={option.value}
                      onClick={() => handleSingleAnswer(option.value)}
                      className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                        answers[currentQuestion.id] === option.value
                          ? "border-primary bg-primary/5 text-primary"
                          : "border-gray-200 hover:border-primary/50"
                      }`}
                    >
                      {option.icon && (
                        <span
                          className={
                            answers[currentQuestion.id] === option.value
                              ? "text-primary"
                              : "text-gray-400"
                          }
                        >
                          {option.icon}
                        </span>
                      )}
                      <span className="font-medium">{option.label}</span>
                      {answers[currentQuestion.id] === option.value && (
                        <CheckCircle className="w-5 h-5 ml-auto" />
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Multiple Choice */}
              {currentQuestion.type === "multiple" && (
                <div className="grid gap-3">
                  {currentQuestion.options?.map((option) => {
                    const selected = (
                      answers[currentQuestion.id] as string[]
                    )?.includes(option.value);
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleMultipleAnswer(option.value)}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                          selected
                            ? "border-primary bg-primary/5 text-primary"
                            : "border-gray-200 hover:border-primary/50"
                        }`}
                      >
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                            selected
                              ? "border-primary bg-primary"
                              : "border-gray-300"
                          }`}
                        >
                          {selected && (
                            <CheckCircle className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <span className="font-medium">{option.label}</span>
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Scale */}
              {currentQuestion.type === "scale" && (
                <div className="flex flex-wrap gap-3 justify-center">
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                    <button
                      key={num}
                      onClick={() => handleScaleAnswer(num)}
                      className={`w-12 h-12 rounded-xl font-bold text-lg transition-all ${
                        answers[currentQuestion.id] === num
                          ? "bg-primary text-white scale-110 shadow-lg"
                          : "bg-gray-100 text-gray-600 hover:bg-primary/20"
                      }`}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              )}

              {/* Text / Contact */}
              {currentQuestion.type === "text" &&
                currentQuestion.id === "contact" && (
                  <div className="space-y-4">
                    <input
                      type="text"
                      placeholder="O seu nome"
                      value={contactInfo.name}
                      onChange={(e) =>
                        setContactInfo((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                    <input
                      type="email"
                      placeholder="O seu email *"
                      value={contactInfo.email}
                      onChange={(e) =>
                        setContactInfo((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                      required
                    />
                    <input
                      type="tel"
                      placeholder="Telefone (opcional)"
                      value={contactInfo.phone}
                      onChange={(e) =>
                        setContactInfo((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                      className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none"
                    />
                  </div>
                )}

              {currentQuestion.type === "text" &&
                currentQuestion.id !== "contact" && (
                  <textarea
                    placeholder="Escreva aqui a sua resposta..."
                    value={(answers[currentQuestion.id] as string) || ""}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [currentQuestion.id]: e.target.value,
                      }))
                    }
                    rows={5}
                    className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none resize-none"
                  />
                )}

              {/* Navigation */}
              <div className="flex justify-between gap-4 mt-12">
                <button
                  onClick={handleBack}
                  disabled={currentStep === 0 || isSubmitting}
                  className={`${scheduleSecondaryCtaClass} gap-2 px-8 py-4 font-bold ${currentStep === 0 || isSubmitting ? "opacity-40 cursor-not-allowed" : "hover:shadow-lg"}`}
                >
                  <ArrowLeft className="w-6 h-6" />
                  Anterior
                </button>

                <button
                  onClick={handleNext}
                  disabled={!canProceed() || isSubmitting}
                  className={`${scheduleCtaClass} gap-2 px-10 py-4 font-bold text-lg ${!canProceed() || isSubmitting ? "opacity-40 cursor-not-allowed" : "hover:shadow-lg"}`}
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      A enviar...
                    </>
                  ) : currentStep === questions.length - 1 ? (
                    <>
                      Enviar
                      <Send className="w-6 h-6" />
                    </>
                  ) : (
                    <>
                      Próxima
                      <ArrowRight className="w-6 h-6" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
      <Footer />
    </>
  );
}
