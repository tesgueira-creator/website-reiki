"use client";

import { motion } from "framer-motion";
import { Users, Calendar, Award } from "lucide-react";

interface StatProps {
  number: string;
  label: string;
  icon: React.ReactNode;
}

function Stat({ number, label, icon }: StatProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center space-y-2"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-2">
        {icon}
      </div>
      <div className="text-4xl md:text-5xl font-bold text-primary font-serif">
        {number}
      </div>
      <div className="text-gray-600 dark:text-gray-400 font-medium">
        {label}
      </div>
    </motion.div>
  );
}

export function SocialProofBanner() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-800">
      <div className="content-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Transformando Vidas com Reiki
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Confiança construída através de resultados reais e dedicação genuína
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <Stat
            number="500+"
            label="Clientes Felizes"
            icon={<Users size={32} />}
          />
          <Stat
            number="1,000+"
            label="Sessões Realizadas"
            icon={<Calendar size={32} />}
          />
          <Stat
            number="10+"
            label="Anos de Experiência"
            icon={<Award size={32} />}
          />
        </div>

        {/* Additional trust indicators */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            ⭐ Avaliação média de 4.9/5 baseada em mais de 200 avaliações
          </p>
        </motion.div>
      </div>
    </section>
  );
}
