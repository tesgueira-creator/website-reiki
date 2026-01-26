import type { Metadata, Viewport } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import "./globals.css";
import { SkipLink } from "@/components/shared/SkipLink";
import {
  GoogleAnalytics,
  CookieConsent,
  ClarityScript,
} from "@/components/shared/Analytics";
import { JsonLdMultiple } from "@/components/shared/JsonLd";
import { LiveChat } from "@/components/shared/LiveChat";
import { ExitIntentPopup } from "@/components/shared/ExitIntentPopup";
import {
  generateBaseMetadata,
  generateLocalBusinessSchema,
  generatePersonSchema,
} from "@/lib/metadata";
import { Providers } from "./providers";

// Fontes otimizadas com next/font (substituem importação CSS externa)
const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
  weight: ["400", "500", "600", "700", "800", "900"],
  fallback: ["Georgia", "serif"],
  preload: true,
});

const montserrat = Montserrat({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  fallback: ["system-ui", "Arial", "sans-serif"],
  preload: true,
});

// Metadata base (SEO otimizado)
export const metadata: Metadata = generateBaseMetadata();

// Viewport separado (Next.js 14+)
export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#C5A059" },
    { media: "(prefers-color-scheme: dark)", color: "#C5A059" },
  ],
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Schema.org JSON-LD para SEO
  const schemas = [generateLocalBusinessSchema(), generatePersonSchema()];

  return (
    <html
      lang="pt-PT"
      className={`${playfairDisplay.variable} ${montserrat.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Preconnect para recursos externos críticos */}
        <link rel="preconnect" href="https://images.unsplash.com" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />

        {/* Favicon e ícones */}
        <link rel="icon" href="/favicon.ico" sizes="32x32" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* Schema.org JSON-LD */}
        <JsonLdMultiple schemas={schemas} />
      </head>
      <body
        className="antialiased bg-background text-foreground font-sans min-h-screen"
        suppressHydrationWarning
      >
        {/* Skip Link para acessibilidade */}
        <SkipLink />

        {/* Conteúdo principal */}
        <Providers>
          <div id="main-content">{children}</div>
        </Providers>

        {/* Consent + Analytics/Heatmap (carregam apenas após consentimento) */}
        <CookieConsent />
        <GoogleAnalytics />
        <ClarityScript />

        {/* Live Chat Widget */}
        <LiveChat />

        {/* Exit Intent Popup for Email Capture */}
        <ExitIntentPopup />
      </body>
    </html>
  );
}
