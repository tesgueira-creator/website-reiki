"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Home, ArrowLeft, Search, MessageCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto"
      >
        {/* Ilustração 404 */}
        <div className="mb-8 relative">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[180px] md:text-[240px] font-serif font-bold text-primary/10 leading-none select-none"
          >
            404
          </motion.div>
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="text-6xl">🧘‍♀️</span>
          </motion.div>
        </div>

        {/* Título */}
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-main mb-4">
          Página Não Encontrada
        </h1>

        {/* Descrição */}
        <p className="text-text-secondary text-lg mb-8 max-w-md mx-auto leading-relaxed">
          A energia que procura não está aqui. Talvez esta página tenha seguido
          o seu próprio caminho espiritual, ou o link esteja desalinhado.
        </p>

        {/* Sugestões */}
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-border mb-8">
          <h2 className="font-semibold text-text-main mb-4 flex items-center justify-center gap-2">
            <Search size={18} className="text-primary" />
            O que pode fazer:
          </h2>
          <ul className="text-left text-text-secondary space-y-3 max-w-sm mx-auto">
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              Verificar se o endereço está correto
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              Voltar à página inicial e navegar normalmente
            </li>
            <li className="flex items-start gap-3">
              <span className="text-primary mt-1">✓</span>
              Entrar em contacto se precisar de ajuda
            </li>
          </ul>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <Home size={20} />
            Voltar ao Início
          </Link>
          <Link
            href="/contacto"
            className="inline-flex items-center justify-center gap-2 border-2 border-primary bg-white hover:bg-primary text-primary hover:text-white px-8 py-4 rounded-full font-semibold transition-all"
          >
            <MessageCircle size={20} />
            Contactar
          </Link>
        </div>

        {/* Link voltar */}
        <button
          onClick={() => window.history.back()}
          className="mt-8 inline-flex items-center gap-2 text-text-secondary hover:text-primary transition-colors text-sm"
        >
          <ArrowLeft size={16} />
          Voltar à página anterior
        </button>
      </motion.div>
    </div>
  );
}
