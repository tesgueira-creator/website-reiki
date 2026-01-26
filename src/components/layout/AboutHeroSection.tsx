"use client";

import { motion } from "framer-motion";

export function AboutHeroSection() {
  return (
    <section className="min-h-[70vh] flex items-center bg-background section-padding">
      <div className="content-container content-grid">
        <motion.div
          className="col-span-12 md:col-span-10 md:col-start-2 text-center stack-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-primary font-semibold tracking-widest text-sm uppercase">
            Conheça a Rafaella
          </p>
          <h1 className="font-serif text-5xl md:text-6xl font-bold text-text-main leading-tight">
            Uma Jornada de Cura e Espiritualidade
          </h1>
          <p className="text-text-secondary text-xl leading-relaxed max-w-2xl mx-auto text-center">
            Há mais de 10 anos dedicada à transformação de vidas através do
            Reiki Kundalini, terapias holísticas e orientação espiritual
            profunda.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
