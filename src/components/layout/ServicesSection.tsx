"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/ui/ServiceCard";

const services = [
  {
    title: "Reiki Kundalini",
    description:
      "Desbloqueie a sua energia vital e desperte o seu potencial interior através da energia Kundalini.",
    duration: "60 minutos",
    price: 80,
    isPopular: true,
    image: "/service-placeholder.svg",
    slug: "reiki-kundalini",
  },
  {
    title: "Leitura de Aura",
    description:
      "Compreenda os padrões energéticos que influenciam a sua vida e bem-estar.",
    duration: "45 minutos",
    price: 60,
    image: "/service-placeholder.svg",
    slug: "leitura-aura",
  },
  {
    title: "Cura Holística",
    description:
      "Uma abordagem integrativa para o equilíbrio corpo-mente-espírito.",
    duration: "90 minutos",
    price: 120,
    image: "/service-placeholder.svg",
    slug: "cura-holistca",
  },
  {
    title: "Consultoria Energética",
    description:
      "Sessões de orientação profunda para desbloquear padrões emocionais e espirituais.",
    duration: "75 minutos",
    price: 100,
    image: "/service-placeholder.svg",
    slug: "consultoria-energetica",
  },
  {
    title: "Meditação Guiada",
    description:
      "Práticas de meditação personalizadas para equilibrar chakras e encontrar paz interior.",
    duration: "50 minutos",
    price: 50,
    image: "/service-placeholder.svg",
    slug: "meditacao-guiada",
  },
  {
    title: "Limpeza Energética",
    description:
      "Removiment de bloqueios energéticos e purificação do espaço sagrado pessoal.",
    duration: "60 minutos",
    price: 75,
    image: "/service-placeholder.svg",
    slug: "limpeza-energetica",
  },
];

export function ServicesSection() {
  return (
    <section className="bg-background section-padding">
      <div className="content-container content-grid">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <SectionTitle
            label="Ofertas Especializadas"
            title="Serviços & Terapias"
            subtitle="Abordagens personalizadas para o seu bem-estar físico, emocional e espiritual"
          />
        </div>

        <div className="col-span-12 grid grid-cols-12 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.slug}
              className="col-span-12 md:col-span-6 lg:col-span-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ServiceCard
                title={service.title}
                description={service.description}
                duration={service.duration}
                price={service.price}
                slug={service.slug}
                isPopular={service.isPopular}
                image={service.image ?? undefined}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="col-span-12 text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <Link
            href="/servicos"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
          >
            Ver Todos os Serviços
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
