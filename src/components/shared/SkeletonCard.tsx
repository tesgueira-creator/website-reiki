"use client";

/**
 * Skeleton Loading Components
 * Provides better perceived performance with animated placeholders
 */

export function SkeletonCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Image skeleton */}
      <div className="w-full h-48 bg-gray-200 dark:bg-gray-700" />

      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />

        {/* Description lines */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>

        {/* Button */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-32" />
      </div>
    </div>
  );
}

export function SkeletonServiceCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden animate-pulse">
      <div className="p-8 space-y-4">
        {/* Icon */}
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full" />

        {/* Title */}
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-2/3" />

        {/* Description */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
        </div>

        {/* Price and duration */}
        <div className="flex items-center justify-between pt-4">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>

        {/* Button */}
        <div className="h-11 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
    </div>
  );
}

export function SkeletonTestimonialCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-pulse">
      {/* Rating stars */}
      <div className="flex gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <div
            key={i}
            className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded"
          />
        ))}
      </div>

      {/* Quote */}
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
      </div>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="space-y-2 flex-1">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-32" />
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-24" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonBlogCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Featured image */}
      <div className="w-full h-56 bg-gray-200 dark:bg-gray-700" />

      <div className="p-6 space-y-4">
        {/* Category badge */}
        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-24" />

        {/* Title */}
        <div className="space-y-2">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-4/5" />
        </div>

        {/* Excerpt */}
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6" />
        </div>

        {/* Meta info */}
        <div className="flex items-center gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-24" />
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonProductCard() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* Product image */}
      <div className="w-full aspect-square bg-gray-200 dark:bg-gray-700" />

      <div className="p-4 space-y-3">
        {/* Title */}
        <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />

        {/* Price */}
        <div className="h-7 bg-gray-200 dark:bg-gray-700 rounded w-24" />

        {/* Rating */}
        <div className="flex gap-1">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-4 h-4 bg-gray-200 dark:bg-gray-700 rounded"
            />
          ))}
        </div>

        {/* Add to cart button */}
        <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded" />
      </div>
    </div>
  );
}

// Grid skeleton for multiple cards
export function SkeletonGrid({
  count = 3,
  type = "card",
}: {
  count?: number;
  type?: "card" | "service" | "testimonial" | "blog" | "product";
}) {
  const SkeletonComponent = {
    card: SkeletonCard,
    service: SkeletonServiceCard,
    testimonial: SkeletonTestimonialCard,
    blog: SkeletonBlogCard,
    product: SkeletonProductCard,
  }[type];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(count)].map((_, i) => (
        <SkeletonComponent key={i} />
      ))}
    </div>
  );
}
