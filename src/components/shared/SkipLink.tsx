"use client";

/**
 * Skip to main content link for accessibility
 * Allows keyboard users to skip navigation
 */
export function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-6 focus:py-3 focus:bg-primary focus:text-white focus:rounded-lg focus:shadow-xl focus:ring-2 focus:ring-primary-dark focus:ring-offset-2 focus:outline-none transition-all"
    >
      Saltar para o conteúdo principal
    </a>
  );
}
