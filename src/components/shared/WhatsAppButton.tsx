"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X } from "lucide-react";
import { trackWhatsAppClick } from "@/components/shared/Analytics";

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  showAfterScroll?: number; // Pixels scrollados para aparecer
}

export function WhatsAppFloatingButton({
  phoneNumber = "351912345678",
  message = "Olá, gostaria de saber mais sobre as terapias.",
  showAfterScroll = 300,
}: WhatsAppButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > showAfterScroll);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener("scroll", handleScroll);
  }, [showAfterScroll]);

  // Show tooltip after a delay if user hasn't interacted
  useEffect(() => {
    if (isVisible && !hasInteracted) {
      const timer = setTimeout(() => {
        setShowTooltip(true);
      }, 5000); // 5 segundos

      return () => clearTimeout(timer);
    }
  }, [isVisible, hasInteracted]);

  const handleClick = () => {
    trackWhatsAppClick();
    setHasInteracted(true);
    setShowTooltip(false);

    const encodedMessage = encodeURIComponent(message);
    window.open(
      `https://wa.me/${phoneNumber}?text=${encodedMessage}`,
      "_blank",
      "noopener,noreferrer",
    );
  };

  const dismissTooltip = () => {
    setShowTooltip(false);
    setHasInteracted(true);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          className="fixed bottom-6 right-6 z-50 flex items-end gap-3"
        >
          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, x: 20, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20, scale: 0.9 }}
                className="bg-white rounded-2xl shadow-2xl p-4 max-w-[260px] border border-gray-100 relative"
              >
                <button
                  onClick={dismissTooltip}
                  className="absolute -top-2 -right-2 w-6 h-6 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors"
                  aria-label="Fechar"
                >
                  <X size={14} className="text-gray-600" />
                </button>

                <p className="text-sm text-text-main font-medium mb-1">
                  Precisa de ajuda? 💬
                </p>
                <p className="text-xs text-text-secondary mb-3">
                  Fale diretamente comigo pelo WhatsApp. Respondo rapidamente!
                </p>
                <button
                  onClick={handleClick}
                  className="w-full bg-[#25D366] hover:bg-[#20BD5A] text-white text-sm font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <MessageCircle size={16} />
                  Iniciar Conversa
                </button>

                {/* Arrow pointing to button */}
                <div className="absolute right-[-8px] bottom-6 w-0 h-0 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-white" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* WhatsApp Button */}
          <motion.button
            onClick={handleClick}
            className="group relative w-16 h-16 bg-[#25D366] hover:bg-[#20BD5A] rounded-full shadow-lg hover:shadow-xl flex items-center justify-center transition-all hover:scale-110"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
            aria-label="Contactar via WhatsApp"
          >
            <MessageCircle className="w-8 h-8 text-white" strokeWidth={2} />

            {/* Ping animation */}
            <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-25" />

            {/* Online indicator */}
            <span className="absolute top-0 right-0 w-4 h-4 bg-white rounded-full border-2 border-[#25D366] flex items-center justify-center">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
