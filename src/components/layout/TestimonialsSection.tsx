"use client";

import { motion } from "framer-motion";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TestimonialCard } from "@/components/ui/TestimonialCard";

const testimonials = [
  {
    name: "Maria Silva",
    text: "A Rafaella transformou completamente a minha vida. Sinto-me mais equilibrada, em paz comigo mesma e com uma conexão espiritual muito mais profunda.",
    rating: 5,
  },
  {
    name: "João Costa",
    text: "Depois de várias sessões de Reiki, percebi como estava desconectado da minha energia. Agora sinto-me revitalizado e focado.",
    rating: 5,
  },
  {
    name: "Ana Mendes",
    text: "A leitura de aura foi reveladora. Compreendi finalmente os padrões que me estavam a bloquear. Recomendo vivamente!",
    rating: 5,
  },
  {
    name: "Paulo Ferreira",
    text: "Procurava orientação espiritual há muito tempo. A Rafaella é uma verdadeira guia e terapeuta de excelência.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-white section-padding">
      <div className="content-container content-grid">
        <div className="col-span-12 md:col-span-10 md:col-start-2">
          <SectionTitle
            label="O que Dizem"
            title="Histórias de Transformação"
            subtitle="Ouça os relatos de quem já experienciou a jornada de cura e reequilíbrio"
          />
        </div>

        <div className="col-span-12 grid grid-cols-12 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              className="col-span-12 md:col-span-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <TestimonialCard {...testimonial} />
            </motion.div>
          ))}
        </div>

        <motion.div
          className="col-span-12 mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-text-secondary mb-6">
            Mais de 200 clientes transformados em Portugal
          </p>
          <a
            href="/depoimentos"
            className="inline-flex items-center gap-2 border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-3 rounded-full font-semibold transition-all"
          >
            Ver Mais Depoimentos
          </a>
        </motion.div>
      </div>
    </section>
  );
}
