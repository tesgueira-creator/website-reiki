"use client";

import { motion } from "framer-motion";
import { Award, Shield, Star, CheckCircle } from "lucide-react";
import Image from "next/image";

interface BadgeProps {
  icon?: React.ReactNode;
  title: string;
  description: string;
  imageSrc?: string;
}

function Badge({ icon, title, description, imageSrc }: BadgeProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
    >
      {imageSrc ? (
        <div className="w-20 h-20 relative mb-4">
          <Image src={imageSrc} alt={title} fill className="object-contain" />
        </div>
      ) : (
        <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-4">
          {icon}
        </div>
      )}
      <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
        {title}
      </h3>
      <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
    </motion.div>
  );
}

export function TrustBadges() {
  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="content-container">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-3">
            Certificações e Garantias
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Profissionalismo reconhecido e credibilidade comprovada
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Badge
            icon={<Award size={28} />}
            title="Reiki Master"
            description="Certificação Internacional em Reiki Kundalini"
          />
          <Badge
            icon={<Shield size={28} />}
            title="Terapeuta Certificada"
            description="Formação em Terapias Holísticas Complementares"
          />
          <Badge
            icon={<Star size={28} />}
            title="Membro Profissional"
            description="Associação Portuguesa de Reiki e Terapias Energéticas"
          />
          <Badge
            icon={<CheckCircle size={28} />}
            title="Garantia de Satisfação"
            description="100% satisfação garantida ou reembolso total"
          />
        </div>

        {/* Additional certifications info */}
        <motion.div
          className="mt-10 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <p className="text-sm text-gray-500 dark:text-gray-400">
            🔒 Todos os dados pessoais protegidos segundo o RGPD (Regulamento
            Geral de Proteção de Dados)
          </p>
        </motion.div>
      </div>
    </section>
  );
}
