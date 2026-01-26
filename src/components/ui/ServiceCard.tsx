"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, DollarSign, CreditCard } from "lucide-react";
import { useState } from "react";
import { trackCTAClick } from "@/components/shared/Analytics";

interface ServiceCardProps {
  title: string;
  description: string;
  duration: string;
  price: number;
  image?: string;
  slug?: string;
  isPopular?: boolean;
  serviceId?: string;
}

export function ServiceCard({
  title,
  description,
  duration,
  price,
  image,
  slug,
  isPopular,
  serviceId,
}: ServiceCardProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = async () => {
    setIsProcessing(true);

    trackCTAClick("Agendar e Pagar (card)", slug || title);

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          serviceId: serviceId || slug || title,
          serviceName: title,
          price,
          duration,
        }),
      });

      const data = await response.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        throw new Error("URL de checkout não recebida");
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      alert("Erro ao processar pagamento. Tente novamente.");
      setIsProcessing(false);
    }
  };

  return (
    <motion.div
      className={`rounded-2xl overflow-hidden border-2 transition-all group h-full flex flex-col ${
        isPopular
          ? "border-[var(--color-primary)] bg-gradient-to-br from-white via-[var(--color-primary)]/3 to-[var(--color-primary)]/8 shadow-2xl shadow-[var(--color-primary)]/20 ring-1 ring-[var(--color-primary)]/10"
          : "border-gray-100 bg-white shadow-lg hover:shadow-2xl hover:border-[var(--color-primary)]/30"
      }`}
      whileHover={{ y: -20, scale: 1.03 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      {/* Image Banner - Enhanced */}
      <div className="relative h-80 bg-gradient-to-br from-gray-200 to-gray-300 overflow-hidden">
        {image ? (
          <>
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-130 transition-transform duration-700 ease-out"
              priority
            />
            {/* Enhanced gradient overlay with animated shimmer */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-60 group-hover:opacity-70 transition-opacity duration-300" />

            {/* Shine effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-700 opacity-0 group-hover:opacity-100" />
          </>
        ) : (
          <div className="h-full bg-gradient-to-br from-[var(--color-primary)]/20 to-[var(--color-secondary)]/30 flex items-center justify-center flex-col gap-3">
            <span className="text-6xl opacity-30">✨</span>
            <span className="text-sm text-gray-500 font-semibold">
              Imagem em breve
            </span>
          </div>
        )}

        {/* Popular Badge - Enhanced */}
        {isPopular && (
          <motion.div
            initial={{ scale: 0, rotate: -180, y: -20 }}
            animate={{ scale: 1, rotate: 0, y: 0 }}
            transition={{ type: "spring", stiffness: 200, damping: 20 }}
            className="absolute top-4 right-4 bg-gradient-to-br from-[var(--color-primary)] via-[var(--color-primary)] to-[var(--color-primary-dark)] text-white px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase shadow-2xl border border-white/40 backdrop-blur-md flex items-center gap-2 hover:shadow-3xl hover:scale-110 transition-all duration-300"
          >
            <span className="text-lg">⭐</span> Mais Popular
          </motion.div>
        )}

        {/* Session indicator line */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[var(--color-primary)]/0 via-[var(--color-primary)] to-[var(--color-primary)]/0" />
      </div>

      {/* Content Section */}
      <div className="p-8 flex flex-col flex-grow space-y-6">
        {/* Title & Description */}
        <div className="space-y-4 flex-grow">
          <h3 className="font-serif text-2xl font-bold text-[var(--color-text-dark)] leading-tight group-hover:text-[var(--color-primary)] transition-colors duration-300 line-clamp-2">
            {title}
          </h3>
          <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-4 group-hover:line-clamp-6 transition-all duration-300">
            {description}
          </p>
        </div>

        {/* Info Cards - Enhanced */}
        <div className="grid grid-cols-2 gap-4 py-5 border-t border-b border-gray-200 group-hover:border-[var(--color-primary)]/20 transition-colors">
          {/* Duration Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-[var(--color-primary)]/8 group-hover:to-[var(--color-primary)]/3 rounded-xl p-4 transition-all duration-300 text-center border border-gray-100 group-hover:border-[var(--color-primary)]/20"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="w-4 h-4 text-gray-500 group-hover:text-[var(--color-primary)] transition-colors" />
              <span className="text-xs text-gray-600 font-bold tracking-wide uppercase">
                Duração
              </span>
            </div>
            <span className="text-sm font-bold text-gray-800 group-hover:text-[var(--color-primary)] transition-colors">
              {duration}
            </span>
          </motion.div>

          {/* Price Card */}
          <motion.div
            whileHover={{ y: -4 }}
            className="bg-gradient-to-br from-[var(--color-primary)]/15 to-[var(--color-primary)]/5 rounded-xl p-4 transition-all duration-300 text-center border border-[var(--color-primary)]/20 group-hover:from-[var(--color-primary)]/20 group-hover:to-[var(--color-primary)]/10 group-hover:border-[var(--color-primary)]/40"
          >
            <div className="flex items-center justify-center gap-2 mb-2">
              <DollarSign className="w-4 h-4 text-[var(--color-primary)]" />
              <span className="text-xs text-[var(--color-primary)] font-bold tracking-wide uppercase">
                Investimento
              </span>
            </div>
            <span className="font-serif text-2xl font-bold text-[var(--color-primary)]">
              {price}€
            </span>
          </motion.div>
        </div>

        {/* Buttons Row - Info + Payment */}
        <div className="flex flex-col sm:flex-row gap-3 mt-auto">
          {/* Info Button */}
          <Link
            href={slug ? `/servicos/${slug}` : "/servicos"}
            onClick={() => trackCTAClick("Ver Detalhes (card)", slug || title)}
            className="group/btn flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 text-gray-700 hover:text-gray-900 px-5 py-3 rounded-xl text-sm font-semibold tracking-wide transition-all duration-300 shadow-sm hover:shadow-md border border-gray-200 hover:border-gray-300"
          >
            Ver Detalhes
            <ArrowRight
              size={16}
              className="transition-all group-hover/btn:translate-x-1 duration-300"
            />
          </Link>

          {/* Payment Button */}
          <motion.button
            onClick={handlePayment}
            disabled={isProcessing}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-[var(--color-primary)] to-[var(--color-primary-dark)] hover:from-[var(--color-primary-dark)] hover:to-[var(--color-primary)] text-white px-5 py-3 rounded-xl text-sm font-bold tracking-wide transition-all duration-300 shadow-lg hover:shadow-2xl hover:shadow-[var(--color-primary)]/50 border border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isProcessing ? (
              <>
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Processando...
              </>
            ) : (
              <>
                <CreditCard size={16} />
                Agendar e Pagar
              </>
            )}
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
