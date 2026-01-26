"use client";

import { motion } from "framer-motion";

interface SectionTitleProps {
  label?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
}

export function SectionTitle({
  label,
  title,
  subtitle,
  centered = true,
}: SectionTitleProps) {
  return (
    <motion.div
      className={`mb-16 ${centered ? "text-center" : ""}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {label && (
        <p className="text-primary font-semibold tracking-widest text-sm uppercase mb-2 block">
          {label}
        </p>
      )}
      <h2 className="font-serif text-4xl md:text-5xl font-bold text-text-main mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-text-secondary max-w-2xl mx-auto leading-relaxed text-center">
          {subtitle}
        </p>
      )}
      <div
        className={`w-16 h-1 bg-gradient-to-r from-primary to-secondary mt-6 ${centered ? "mx-auto" : ""}`}
      />
    </motion.div>
  );
}
