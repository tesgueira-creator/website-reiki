"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/layout/Hero";
import { ValuesSection } from "@/components/layout/ValuesSection";
import { CTASection } from "@/components/layout/CTASection";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceFilter, FilterOption } from "@/components/ui/ServiceFilter";
import { WhatsAppFloatingButton } from "@/components/shared/WhatsAppButton";
import { ScrollToTop } from "@/components/shared/ScrollToTop";
import { SocialProofBanner } from "@/components/shared/SocialProofBanner";
import { TrustBadges } from "@/components/shared/TrustBadges";
import { Star, ArrowRight } from "lucide-react";
import {
  fetchHomepageData,
  type Service,
  type Testimonial,
  type Author,
} from "@/lib/sanity-queries";
import {
  scheduleCtaClass,
  scheduleSecondaryCtaClass,
  scheduleGhostLinkClass,
} from "@/components/ui/buttonStyles";

// Fallback data (mockup) com copywriting profissional - NOVA ESTRUTURA
const FALLBACK_SERVICES = [
  // 🔍 DIAGNÓSTICO & HARMONIZAÇÃO (Radiestesia)
  {
    _id: "1",
    title: "Consulta de Mesa Radiónica",
    slug: "mesa-radionica",
    shortDescription:
      "Diagnóstico preciso de bloqueios energéticos, medição de chakras e limpeza profunda de magias ou formas-pensamento. Receba um relatório completo do seu estado energético.",
    price: 50,
    duration: "60 min",
    isPopular: true,
    category: "diagnosis" as const,
    targetAudience: [
      "Bloqueios energéticos",
      "Sensação de peso",
      "Energias negativas",
      "Má sorte persistente",
    ],
    benefits: [
      "Identifica com precisão bloqueios, magias ou influências energéticas negativas que afetam sua vida.",
      "Remove formas-pensamento prejudiciais e limpa padrões energéticos estagnados, restaurando seu fluxo natural.",
    ],
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop",
  },

  // 💖 CURA PELO CORAÇÃO (Multidimensional)
  {
    _id: "2",
    title: "Terapia Multidimensional - Cura pelo Coração",
    slug: "terapia-multidimensional",
    shortDescription:
      "Conhecida como 'Cirurgia Espiritual', esta terapia utiliza meditação guiada onde a Equipa Espiritual atua. Ideal para traumas emocionais profundos, lutos e divórcios.",
    price: 50,
    duration: "50 min",
    isPopular: true,
    category: "consciousness" as const,
    targetAudience: [
      "Tristeza profunda",
      "Trauma emocional",
      "Luto",
      "Divórcio",
      "Bloqueios emocionais",
    ],
    benefits: [
      "Cura traumas emocionais profundos através de reequilíbrio kármico e liberação de padrões antigos.",
      "Reconecta você com seu coração, trazendo paz interior e clareza emocional duradoura.",
    ],
    image:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=600&h=400&fit=crop",
  },

  // ⚡ ENERGIA & VITALIDADE (Reiki Kundalini)
  {
    _id: "3",
    title: "Sessão de Reiki Kundalini",
    slug: "reiki-kundalini",
    shortDescription:
      "Experiência de cura energética profunda que desperta sua Kundalini — a energia vital adormecida — para revitalizar seu corpo, mente e espírito.",
    price: 55,
    duration: "60 min",
    isPopular: true,
    category: "energy-healing" as const,
    targetAudience: [
      "Cansaço extremo",
      "Falta de energia",
      "Stress",
      "Ansiedade",
      "Esgotamento",
    ],
    benefits: [
      "Reequilibra seus centros energéticos (chakras), deixando-o revitalizado e com energia renovada.",
      "Alivia stress, ansiedade e tensão acumulada, promovendo um estado de profundo relaxamento e bem-estar.",
    ],
    image:
      "https://images.unsplash.com/photo-1528991435120-da109ca7eeb6?w=600&h=400&fit=crop",
  },

  // 📦 PACK HÍBRIDO (Ticket Médio Alto)
  {
    _id: "4",
    title: "Pack Alinhamento Total",
    slug: "pack-alinhamento-total",
    shortDescription:
      "Programa completo: 1 Mesa Radiónica (diagnóstico e limpeza pesada) + 1 Sessão de Reiki (reposição energética). Transformação profunda garantida.",
    price: 90,
    duration: "2 sessões",
    isPopular: false,
    category: "package" as const,
    targetAudience: [
      "Transformação profunda",
      "Reset energético completo",
      "Múltiplos bloqueios",
    ],
    benefits: [
      "Diagnóstico preciso seguido de limpeza energética profunda e reposição de energia vital.",
      "Economia de 15€ comparado a agendar as sessões separadamente. Transformação completa em 2 semanas.",
    ],
    image:
      "https://images.unsplash.com/photo-1533073526757-2c8ca94d4ad0?w=600&h=400&fit=crop",
  },
];

const FALLBACK_TESTIMONIALS = [
  {
    _id: "1",
    clientName: "Maria Silva",
    testimonialText:
      "A sessão de Reiki com Rafaella foi transformadora. Senti uma paz profunda que nunca tinha experimentado — como se toda a minha tensão se dissolvesse. Saí renovada e com uma clareza que durou semanas.",
    rating: 5,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
  },
  {
    _id: "2",
    clientName: "João Santos",
    testimonialText:
      "Recomendo fortemente Rafaella. Tem um dom especial para trabalhar a energia e trazer verdadeiro equilíbrio. Após a limpeza energética, senti-me leve e posso dizer que minha vida mudou para melhor.",
    rating: 5,
    featured: true,
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
  },
  {
    _id: "3",
    clientName: "Ana Costa",
    testimonialText:
      "A leitura de aura foi reveladora. Rafaella explicou padrões que eu sempre senti mas não compreendia. Agora tenho clareza sobre meu caminho e propósito. Muito grata!",
    rating: 5,
    featured: false,
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
  },
];

const FALLBACK_AUTHOR = {
  name: "Rafaella Kally",
  shortBio:
    "Terapeuta holística especializada em Reiki Kundalini com mais de uma década de dedicação a acompanhar pessoas na sua jornada de transformação pessoal e despertar espiritual.",
  longBio:
    "Sou Rafaella Kally, terapeuta holística especializada em Reiki Kundalini e trabalho energético avançado. Com mais de uma década de dedicação, acompanhei centenas de pessoas na sua jornada de transformação pessoal — desde o alívio do stress e da ansiedade até ao despertar de uma versão mais autêntica e poderosa de si mesmas.\n\nMinha abordagem combina técnicas ancestrais comprovadas com uma compreensão profunda da energia humana e dos padrões que nos limitam. Acredito que cada pessoa tem uma capacidade inata de cura e transformação — o meu objetivo é facilitar esse despertar com compaixão, profundidade e ferramentas energéticas precisas. Minha missão é simples mas transformadora: ajudá-lo a reconectar com seu poder interior e a despertar uma consciência elevada sobre quem verdadeiramente é.",
  specializations: [
    "Reiki Kundalini",
    "Limpeza Energética",
    "Leitura de Aura",
    "Mentoria Espiritual",
  ],
  certifications: [
    {
      title: "Mestrado em Reiki Kundalini",
      institution: "Instituto Energia Pura",
      year: 2020,
    },
    {
      title: "Terapeuta Holístico Certificado",
      institution: "Academia de Bem-estar Integral",
      year: 2018,
    },
  ],
  image: "/rafaella-profile.png",
};

export default function Home() {
  const [services, setServices] = useState<Service[]>(FALLBACK_SERVICES);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(
    FALLBACK_TESTIMONIALS,
  );
  const [author, setAuthor] = useState<Author>(FALLBACK_AUTHOR);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState<FilterOption>("all");

  // Filtrar serviços baseado na seleção
  const filteredServices =
    activeFilter === "all"
      ? services
      : services.filter((service) => service.category === activeFilter);

  const serviceOverviews = [
    {
      key: "diagnosis",
      title: "Diagnóstico Energético",
      description: "Mesa Radiónica e leituras para identificar bloqueios.",
      icon: "🧭",
    },
    {
      key: "energy-healing",
      title: "Reequilíbrio e Energia",
      description: "Sessões de Reiki e técnicas para restaurar vitalidade.",
      icon: "⚡",
    },
    {
      key: "package",
      title: "Programas Completos",
      description: "Combinações de terapias com melhor valor e acompanhamento.",
      icon: "📦",
    },
  ].map((item) => ({
    ...item,
    count: services.filter((service) => service.category === item.key).length,
  }));

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await fetchHomepageData(
          FALLBACK_SERVICES,
          FALLBACK_TESTIMONIALS,
          FALLBACK_AUTHOR,
        );

        setServices(data.services);
        setTestimonials(data.testimonials);
        setAuthor(data.author);

        if (data.isFromSanity) {
          console.log("✅ Dados carregados com sucesso do Sanity");
        } else {
          console.log(
            "ℹ️  Usando dados mockados de fallback:",
            data.error || "Sanity não configurado",
          );
        }
      } catch (error) {
        console.error("❌ Erro crítico ao carregar dados:", error);
        // Mantém fallback data em caso de erro
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <main className="min-h-screen pt-16" id="main-content" role="main">
        {/* Hero Section */}
        <Hero />

        {/* Social Proof Banner - NEW */}
        <SocialProofBanner />

        {/* Values / Why Choose Section - ADICIONADO PARA DAR MAIS CONTEXTO */}
        <ValuesSection />

        {/* Services Section - AGORA COM MAIS DESTAQUE */}
        <section
          className="section-padding bg-gradient-to-b from-white to-gray-50/50"
          id="servicos"
        >
          <div className="content-container content-grid">
            <div className="col-span-12 md:col-span-10 md:col-start-2">
              <SectionTitle
                label="Caminhos de Cura"
                title="Terapias Holísticas"
                subtitle="Uma abordagem integrada para restaurar o seu equilíbrio físico, emocional e energético."
                centered={true}
              />
            </div>

            <div className="col-span-12 md:col-span-10 md:col-start-2">
              <ServiceFilter
                activeFilter={activeFilter}
                onFilterChange={setActiveFilter}
              />
            </div>

            <div className="col-span-12">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeFilter}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-12 gap-6"
                >
                  {filteredServices.map((service, index) => (
                    <motion.div
                      key={service._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="col-span-12 md:col-span-6 lg:col-span-3"
                    >
                      <ServiceCard
                        serviceId={service._id}
                        title={service.title}
                        description={service.shortDescription || ""}
                        duration={service.duration}
                        price={service.price}
                        isPopular={service.isPopular}
                        image={service.image}
                        slug={service.slug}
                      />
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="col-span-12 mt-12 text-center">
              <Link href="/servicos" className={scheduleGhostLinkClass}>
                Ver Tabela Comparativa Completa
              </Link>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="col-span-12 mt-10 bg-white border border-gray-100 rounded-3xl shadow-xl p-8 md:p-10 grid grid-cols-12 gap-6 items-start"
            >
              <div className="col-span-12 lg:col-span-5 space-y-4">
                <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">
                  Ver todos os serviços
                </p>
                <h3 className="font-serif text-3xl md:text-4xl font-bold text-[var(--color-text-dark)] leading-tight">
                  Explore a lista completa e escolha em menos de 2 minutos.
                </h3>
                <p className="text-[var(--color-text-secondary)] text-base leading-relaxed">
                  Compare preços, duração e objetivos num único olhar. Se
                  preferir, agendamos uma primeira consulta para orientar a
                  melhor terapia para si.
                </p>
                <div className="flex flex-col sm:flex-row gap-3 pt-2">
                  <Link
                    href="/contacto"
                    className={`${scheduleCtaClass} justify-center text-base px-8 py-4`}
                  >
                    Agendar Consulta de Orientação
                  </Link>
                  <Link
                    href="/servicos"
                    className={`${scheduleSecondaryCtaClass} justify-center text-base px-8 py-4`}
                  >
                    Ver todos os serviços
                  </Link>
                </div>
              </div>

              <div className="col-span-12 lg:col-span-7 grid grid-cols-1 md:grid-cols-3 gap-4">
                {serviceOverviews.map((item) => (
                  <div
                    key={item.key}
                    className="border border-gray-100 rounded-2xl p-5 bg-gradient-to-br from-gray-50 to-white shadow-sm hover:shadow-lg transition-all"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl" aria-hidden>
                        {item.icon}
                      </span>
                      <span className="text-xs font-semibold px-3 py-1 rounded-full bg-primary/10 text-primary">
                        {item.count || services.length} opções
                      </span>
                    </div>
                    <p className="font-semibold text-[var(--color-text-dark)] mb-2">
                      {item.title}
                    </p>
                    <p className="text-sm text-[var(--color-text-secondary)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Sobre a Rafaella Section */}
        <section className="section-padding bg-white">
          <div className="content-container content-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="col-span-12 grid grid-cols-12 gap-6 items-center"
            >
              {/* Imagem à esquerda */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="col-span-12 md:col-span-5 relative h-96 md:h-full min-h-96 rounded-lg overflow-hidden shadow-2xl"
              >
                {author.image && (
                  <Image
                    src={author.image}
                    alt={author.name}
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-500"
                    priority
                  />
                )}
              </motion.div>

              {/* Texto à direita */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="col-span-12 md:col-span-7 flex flex-col justify-center space-y-6"
              >
                <div>
                  <span className="text-[var(--color-primary)] font-semibold text-sm tracking-wider mb-3 inline-block">
                    Conheça a Terapeuta
                  </span>
                  <h2 className="text-4xl md:text-5xl font-serif font-bold text-[var(--color-text-dark)] mb-6">
                    {author.name}
                  </h2>
                  <p className="text-[var(--color-text-main)] text-base md:text-lg leading-relaxed">
                    {author.longBio || author.shortBio}
                  </p>
                </div>

                {/* Especialidades */}
                <div>
                  <h3 className="text-xl font-semibold text-[var(--color-text-dark)] mb-4">
                    Especialidades
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {author.specializations?.map((spec) => (
                      <span
                        key={spec}
                        className="px-5 py-2.5 bg-gradient-to-r from-[var(--color-primary)]/10 to-[var(--color-secondary)]/10 text-[var(--color-primary)] rounded-full text-sm font-medium border border-[var(--color-primary)]/20 hover:border-[var(--color-primary)]/40 transition-colors"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Certificações */}
                {author.certifications && author.certifications.length > 0 && (
                  <div>
                    <h3 className="text-xl font-semibold text-[var(--color-text-dark)] mb-4">
                      Certificações
                    </h3>
                    <div className="space-y-4 border-l-2 border-[var(--color-primary)] pl-6">
                      {author.certifications.map((cert, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.4, delay: idx * 0.1 }}
                          viewport={{ once: true }}
                        >
                          <p className="font-medium text-[var(--color-text-dark)] mb-1">
                            {cert.title}
                          </p>
                          <p className="text-sm text-[var(--color-text-light)]">
                            {cert.institution} • {cert.year}
                          </p>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Process Steps Section */}
        <section className="section-padding bg-gradient-to-br from-[var(--color-primary)]/5 via-white to-[var(--color-secondary)]/5 relative overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
            <div className="absolute -top-[10%] -left-[5%] w-[35%] h-[35%] bg-[var(--color-primary)]/5 rounded-full blur-3xl"></div>
            <div className="absolute top-[20%] right-[0%] w-[25%] h-[45%] bg-[var(--color-secondary)]/5 rounded-full blur-3xl"></div>
          </div>

          <div className="content-container content-grid relative z-10">
            <div className="col-span-12 md:col-span-10 md:col-start-2">
              <SectionTitle
                label="Jornada do Cliente"
                title="Como Funciona"
                subtitle="O seu caminho para o bem-estar em três passos simples."
                centered={true}
              />
            </div>

            <div className="col-span-12 grid grid-cols-12 gap-6 relative mt-12">
              {/* Connector Line (Desktop) */}
              <div className="hidden md:block absolute top-[3rem] left-[15%] w-[70%] h-0.5 bg-gradient-to-r from-transparent via-[var(--color-primary)]/30 to-transparent z-0"></div>

              {[
                {
                  number: "01",
                  title: "Escolha Consciente",
                  text: "Identifique como se sente usando o nosso filtro intuitivo ou entre em contacto para uma avaliação inicial gratuita.",
                  icon: "🧘‍♀️",
                  gradient: "from-purple-500/10 to-blue-500/10",
                },
                {
                  number: "02",
                  title: "Sessão Terapêutica",
                  text: "Realizamos a terapia (online ou presencial) num ambiente seguro, focada no desbloqueio e harmonização energética.",
                  icon: "✨",
                  gradient: "from-pink-500/10 to-rose-500/10",
                },
                {
                  number: "03",
                  title: "Integração & Evolução",
                  text: "Receba insights pós-sessão e orientações práticas para manter o equilíbrio no seu dia-a-dia.",
                  icon: "🌱",
                  gradient: "from-green-500/10 to-emerald-500/10",
                },
              ].map((step, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.2, duration: 0.5 }}
                  viewport={{ once: true }}
                  className="col-span-12 md:col-span-4 relative z-10 flex flex-col items-center text-center group"
                >
                  <div className="mb-8 relative">
                    {/* Ícone Emoji */}
                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 text-5xl opacity-80 group-hover:scale-125 transition-transform duration-500 filter drop-shadow-lg">
                      {step.icon}
                    </div>

                    {/* Número do Step */}
                    <div
                      className={`w-24 h-24 bg-gradient-to-br ${step.gradient} backdrop-blur-sm rounded-full flex items-center justify-center text-[var(--color-primary)] text-2xl font-bold font-serif shadow-xl group-hover:scale-110 transition-all duration-300 border-2 border-white z-10 relative mt-8`}
                    >
                      {step.number}
                    </div>
                    <div className="absolute inset-0 bg-[var(--color-primary)]/20 rounded-full blur-xl transform scale-90 group-hover:scale-125 transition-transform duration-500 mt-8"></div>
                  </div>

                  <h4 className="text-2xl font-bold text-[var(--color-text-dark)] mb-4 group-hover:text-[var(--color-primary)] transition-colors">
                    {step.title}
                  </h4>
                  <p className="text-[var(--color-text-secondary)] leading-relaxed text-base max-w-xs mx-auto">
                    {step.text}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="col-span-12 mt-12 text-center"
            >
              <Link
                href="/contacto"
                className={`${scheduleCtaClass} text-lg px-10 py-5`}
              >
                Agendar Primeira Consulta
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Testemunhos Section */}
        <section className="section-padding bg-gradient-to-b from-white to-gray-50/50">
          <div className="content-container content-grid">
            <div className="col-span-12 md:col-span-10 md:col-start-2">
              <SectionTitle
                label="Experiências de Transformação"
                title="Testemunhos Reais"
                subtitle="Histórias inspiradoras de quem já iniciou a sua jornada de cura"
                centered={true}
              />
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="col-span-12 grid grid-cols-12 gap-6"
            >
              {loading
                ? // Skeleton loading
                  Array(3)
                    .fill(null)
                    .map((_, i) => (
                      <div
                        key={i}
                        className="col-span-12 md:col-span-6 lg:col-span-4 h-72 bg-gradient-to-br from-gray-100 to-gray-50 rounded-2xl animate-pulse"
                      />
                    ))
                : testimonials.map((testimonial, idx) => (
                    <motion.div
                      key={testimonial._id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: idx * 0.1 }}
                      viewport={{ once: true }}
                      className="col-span-12 md:col-span-6 lg:col-span-4"
                    >
                      <div
                        className={`bg-white p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 h-full border hover:border-[var(--color-primary)]/20 group ${
                          testimonial.featured
                            ? "border-[var(--color-primary)]/30 shadow-lg shadow-[var(--color-primary)]/10 relative overflow-hidden"
                            : "border-gray-100 shadow-md"
                        }`}
                      >
                        {/* Featured Badge */}
                        {testimonial.featured && (
                          <div className="absolute top-0 right-0 bg-gradient-to-br from-[var(--color-primary)] to-[var(--color-primary-dark)] text-white px-4 py-2 rounded-bl-2xl text-xs font-bold tracking-wider">
                            ★ Destaque
                          </div>
                        )}

                        {/* Rating Stars */}
                        <div className="flex gap-1 mb-5">
                          {Array(testimonial.rating)
                            .fill(null)
                            .map((_, i) => (
                              <Star
                                key={i}
                                size={18}
                                className="fill-[var(--color-primary)] text-[var(--color-primary)]"
                              />
                            ))}
                        </div>

                        {/* Texto */}
                        <p className="text-[var(--color-text-main)] mb-6 italic leading-relaxed text-sm min-h-[120px]">
                          &ldquo;{testimonial.testimonialText}&rdquo;
                        </p>

                        {/* Cliente */}
                        <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
                          {testimonial.image ? (
                            <div className="relative w-14 h-14 rounded-full overflow-hidden flex-shrink-0 ring-2 ring-[var(--color-primary)]/20 group-hover:ring-[var(--color-primary)]/40 transition-all">
                              <Image
                                src={testimonial.image}
                                alt={testimonial.clientName}
                                fill
                                className="object-cover"
                              />
                            </div>
                          ) : (
                            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/20 flex items-center justify-center text-[var(--color-primary)] font-bold text-xl flex-shrink-0">
                              {testimonial.clientName.charAt(0)}
                            </div>
                          )}
                          <div>
                            <p className="font-semibold text-[var(--color-text-dark)] text-base">
                              {testimonial.clientName}
                            </p>
                            <p className="text-xs text-gray-500 mt-0.5">
                              Cliente satisfeito
                            </p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              className="col-span-12 text-center mt-12"
            >
              <Link
                href="/depoimentos"
                className="inline-flex items-center gap-2 px-10 py-4 bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-dark)] text-white font-semibold rounded-full transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1"
              >
                Ler Mais Testemunhos
                <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>

        {/* Trust Badges Section - NEW */}
        <TrustBadges />

        {/* CTA Section */}
        <CTASection />
      </main>
      <Footer />

      {/* Floating Elements */}
      <WhatsAppFloatingButton
        phoneNumber="351912345678"
        message="Olá Rafaella, visitei o seu site e gostaria de saber mais sobre as terapias."
      />
      <ScrollToTop />
    </>
  );
}
