"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

interface VideoTestimonialProps {
  videoUrl: string;
  thumbnail: string;
  clientName: string;
  service?: string;
  duration?: string;
}

export function VideoTestimonial({
  videoUrl,
  thumbnail,
  clientName,
  service,
  duration = "2:30",
}: VideoTestimonialProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <motion.div
      className="relative bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {/* Video Player */}
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          src={videoUrl}
          poster={thumbnail}
          className="w-full h-full object-cover"
          onEnded={() => setIsPlaying(false)}
        />

        {/* Play/Pause Overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center cursor-pointer transition-opacity group-hover:bg-black/50">
            <button
              onClick={togglePlay}
              className="w-20 h-20 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-transform hover:scale-110"
              aria-label="Reproduzir vídeo"
            >
              <Play
                className="text-primary ml-1"
                size={36}
                fill="currentColor"
              />
            </button>
          </div>
        )}

        {/* Controls Overlay (visible when playing) */}
        {isPlaying && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="flex items-center justify-between">
              <button
                onClick={togglePlay}
                className="text-white hover:text-primary transition"
                aria-label="Pausar"
              >
                <Pause size={24} />
              </button>

              <button
                onClick={toggleMute}
                className="text-white hover:text-primary transition"
                aria-label={isMuted ? "Ativar som" : "Silenciar"}
              >
                {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
              </button>
            </div>
          </div>
        )}

        {/* Duration badge */}
        <div className="absolute top-4 right-4 bg-black/70 text-white text-sm px-2 py-1 rounded">
          {duration}
        </div>
      </div>

      {/* Client Info */}
      <div className="p-4 text-center">
        <h3 className="font-semibold text-gray-900 dark:text-white">
          {clientName}
        </h3>
        {service && (
          <p className="text-sm text-gray-600 dark:text-gray-400">{service}</p>
        )}
      </div>
    </motion.div>
  );
}

// Grid of video testimonials
export function VideoTestimonialsGrid() {
  // EXEMPLO - Replace with real video testimonials
  const testimonials = [
    {
      videoUrl: "/videos/testimonial-1.mp4",
      thumbnail: "/testimonials/maria-thumbnail.jpg",
      clientName: "(EXEMPLO) Maria S.",
      service: "Reiki Kundalini",
      duration: "2:15",
    },
    {
      videoUrl: "/videos/testimonial-2.mp4",
      thumbnail: "/testimonials/joao-thumbnail.jpg",
      clientName: "(EXEMPLO) João P.",
      service: "Terapia Multidimensional",
      duration: "1:45",
    },
    {
      videoUrl: "/videos/testimonial-3.mp4",
      thumbnail: "/testimonials/ana-thumbnail.jpg",
      clientName: "(EXEMPLO) Ana C.",
      service: "Mesa Radiónica",
      duration: "2:30",
    },
  ];

  return (
    <section className="py-16">
      <div className="content-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 dark:text-white mb-4">
            Histórias Reais de Transformação
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Ouve diretamente dos nossos clientes sobre as suas experiências de
            cura e transformação
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <VideoTestimonial key={index} {...testimonial} />
          ))}
        </div>

        {/* Placeholder message */}
        <div className="mt-12 p-6 bg-primary/5 border-2 border-primary/20 rounded-lg">
          <p className="text-center text-gray-700 dark:text-gray-300">
            <strong>📹 Nota:</strong> Para adicionar vídeos reais, coloca os
            ficheiros na pasta <code>/public/videos/</code> e as miniaturas em{" "}
            <code>/public/testimonials/</code>
          </p>
        </div>
      </div>
    </section>
  );
}
