"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function Hero() {
  return (
    <section className="relative min-h-[95vh] flex items-center overflow-hidden section-padding">
      {/* Background Image with Overlay */}
      <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen z-0">
        <Image
          src="https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=1920&q=80"
          alt="Reiki healing energy"
          fill
          className="object-cover opacity-15"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/95 via-background/80 to-background/95" />
      </div>

      {/* Decorative Background Elements */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
         {/* Main Sage Blob */}
         <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.2, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-secondary/30 blur-[120px]"
        />
        {/* Secondary Gold Blob */}
        <motion.div
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 0.15, x: 0 }}
           transition={{ duration: 2, delay: 0.5 }}
           className="absolute top-[15%] right-[8%] w-[500px] h-[500px] rounded-full bg-primary/25 blur-[100px]"
        />
      </div>

      <div className="content-container relative z-10">
        <div className="content-grid">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="col-span-12 md:col-span-8 md:col-start-3 text-center space-y-6 md:space-y-8"
          >
            <span className="inline-block text-secondary uppercase tracking-[0.25em] text-xs md:text-sm mb-2 font-bold bg-secondary/10 px-5 py-2.5 rounded-full backdrop-blur-sm border border-secondary/20">
              Rafaella Kally — Terapeuta Holística
            </span>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif text-foreground mb-6 leading-[1.05] tracking-tight">
              Cura emocional e <br />
              <span className="text-primary italic relative inline-block mt-2">
                conexão espiritual
                <svg className="absolute w-full h-3 -bottom-2 left-0 text-primary/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                  <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                </svg>
              </span>
            </h1>
            
            <p className="text-gray-600 text-lg md:text-xl lg:text-2xl mb-12 leading-relaxed font-light">
              Redescubra a sua harmonia interior através do <span className="font-medium text-foreground">Reiki Kundalini</span> e terapias holísticas integrativas.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-6">
              <Link
                href="/contacto"
                className="inline-flex items-center justify-center bg-primary hover:bg-primary-dark text-white min-w-[220px] h-16 rounded-full text-lg font-semibold transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.02] duration-300 px-8"
              >
                Agendar Consulta
              </Link>
              <Link
                href="/servicos"
                className="inline-flex items-center justify-center border-2 border-secondary/40 bg-white/60 backdrop-blur-sm text-secondary hover:bg-secondary hover:text-white hover:border-secondary min-w-[220px] h-16 rounded-full text-lg font-medium transition-all duration-300 px-8"
              >
                Conhecer Terapias
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
