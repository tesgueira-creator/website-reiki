"use client";

import { motion } from "framer-motion";

interface LoadingSkeletonProps {
  className?: string;
}

export function LoadingSkeleton({ className = "" }: LoadingSkeletonProps) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 bg-[length:200%_100%] rounded-lg ${className}`}
    />
  );
}

export function ServiceCardSkeleton() {
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100 bg-white shadow-md">
      <LoadingSkeleton className="h-56 rounded-none" />
      <div className="p-8 space-y-4">
        <LoadingSkeleton className="h-7 w-3/4" />
        <LoadingSkeleton className="h-4 w-full" />
        <LoadingSkeleton className="h-4 w-5/6" />
        <div className="flex justify-between pt-4 border-t border-gray-100">
          <LoadingSkeleton className="h-10 w-20" />
          <LoadingSkeleton className="h-10 w-16" />
        </div>
        <LoadingSkeleton className="h-12 w-full rounded-xl" />
      </div>
    </div>
  );
}

export function TestimonialCardSkeleton() {
  return (
    <div className="bg-white p-8 rounded-2xl border border-gray-100 shadow-md">
      <div className="flex gap-1 mb-5">
        {[...Array(5)].map((_, i) => (
          <LoadingSkeleton key={i} className="w-5 h-5 rounded-full" />
        ))}
      </div>
      <LoadingSkeleton className="h-4 w-full mb-2" />
      <LoadingSkeleton className="h-4 w-full mb-2" />
      <LoadingSkeleton className="h-4 w-3/4 mb-6" />
      <div className="flex items-center gap-4 pt-4 border-t border-gray-100">
        <LoadingSkeleton className="w-14 h-14 rounded-full" />
        <div className="space-y-2">
          <LoadingSkeleton className="h-4 w-24" />
          <LoadingSkeleton className="h-3 w-20" />
        </div>
      </div>
    </div>
  );
}

export function HeroSkeleton() {
  return (
    <div className="min-h-[95vh] flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-3xl">
        <LoadingSkeleton className="h-8 w-48 mx-auto rounded-full" />
        <LoadingSkeleton className="h-16 w-full max-w-2xl mx-auto" />
        <LoadingSkeleton className="h-16 w-3/4 mx-auto" />
        <LoadingSkeleton className="h-6 w-2/3 mx-auto" />
        <div className="flex gap-4 justify-center pt-4">
          <LoadingSkeleton className="h-16 w-48 rounded-full" />
          <LoadingSkeleton className="h-16 w-48 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function PageLoading() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center"
      >
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "linear",
          }}
          className="w-16 h-16 mx-auto mb-4 border-4 border-primary/20 border-t-primary rounded-full"
        />
        <p className="text-text-secondary font-medium">A carregar...</p>
      </motion.div>
    </div>
  );
}

export function SectionLoading() {
  return (
    <div className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <LoadingSkeleton className="h-4 w-24 mx-auto mb-4" />
          <LoadingSkeleton className="h-10 w-64 mx-auto mb-4" />
          <LoadingSkeleton className="h-4 w-96 mx-auto" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(3)].map((_, i) => (
            <ServiceCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
