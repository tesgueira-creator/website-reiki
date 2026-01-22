"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  name: string;
  text: string;
  rating: number;
  image?: string;
}

export function TestimonialCard({
  name,
  text,
  rating,
  image,
}: TestimonialCardProps) {
  return (
    <motion.div
      className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-border"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Rating */}
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            className={i < rating ? "fill-primary text-primary" : "text-border"}
          />
        ))}
      </div>

      {/* Text */}
      <p className="text-text-secondary mb-6 leading-relaxed text-sm italic">
        &ldquo;{text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        {image && (
          <div className="w-10 h-10 relative rounded-full overflow-hidden">
            <Image src={image} alt={name} fill className="object-cover" />
          </div>
        )}
        <div>
          <p className="font-semibold text-text-main text-sm">{name}</p>
          <p className="text-muted-foreground text-xs">Cliente verificado</p>
        </div>
      </div>
    </motion.div>
  );
}
