"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

interface GoogleReviewsProps {
  placeId?: string;
  maxReviews?: number;
}

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  id?: string;
}

export function GoogleReviews({
  placeId = "YOUR_GOOGLE_PLACE_ID",
  maxReviews = 5,
}: GoogleReviewsProps) {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Implement Google Places API integration
    // EXEMPLO - For now, using mock data
    const mockReviews: GoogleReview[] = [
      {
        author_name: "(EXEMPLO) Maria Santos",
        rating: 5,
        text: "Experiência transformadora! A Rafaella é uma terapeuta incrível e muito profissional. Recomendo vivamente!",
        time: 1704067200,
      },
      {
        author_name: "(EXEMPLO) João Silva",
        rating: 5,
        text: "As sessões de Reiki mudaram a minha vida. Sinto-me muito mais equilibrado e em paz. Obrigado!",
        time: 1703462400,
      },
      {
        author_name: "(EXEMPLO) Ana Costa",
        rating: 5,
        text: "Profissional extremamente dedicada. O espaço é acolhedor e as terapias realmente funcionam.",
        time: 1702857600,
      },
    ];

    // Simulate API call
    setTimeout(() => {
      setReviews(mockReviews);
      setLoading(false);
    }, 500);
  }, [placeId]);

  if (loading) {
    return (
      <div className="animate-pulse space-y-4">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="bg-gray-200 dark:bg-gray-700 h-32 rounded-lg"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
          Avaliações do Google
        </h3>
        <a
          href="https://g.page/r/YOUR_GOOGLE_REVIEW_LINK/review"
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:text-primary-dark font-semibold text-sm"
        >
          Deixar avaliação →
        </a>
      </div>

      {reviews.slice(0, maxReviews).map((review, index) => (
        <motion.div
          key={index}
          className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center font-bold text-primary">
              {review.author_name.charAt(0)}
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 dark:text-white">
                {review.author_name}
              </h4>
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className={
                      i < review.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300 dark:text-gray-600"
                    }
                  />
                ))}
              </div>
            </div>
          </div>
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
            {review.text}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
            {new Date(review.time * 1000).toLocaleDateString("pt-PT", {
              year: "numeric",
              month: "long",
            })}
          </p>
        </motion.div>
      ))}

      {/* Setup Instructions */}
      <div className="mt-8 p-6 bg-primary/5 border-2 border-primary/20 rounded-lg">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          <strong>🔧 Configuração necessária:</strong> Para mostrar avaliações
          reais do Google, precisas de:
        </p>
        <ol className="text-sm text-gray-600 dark:text-gray-400 mt-3 space-y-2 ml-4 list-decimal">
          <li>Criar uma API Key no Google Cloud Console</li>
          <li>Ativar a Google Places API</li>
          <li>
            Substituir <code>YOUR_GOOGLE_PLACE_ID</code> pelo ID real
          </li>
          <li>
            Implementar a chamada à API em <code>/api/google-reviews</code>
          </li>
        </ol>
      </div>
    </div>
  );
}
