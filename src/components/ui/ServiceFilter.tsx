"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Sparkles, Heart, Battery, LayoutGrid } from "lucide-react";

export type FilterOption =
  | "all"
  | "diagnosis"
  | "consciousness"
  | "energy-healing";

interface ServiceFilterProps {
  onFilterChange: (filter: FilterOption) => void;
  activeFilter: FilterOption;
}

const filterOptions = [
  {
    id: "all" as FilterOption,
    label: "Todos os Serviços",
    icon: LayoutGrid,
    description: "Explorar todos",
    emoji: "✨",
    gradient: "from-blue-50 to-indigo-50",
    borderColor: "border-blue-200",
    bgColor: "bg-blue-50",
    accentColor: "text-blue-600",
  },
  {
    id: "diagnosis" as FilterOption,
    label: "Bloqueado / Pesado",
    icon: Sparkles,
    description: "Limpeza Energética",
    emoji: "🔗",
    gradient: "from-purple-50 to-pink-50",
    borderColor: "border-purple-200",
    bgColor: "bg-purple-50",
    accentColor: "text-purple-600",
  },
  {
    id: "consciousness" as FilterOption,
    label: "Triste / Emocional",
    icon: Heart,
    description: "Cura do Coração",
    emoji: "💖",
    gradient: "from-rose-50 to-red-50",
    borderColor: "border-rose-200",
    bgColor: "bg-rose-50",
    accentColor: "text-rose-600",
  },
  {
    id: "energy-healing" as FilterOption,
    label: "Sem Energia / Cansado",
    icon: Battery,
    description: "Reposição Vital",
    emoji: "⚡",
    gradient: "from-amber-50 to-orange-50",
    borderColor: "border-amber-200",
    bgColor: "bg-amber-50",
    accentColor: "text-amber-600",
  },
];

export function ServiceFilter({
  onFilterChange,
  activeFilter,
}: ServiceFilterProps) {
  return (
    <div className="mb-16 space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4"
      >
        <span className="inline-block text-[var(--color-primary)] text-xs tracking-[0.2em] uppercase font-bold bg-[var(--color-primary)]/5 px-4 py-2 rounded-full">
          ✨ Diagnóstico Intuitivo
        </span>
        <h2 className="text-3xl md:text-4xl font-serif text-[var(--color-text-dark)] font-bold">
          Como se sente hoje?
        </h2>
        <p className="text-[var(--color-text-secondary)] font-light max-w-2xl mx-auto text-base leading-relaxed">
          Selecione o seu estado atual para descobrirmos a terapia ideal para si. 
          <br className="hidden sm:block" />
          Cada caminho energético revela transformações profundas.
        </p>
      </motion.div>

      {/* Filter Cards Grid - Modern Design with Sticky on Mobile */}
      <div className="sticky top-20 md:static z-30 bg-white/95 md:bg-transparent backdrop-blur-sm md:backdrop-blur-none py-4 md:py-0 -mx-4 px-4 md:mx-0 md:px-0 shadow-md md:shadow-none">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {filterOptions.map((option, index) => {
          const isActive = activeFilter === option.id;
          const Icon = option.icon;

          return (
            <motion.button
              key={option.id}
              onClick={() => onFilterChange(option.id)}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className={`
                group relative h-44 rounded-2xl overflow-hidden 
                border-2 transition-all duration-300 cursor-pointer
                ${
                  isActive
                    ? "border-[var(--color-primary)] shadow-2xl shadow-[var(--color-primary)]/30 scale-105"
                    : "border-gray-200 hover:border-[var(--color-primary)]/50 shadow-lg hover:shadow-2xl"
                }
              `}
            >
              {/* Background with gradient */}
              <div className={`absolute inset-0 bg-gradient-to-br ${option.gradient}`} />
              
              {/* Animated overlay on hover */}
              <div 
                className={`absolute inset-0 transition-opacity duration-300 ${
                  isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
                style={{
                  background: `linear-gradient(135deg, var(--color-primary)/20 0%, var(--color-primary)/10 100%)`,
                }}
              />

              {/* Floating emoji background */}
              <div className="absolute top-2 right-2 text-4xl opacity-20 group-hover:opacity-30 transition-opacity duration-300">
                {option.emoji}
              </div>

              {/* Content */}
              <div className="relative h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
                {/* Icon */}
                <div className={`
                  p-3 rounded-xl transition-all duration-300
                  ${
                    isActive
                      ? "bg-[var(--color-primary)] text-white shadow-lg"
                      : `${option.bgColor} ${option.accentColor} group-hover:shadow-md`
                  }
                `}>
                  <Icon className="w-6 h-6" strokeWidth={2} />
                </div>

                {/* Label */}
                <div className="space-y-1">
                  <h3 className={`
                    font-serif font-bold text-sm transition-colors duration-300
                    ${
                      isActive
                        ? "text-[var(--color-primary)]"
                        : "text-gray-700 group-hover:text-[var(--color-primary)]"
                    }
                  `}>
                    {option.label}
                  </h3>
                  
                  <p className={`
                    text-xs font-medium transition-colors duration-300
                    ${isActive ? "text-[var(--color-primary)]/70" : "text-gray-500"}
                  `}>
                    {option.description}
                  </p>
                </div>

                {/* Active indicator dot */}
                {isActive && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-3 w-1.5 h-1.5 rounded-full bg-[var(--color-primary)]"
                  />
                )}
              </div>

              {/* Border glow on active */}
              {isActive && (
                <div className="absolute inset-0 rounded-2xl border-2 border-[var(--color-primary)] opacity-20 animate-pulse" />
              )}
            </motion.button>
          );
        })}
        </div>
      </div>

      {/* Optional: Descriptive text below filters */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="text-center"
      >
        <p className="text-sm text-[var(--color-text-secondary)] font-light">
          💫 Explore todas as terapias disponíveis ou navegue pelos seus sintomas atuais
        </p>
      </motion.div>
    </div>
  );
}
