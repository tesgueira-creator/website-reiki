"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { TrendingUp, Sparkles } from "lucide-react";

interface CaseStudy {
  id: string;
  clientName: string;
  age: string;
  issue: string;
  before: string;
  treatment: string;
  duration: string;
  sessions: number;
  after: string;
  results: string[];
  quote: string;
  image?: string;
}

export default function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <motion.article
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden mb-16"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 to-primary/20 p-8">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-serif font-bold text-gray-900 dark:text-white mb-2">
              {study.clientName}
            </h2>
            <p className="text-gray-700 dark:text-gray-300 text-lg font-semibold">
              {study.issue}
            </p>
            <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
              {study.age} • {study.sessions} sessões • {study.duration}
            </p>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-semibold">
              Caso Real
            </span>
          </div>
        </div>
      </div>

      <div className="p-8 space-y-8">
        {/* Before Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
              <span className="text-red-600 dark:text-red-400">❌</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Antes do Tratamento
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-10">
            {study.before}
          </p>
        </div>

        {/* Treatment Section */}
        <div className="bg-primary/5 border-l-4 border-primary rounded-r-lg p-6">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles className="text-primary" size={20} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Tratamento Aplicado
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300">{study.treatment}</p>
        </div>

        {/* After Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
              <span className="text-green-600 dark:text-green-400">✓</span>
            </div>
            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              Depois do Tratamento
            </h3>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed pl-10">
            {study.after}
          </p>
        </div>

        {/* Results */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="text-primary" size={20} />
            <h3 className="text-lg font-bold text-gray-900 dark:text-white">
              Resultados Mensuráveis
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pl-7">
            {study.results.map((result, index) => (
              <div
                key={index}
                className="flex items-start gap-2 text-gray-700 dark:text-gray-300"
              >
                <span className="text-green-600 dark:text-green-400 text-lg leading-none mt-0.5">
                  ✓
                </span>
                <span className="text-sm">{result}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quote */}
        <blockquote className="text-gray-700 dark:text-gray-300 italic leading-relaxed">
          &ldquo;{study.quote}&rdquo;
        </blockquote>

        {/* Image */}
        {study.image && (
          <div className="relative w-full h-64 rounded-lg overflow-hidden">
            <Image
              src={study.image}
              alt={study.clientName}
              fill
              className="object-cover"
            />
          </div>
        )}
      </div>
    </motion.article>
  );
}
