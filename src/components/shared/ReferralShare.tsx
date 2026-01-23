"use client";

import { MessageCircle, Share2, Mail } from "lucide-react";
import { useState } from "react";

export default function ReferralShare({ shareUrl }: { shareUrl: string }) {
  const shareText =
    "Descobri a Rafaella Kally e as suas sessões de Reiki transformadoras! Experimenta também: ";

  const handleShare = (platform: string) => {
    const urls: Record<string, string> = {
      whatsapp: `https://wa.me/?text=${encodeURIComponent(shareText + shareUrl)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shareUrl
      )}`,
      email: `mailto:?subject=${encodeURIComponent(
        "Experimenta Reiki com a Rafaella Kally"
      )}&body=${encodeURIComponent(shareText + shareUrl)}`,
    };

    window.open(urls[platform], "_blank", "width=600,height=400");
  };

  const [copied, setCopied] = useState(false);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 md:p-12">
      <h2 className="text-2xl md:text-3xl font-serif font-bold text-center text-gray-900 dark:text-white mb-6">
        Começa a Indicar Agora
      </h2>
      <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Escolhe como queres partilhar:</p>

      <div className="space-y-4">
        <button
          onClick={() => handleShare("whatsapp")}
          className="w-full flex items-center justify-center gap-3 bg-[#25D366] hover:bg-[#20ba5a] text-white py-4 px-6 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <MessageCircle size={24} />
          Partilhar via WhatsApp
        </button>

        <button
          onClick={() => handleShare("facebook")}
          className="w-full flex items-center justify-center gap-3 bg-[#1877F2] hover:bg-[#0d65d9] text-white py-4 px-6 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Share2 size={24} />
          Partilhar no Facebook
        </button>

        <button
          onClick={() => handleShare("email")}
          className="w-full flex items-center justify-center gap-3 bg-gray-700 hover:bg-gray-600 text-white py-4 px-6 rounded-lg font-semibold transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
        >
          <Mail size={24} />
          Enviar por Email
        </button>
      </div>

      {/* Copy Link */}
      <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-3 text-center">Ou copia o teu link de referência:</p>
        <div className="flex gap-2">
          <input
            type="text"
            value={shareUrl}
            readOnly
            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-lg text-sm"
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className="px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-lg font-semibold transition-colors"
          >
            {copied ? "Copiado!" : "Copiar"}
          </button>
        </div>
      </div>
    </div>
  );
}
