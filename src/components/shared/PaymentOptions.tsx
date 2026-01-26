"use client";

import { motion } from "framer-motion";
import { CreditCard, Smartphone, Calendar } from "lucide-react";

export function PaymentOptions() {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 border-2 border-primary/20">
      <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4 flex items-center gap-2">
        <span>💳</span> Opções de Pagamento
      </h3>

      <div className="space-y-3">
        <motion.div
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <CreditCard className="text-primary flex-shrink-0" size={20} />
          <span className="text-sm">
            Cartão de Crédito/Débito (Visa, Mastercard)
          </span>
        </motion.div>

        <motion.div
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Smartphone className="text-primary flex-shrink-0" size={20} />
          <span className="text-sm">MBWay (pagamento instantâneo)</span>
        </motion.div>

        <motion.div
          className="flex items-center gap-3 text-gray-700 dark:text-gray-300"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Calendar className="text-primary flex-shrink-0" size={20} />
          <span className="text-sm">
            <strong>Planos de Pagamento:</strong> Divide em 3x sem juros
          </span>
        </motion.div>
      </div>

      <div className="mt-4 pt-4 border-t border-primary/20">
        <p className="text-xs text-gray-600 dark:text-gray-400 flex items-start gap-2">
          <span className="text-green-600 dark:text-green-400 text-lg leading-none">
            ✓
          </span>
          <span>
            Pagamento 100% seguro. Aceita-se pacotes de sessões com desconto
            especial.
          </span>
        </p>
      </div>
    </div>
  );
}
