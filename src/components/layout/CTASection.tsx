"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MessageCircle, Phone } from "lucide-react";
import {
  scheduleCtaClass,
  scheduleSecondaryCtaClass,
} from "@/components/ui/buttonStyles";

export function CTASection() {
  return (
    <section className="bg-gradient-to-br from-primary/10 via-secondary/5 to-primary/5 relative overflow-hidden section-padding">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="content-container content-grid text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="col-span-12 md:col-span-10 md:col-start-2 space-y-6 md:space-y-8"
        >
          <span className="inline-block text-secondary font-semibold tracking-wider text-sm mb-2">
            Próximo Passo
          </span>
          <h2 className="font-serif text-4xl md:text-6xl font-bold text-text-main mb-6">
            Comece a Sua Jornada Hoje
          </h2>
          <p className="text-text-secondary text-lg md:text-xl mb-10 leading-relaxed max-w-2xl mx-auto text-center">
            Está pronto para experienciar transformação, cura e reequilíbrio
            energético? Agende a sua primeira sessão hoje e descubra o poder de
            reconectar-se com a sua essência.
          </p>

          <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-6">
            <Link
              href="/contacto"
              className={`${scheduleCtaClass} text-lg px-10 py-5`}
            >
              <Phone size={20} />
              Agendar Agora
            </Link>
            <a
              href="https://wa.me/351912345678?text=Ol%C3%A1%2C%20gostaria%20de%20saber%20mais%20sobre%20as%20terapias"
              target="_blank"
              rel="noopener noreferrer"
              className={`${scheduleSecondaryCtaClass} text-lg px-10 py-5`}
            >
              <MessageCircle size={20} />
              Falar no WhatsApp
            </a>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Phone size={16} className="text-primary" />
              +351 91 234 5678
            </p>
            <span className="hidden sm:inline text-gray-300">|</span>
            <p className="flex items-center gap-2">
              <MessageCircle size={16} className="text-primary" />
              WhatsApp disponível (09:00 - 18:00)
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
