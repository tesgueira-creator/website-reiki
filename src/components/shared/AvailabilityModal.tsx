"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, Clock, X, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

interface AvailabilityModalProps {
  serviceId: string;
  serviceName: string;
  serviceDuration: number;
  onClose: () => void;
}

// EXEMPLO - Mock data - replace with actual API call
const mockAvailableSlots = {
  "2026-01-24": ["09:00", "10:30", "14:00", "15:30"],
  "2026-01-25": ["09:00", "11:00", "14:00", "16:00"],
  "2026-01-27": ["10:00", "14:00", "15:30", "17:00"],
  "2026-01-28": ["09:00", "10:30", "14:00"],
  "2026-01-29": ["11:00", "14:00", "15:30", "17:00"],
};

export function AvailabilityModal({
  serviceId,
  serviceName,
  serviceDuration,
  onClose,
}: AvailabilityModalProps) {
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(new Date());

  // Generate next 7 days
  const getNext7Days = () => {
    const days = [];
    const start = new Date(currentWeekStart);

    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const days = getNext7Days();

  const formatDate = (date: Date) => {
    return date.toISOString().split("T")[0];
  };

  const getAvailableSlots = (date: string) => {
    return mockAvailableSlots[date as keyof typeof mockAvailableSlots] || [];
  };

  const handlePrevWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() - 7);
    setCurrentWeekStart(newStart);
    setSelectedDate(null);
  };

  const handleNextWeek = () => {
    const newStart = new Date(currentWeekStart);
    newStart.setDate(newStart.getDate() + 7);
    setCurrentWeekStart(newStart);
    setSelectedDate(null);
  };

  return (
    <AnimatePresence>
      <>
        {/* Backdrop */}
        <motion.div
          className="fixed inset-0 bg-black/60 z-[9998] backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[9999] w-[90%] max-w-2xl max-h-[90vh] overflow-y-auto"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
        >
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl">
            {/* Header */}
            <div className="p-6 border-b border-gray-200 dark:border-gray-700">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition"
                aria-label="Fechar"
              >
                <X size={24} />
              </button>

              <div className="flex items-center gap-3 mb-2">
                <Calendar className="text-primary" size={24} />
                <h2 className="text-2xl font-serif font-bold text-gray-900 dark:text-white">
                  Horários Disponíveis
                </h2>
              </div>
              <p className="text-gray-600 dark:text-gray-400">
                {serviceName} ({serviceDuration} min)
              </p>
            </div>

            {/* Calendar Navigation */}
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={handlePrevWeek}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                  aria-label="Semana anterior"
                >
                  <ChevronLeft size={20} />
                </button>
                <span className="font-semibold text-gray-900 dark:text-white">
                  {days[0].toLocaleDateString("pt-PT", {
                    month: "long",
                    year: "numeric",
                  })}
                </span>
                <button
                  onClick={handleNextWeek}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition"
                  aria-label="Próxima semana"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* Days Grid */}
              <div className="grid grid-cols-7 gap-2 mb-6">
                {days.map((day) => {
                  const dateStr = formatDate(day);
                  const slots = getAvailableSlots(dateStr);
                  const hasSlots = slots.length > 0;
                  const isSelected = selectedDate === dateStr;
                  const dayName = day.toLocaleDateString("pt-PT", {
                    weekday: "short",
                  });
                  const dayNum = day.getDate();

                  return (
                    <button
                      key={dateStr}
                      onClick={() =>
                        hasSlots ? setSelectedDate(dateStr) : null
                      }
                      disabled={!hasSlots}
                      className={`
                        p-3 rounded-lg text-center transition-all
                        ${
                          isSelected
                            ? "bg-primary text-white shadow-lg scale-105"
                            : hasSlots
                              ? "bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-900 dark:text-white"
                              : "bg-gray-50 dark:bg-gray-900 text-gray-400 cursor-not-allowed opacity-50"
                        }
                      `}
                    >
                      <div className="text-xs uppercase">{dayName}</div>
                      <div className="text-lg font-bold">{dayNum}</div>
                      {hasSlots && (
                        <div className="text-xs mt-1">{slots.length} vagas</div>
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Time Slots */}
              {selectedDate && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-4"
                >
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Clock size={18} className="text-primary" />
                    <h3 className="font-semibold">
                      Horários disponíveis para{" "}
                      {new Date(selectedDate).toLocaleDateString("pt-PT", {
                        day: "numeric",
                        month: "long",
                      })}
                    </h3>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {getAvailableSlots(selectedDate).map((time) => (
                      <Link
                        key={time}
                        href={`/agendar?service=${serviceId}&date=${selectedDate}&time=${time}`}
                        className="p-3 text-center bg-primary/10 hover:bg-primary hover:text-white text-primary font-semibold rounded-lg transition-all hover:shadow-lg hover:scale-105"
                      >
                        {time}
                      </Link>
                    ))}
                  </div>

                  <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
                    Clica num horário para continuar com a reserva
                  </p>
                </motion.div>
              )}

              {!selectedDate && (
                <p className="text-center text-gray-500 dark:text-gray-400">
                  Seleciona um dia para ver os horários disponíveis
                </p>
              )}
            </div>

            {/* Footer */}
            <div className="p-6 bg-gray-50 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Não encontras um horário adequado?
                </p>
                <Link
                  href="/contacto"
                  className="text-primary hover:text-primary-dark font-semibold text-sm"
                >
                  Contacta-nos →
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </>
    </AnimatePresence>
  );
}
