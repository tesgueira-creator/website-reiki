"use client";

import { motion } from "framer-motion";
import { Heart, Sparkles, Shield, Lightbulb } from "lucide-react";

const values = [
  {
    icon: Heart,
    title: "Compaixão",
    description:
      "Cada sessão é envolvida em amor e compreensão genuína pelo seu bem-estar.",
  },
  {
    icon: Sparkles,
    title: "Espiritualidade",
    description:
      "Conexão profunda com a energia universal e a sabedoria ancestral.",
  },
  {
    icon: Shield,
    title: "Segurança",
    description:
      "Um espaço sagrado e seguro para a sua jornada de transformação.",
  },
  {
    icon: Lightbulb,
    title: "Evolução",
    description:
      "Suporte contínuo para o seu crescimento pessoal e espiritual.",
  },
];

export function ValuesSection() {
  return (
    <section className="bg-[var(--color-background)] relative overflow-hidden section-padding">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)', backgroundSize: '40px 40px'}}></div>

      <div className="content-container content-grid relative z-10">
        <motion.div
          className="col-span-12 md:col-span-10 md:col-start-2 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="flex justify-center mb-4">
              <span className="inline-block h-px w-16 bg-primary/50 self-center mr-4"></span>
                <p className="text-primary font-semibold tracking-[0.2em] text-xs uppercase">
                    Meus Pilares
                </p>
               <span className="inline-block h-px w-16 bg-primary/50 self-center ml-4"></span>
          </div>
          
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-main mb-6">
            Valores & Filosofia
          </h2>
          <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed text-lg font-light">
            Os princípios sagrados que guiam cada momento da minha prática terapêutica
          </p>
        </motion.div>

        <div className="col-span-12 grid grid-cols-12 gap-6">
          {values.map((value, index) => {
            const Icon = value.icon;
            return (
              <motion.div
                key={value.title}
                className="col-span-12 md:col-span-6 lg:col-span-3 flex flex-col items-center text-center group cursor-default"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white border border-primary/20 mb-6 shadow-sm group-hover:shadow-md group-hover:border-primary/50 transition-all duration-300"
                  whileHover={{ scale: 1.05 }}
                >
                   <div className="absolute inset-0 bg-primary/5 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 ease-out" />
                  <Icon className="text-primary relative z-10" size={32} strokeWidth={1.5} />
                </motion.div>
                
                <h3 className="font-serif text-xl font-bold text-text-main mb-3 relative inline-block">
                  {value.title}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full opacity-50"></span>
                </h3>
                
                <p className="text-text-secondary text-sm leading-relaxed max-w-[250px] mx-auto opacity-80 group-hover:opacity-100 transition-opacity">
                  {value.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
