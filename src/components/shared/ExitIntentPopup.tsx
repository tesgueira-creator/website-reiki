"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Mail } from "lucide-react";

interface ExitIntentPopupProps {
  title?: string;
  description?: string;
  buttonText?: string;
  leadMagnetTitle?: string;
}

export function ExitIntentPopup({
  title = "Espera! Não vás ainda... 🌟",
  description = "Recebe gratuitamente o nosso guia exclusivo e começa a tua jornada de cura hoje mesmo.",
  buttonText = "Quero Receber o Guia Grátis",
  leadMagnetTitle = "7 Técnicas de Auto-Reiki para Aliviar o Stress",
}: ExitIntentPopupProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    // Check if user has already seen the popup
    const hasSeenPopup = localStorage.getItem("exitIntentPopupSeen");
    if (hasSeenPopup) return;

    let hasTriggered = false;

    const handleMouseLeave = (e: MouseEvent) => {
      // Trigger when mouse leaves top of viewport
      if (e.clientY <= 10 && !hasTriggered) {
        hasTriggered = true;
        setIsVisible(true);
        localStorage.setItem("exitIntentPopupSeen", "true");
      }
    };

    // Add delay before enabling (avoid triggering immediately)
    const timer = setTimeout(() => {
      document.addEventListener("mouseleave", handleMouseLeave);
    }, 5000); // 5 seconds delay

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const handleClose = () => {
    setIsVisible(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // TODO: Integrate with your email marketing service (Resend, Mailchimp, etc.)
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: "exit-intent-popup" }),
      });

      if (response.ok) {
        setIsSuccess(true);
        setTimeout(() => {
          setIsVisible(false);
        }, 3000);
      }
    } catch (error) {
      console.error("Error subscribing:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 bg-black/60 z-[9998] backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Popup */}
          <motion.div
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-lg"
            initial={{ opacity: 0, scale: 0.8, y: -50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: -50 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition z-10"
                aria-label="Fechar"
              >
                <X size={24} />
              </button>

              {/* Content */}
              <div className="p-8 md:p-10">
                {!isSuccess ? (
                  <>
                    {/* Icon */}
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <Gift className="text-primary" size={32} />
                    </div>

                    {/* Title */}
                    <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-gray-900 dark:text-white mb-4">
                      {title}
                    </h2>

                    {/* Description */}
                    <p className="text-center text-gray-600 dark:text-gray-400 mb-6">
                      {description}
                    </p>

                    {/* Lead magnet highlight */}
                    <div className="bg-primary/5 border-2 border-primary/20 rounded-lg p-4 mb-6">
                      <p className="text-center font-semibold text-primary mb-2">
                        📖 {leadMagnetTitle}
                      </p>
                      <p className="text-sm text-center text-gray-600 dark:text-gray-400">
                        Guia prático em PDF enviado diretamente para o teu email
                      </p>
                    </div>

                    {/* Form */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="relative">
                        <Mail
                          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                          size={20}
                        />
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="O teu melhor email"
                          required
                          className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent dark:bg-gray-800 dark:text-white"
                        />
                      </div>
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-primary hover:bg-primary-dark text-white py-3 rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? "A enviar..." : buttonText}
                      </button>
                    </form>

                    {/* Privacy note */}
                    <p className="text-xs text-center text-gray-500 dark:text-gray-400 mt-4">
                      🔒 Respeitamos a tua privacidade. Podes cancelar a
                      subscrição a qualquer momento.
                    </p>
                  </>
                ) : (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg
                        className="w-8 h-8 text-green-600 dark:text-green-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                      Obrigada! 🎉
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      Verifica o teu email. O guia está a caminho!
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
