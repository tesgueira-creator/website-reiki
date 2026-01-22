"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Log error para serviço de monitorização (Sentry, etc.)
    console.error("[ERROR BOUNDARY]", {
      message: error.message,
      digest: error.digest,
      stack: error.stack,
    });
  }, [error]);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-xl mx-auto"
      >
        {/* Ícone */}
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="w-24 h-24 mx-auto bg-red-50 rounded-full flex items-center justify-center">
            <AlertTriangle className="w-12 h-12 text-red-500" />
          </div>
        </motion.div>

        {/* Título */}
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-text-main mb-4">
          Algo Correu Mal
        </h1>

        {/* Descrição */}
        <p className="text-text-secondary text-lg mb-6 leading-relaxed">
          Pedimos desculpa pelo inconveniente. Ocorreu um erro inesperado.
          Por favor, tente novamente ou volte à página inicial.
        </p>

        {/* Error digest (para suporte) */}
        {error.digest && (
          <p className="text-xs text-muted-foreground mb-8 font-mono bg-muted px-4 py-2 rounded-lg inline-block">
            Código de erro: {error.digest}
          </p>
        )}

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={reset}
            className="inline-flex items-center justify-center gap-2 bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-semibold transition-all shadow-lg hover:shadow-xl hover:-translate-y-1"
          >
            <RefreshCw size={20} />
            Tentar Novamente
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 border-2 border-gray-200 bg-white hover:bg-gray-50 text-text-main px-8 py-4 rounded-full font-semibold transition-all"
          >
            <Home size={20} />
            Ir para Início
          </Link>
        </div>

        {/* Mensagem de suporte */}
        <p className="mt-8 text-sm text-muted-foreground">
          Se o problema persistir,{" "}
          <Link href="/contacto" className="text-primary hover:underline">
            entre em contacto
          </Link>
          .
        </p>
      </motion.div>
    </div>
  );
}
