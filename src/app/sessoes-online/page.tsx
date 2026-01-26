"use client";

import { useState } from "react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { motion } from "framer-motion";
import Link from "next/link";
import {
  Video,
  Users,
  Monitor,
  Globe,
  Clock,
  CheckCircle,
  Calendar,
  MessageCircle,
  Headphones,
  Shield,
  ArrowRight,
  Play,
} from "lucide-react";

const onlineServices = [
  {
    id: "reiki-online",
    title: "Sessão de Reiki Online",
    description:
      "Receba a energia curativa do Reiki onde quer que esteja. Sessões ao vivo via videochamada com a mesma eficácia das presenciais.",
    price: 50,
    duration: "60 min",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop",
  },
  {
    id: "consulta-energetica-online",
    title: "Consulta Energética Online",
    description:
      "Análise completa do seu campo energético e orientação personalizada para o seu desenvolvimento espiritual.",
    price: 45,
    duration: "45 min",
    image:
      "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop",
  },
  {
    id: "mentoria-espiritual",
    title: "Mentoria Espiritual",
    description:
      "Acompanhamento contínuo para guiar a sua jornada de crescimento pessoal e espiritual com sessões semanais.",
    price: 180,
    duration: "4 sessões/mês",
    image:
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop",
  },
  {
    id: "meditacao-guiada-grupo",
    title: "Meditação em Grupo Online",
    description:
      "Junte-se a outros praticantes numa experiência coletiva de meditação guiada ao vivo.",
    price: 12,
    duration: "30 min",
    image:
      "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&h=400&fit=crop",
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Agende a Sua Sessão",
    description:
      "Escolha o serviço, a data e hora que mais lhe convém através do nosso sistema de agendamento.",
    icon: Calendar,
  },
  {
    step: 2,
    title: "Receba as Instruções",
    description:
      "Enviamos por email o link da videochamada e dicas para preparar o seu espaço.",
    icon: MessageCircle,
  },
  {
    step: 3,
    title: "Conecte-se",
    description:
      "No dia agendado, aceda ao link alguns minutos antes e prepare-se para a sua sessão.",
    icon: Video,
  },
  {
    step: 4,
    title: "Experiencie a Transformação",
    description:
      "Relaxe e permita que a energia flua. A distância não é barreira para a cura.",
    icon: Headphones,
  },
];

const faqs = [
  {
    question: "As sessões online são tão eficazes quanto as presenciais?",
    answer:
      "Sim! A energia não conhece distância física. Muitos clientes reportam experiências igualmente profundas nas sessões online. A conexão energética transcende o espaço físico.",
  },
  {
    question: "Que equipamento preciso?",
    answer:
      "Apenas um computador, tablet ou smartphone com câmara e microfone, uma ligação de internet estável e um espaço tranquilo onde não seja interrompido.",
  },
  {
    question: "Que plataforma é utilizada?",
    answer:
      "Utilizamos Zoom ou Google Meet, dependendo da sua preferência. O link é enviado por email antes da sessão.",
  },
  {
    question: "E se tiver problemas técnicos?",
    answer:
      "Não se preocupe! Se houver problemas de conexão, reagendamos a sessão sem custos adicionais. Estamos sempre disponíveis para ajudar.",
  },
];

export default function SessoesOnlinePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-32 pb-24 bg-gradient-to-b from-background to-white">
        <div className="content-container">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium mb-6"
            >
              <Globe className="w-4 h-4" />
              Disponível em Todo o Mundo
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="font-serif text-4xl md:text-5xl font-bold text-gray-900 mb-6"
            >
              Sessões Online
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-gray-600 max-w-2xl mx-auto mb-8 text-center"
            >
              A energia curativa não conhece fronteiras. Experiencie terapias
              transformadoras no conforto da sua casa.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-wrap justify-center gap-8"
            >
              {[
                { icon: Users, value: "500+", label: "Sessões Online" },
                { icon: Globe, value: "12", label: "Países" },
                { icon: CheckCircle, value: "98%", label: "Satisfação" },
              ].map((stat, index) => (
                <div key={index} className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-bold text-2xl text-gray-900">
                      {stat.value}
                    </p>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Services Grid */}
          <div className="mb-20">
            <h2 className="font-serif text-2xl font-bold text-gray-900 text-center mb-8">
              Serviços Disponíveis Online
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {onlineServices.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-xl transition-all group flex flex-col md:flex-row"
                >
                  {/* Image */}
                  <div className="relative w-full md:w-48 h-48 md:h-auto shrink-0">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 bg-blue-500 rounded-full text-xs font-medium text-white">
                      <Video className="w-3 h-3" />
                      Online
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex flex-col justify-between flex-1">
                    <div>
                      <h3 className="font-serif text-xl font-bold text-gray-900 mb-2">
                        {service.title}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">
                        {service.description}
                      </p>
                      <div className="flex items-center gap-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {service.duration}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
                      <p className="font-bold text-2xl text-primary">
                        {service.price}€
                      </p>
                      <Link
                        href="/agendar"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary hover:bg-primary-dark text-white rounded-xl font-medium text-sm transition-all"
                      >
                        Agendar
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* How It Works */}
          <div className="mb-20">
            <h2 className="font-serif text-2xl font-bold text-gray-900 text-center mb-12">
              Como Funciona
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {howItWorks.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto">
                      <item.icon className="w-8 h-8 text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {item.step}
                    </div>
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Video Testimonial Placeholder */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-20 relative rounded-3xl overflow-hidden"
          >
            <img
              src="https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&h=500&fit=crop"
              alt="Depoimento"
              className="w-full h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30 flex items-center">
              <div className="p-8 md:p-12 max-w-xl">
                <p className="text-white text-lg md:text-xl italic mb-6">
                  &quot;Fiz a minha primeira sessão online com algum ceticismo,
                  mas a experiência foi incrível. Senti a energia fluir como se
                  estivesse presente. Agora faço sessões regulares a partir de
                  casa.&quot;
                </p>
                <p className="text-white font-medium">— Ana P., Lisboa</p>
              </div>
              <div className="absolute right-8 md:right-12">
                <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/30 transition">
                  <Play className="w-8 h-8 text-white ml-1" />
                </div>
              </div>
            </div>
          </motion.div>

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

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-primary to-primary-dark rounded-3xl p-8 md:p-12 text-center text-white"
          >
            <Shield className="w-12 h-12 mx-auto mb-4 opacity-80" />
            <h3 className="font-serif text-2xl md:text-3xl font-bold mb-4">
              Pronto para Começar?
            </h3>
            <p className="text-white/80 mb-6 max-w-lg mx-auto">
              Agende a sua primeira sessão online e descubra que a distância não
              é barreira para a transformação.
            </p>
            <Link
              href="/agendar"
              className="inline-flex items-center gap-2 px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:bg-gray-100 transition-all"
            >
              Agendar Sessão Online
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  );
}
