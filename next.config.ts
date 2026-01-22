import type { NextConfig } from "next";

// Security headers para produção
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(self), interest-cohort=()",
  },
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'unsafe-eval' 'unsafe-inline' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: blob: https://images.unsplash.com https://*.sanity.io https://www.google-analytics.com",
      "font-src 'self' https://fonts.gstatic.com https://r2cdn.perplexity.ai",
      "connect-src 'self' https://www.google-analytics.com https://*.sanity.io https://api.whatsapp.com",
      "frame-ancestors 'self'",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "),
  },
];

const nextConfig: NextConfig = {
  // Performance optimizations
  poweredByHeader: false,
  compress: true,
  reactStrictMode: true,

  // Experimental features para melhor performance
  experimental: {
    // optimizePackageImports: ["lucide-react", "framer-motion"],
  },

  images: {
    // Formatos modernos para melhor performance
    formats: ["image/avif", "image/webp"],
    // Remote patterns
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
    // Otimização de imagens
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 dias
  },

  // Security headers
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
      // Cache headers para assets estáticos
      {
        source: "/(.*)\\.(ico|png|jpg|jpeg|gif|svg|woff|woff2)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },

  // Redirects (exemplo para URLs antigas)
  async redirects() {
    return [
      // Redirect de URLs antigas para novas (se necessário)
      // {
      //   source: "/old-page",
      //   destination: "/new-page",
      //   permanent: true,
      // },
    ];
  },

  // Allow dev requests from loopback IP
  allowedDevOrigins: ["http://127.0.0.1:3000", "http://localhost:3000"],
};

export default nextConfig;
