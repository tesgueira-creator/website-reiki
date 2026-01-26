"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

// Tipos para eventos de analytics
type AnalyticsEventName =
  | "page_view"
  | "cta_click"
  | "service_view"
  | "contact_form_start"
  | "contact_form_submit"
  | "whatsapp_click"
  | "phone_click"
  | "testimonial_view"
  | "filter_change"
  | "scroll_depth"
  | "booking_step"
  | "checkout_error"
  | "checkout_success"
  | "heatmap_consent";

interface AnalyticsEvent {
  event: AnalyticsEventName;
  category?: string;
  action?: string;
  label?: string;
  value?: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  custom_data?: Record<string, any>;
}

// Declaração global para gtag
declare global {
  interface Window {
    gtag: (
      command: "config" | "event" | "js" | "set",
      targetId: string | Date,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      config?: Record<string, any>,
    ) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;
const CONSENT_STORAGE_KEY = "cookie-consent";

type ConsentState = {
  necessary: true;
  analytics: boolean;
  marketing: boolean;
  updatedAt: string;
};

function readConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;
  const raw = window.localStorage.getItem(CONSENT_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as ConsentState;
  } catch (err) {
    console.warn("Consent parse error", err);
    return null;
  }
}

function persistConsent(consent: ConsentState) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(CONSENT_STORAGE_KEY, JSON.stringify(consent));
  window.dispatchEvent(new CustomEvent("consent-changed", { detail: consent }));
}

/**
 * Track custom events to Google Analytics 4
 */
export function trackEvent({
  event,
  category,
  action,
  label,
  value,
  custom_data,
}: AnalyticsEvent) {
  if (typeof window !== "undefined" && window.gtag && GA_MEASUREMENT_ID) {
    window.gtag("event", event, {
      event_category: category,
      event_action: action,
      event_label: label,
      value: value,
      ...custom_data,
    });
  }
}

/**
 * Track CTA button clicks
 */
export function trackCTAClick(ctaName: string, destination: string) {
  trackEvent({
    event: "cta_click",
    category: "engagement",
    action: "click",
    label: ctaName,
    custom_data: {
      destination,
    },
  });
}

/**
 * Track WhatsApp clicks
 */
export function trackWhatsAppClick() {
  trackEvent({
    event: "whatsapp_click",
    category: "contact",
    action: "click",
    label: "WhatsApp",
  });
}

/**
 * Track phone clicks
 */
export function trackPhoneClick() {
  trackEvent({
    event: "phone_click",
    category: "contact",
    action: "click",
    label: "Phone",
  });
}

/**
 * Track form interactions
 */
export function trackFormStart(formName: string) {
  trackEvent({
    event: "contact_form_start",
    category: "form",
    action: "start",
    label: formName,
  });
}

export function trackFormSubmit(formName: string, success: boolean) {
  trackEvent({
    event: "contact_form_submit",
    category: "form",
    action: success ? "submit_success" : "submit_error",
    label: formName,
  });
}

export function trackBookingStep(
  step: string,
  extra?: Record<string, unknown>,
) {
  trackEvent({
    event: "booking_step",
    category: "booking",
    action: step,
    custom_data: extra,
  });
}

export function trackCheckoutError(stage: string, message?: string) {
  trackEvent({
    event: "checkout_error",
    category: "checkout",
    action: stage,
    label: message,
  });
}

export function trackCheckoutSuccess(data: {
  serviceId?: string;
  serviceName?: string;
  price?: number;
  sessionType?: string;
}) {
  trackEvent({
    event: "checkout_success",
    category: "checkout",
    action: "payment_success",
    label: data.serviceName,
    custom_data: data,
  });
}

/**
 * Track service views
 */
export function trackServiceView(serviceName: string, serviceId: string) {
  trackEvent({
    event: "service_view",
    category: "services",
    action: "view",
    label: serviceName,
    custom_data: {
      service_id: serviceId,
    },
  });
}

/**
 * Component interno que usa useSearchParams
 */
function AnalyticsPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (GA_MEASUREMENT_ID && typeof window !== "undefined" && window.gtag) {
      const url =
        pathname +
        (searchParams?.toString() ? `?${searchParams.toString()}` : "");
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams]);

  return null;
}

/**
 * Google Analytics 4 Provider Component
 * Adicionar ao layout.tsx
 */
export function GoogleAnalytics() {
  const [allowAnalytics, setAllowAnalytics] = useState(() => {
    const consent = readConsent();
    return Boolean(consent?.analytics);
  });

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<ConsentState>).detail;
      if (detail) {
        setAllowAnalytics(Boolean(detail.analytics));
      }
    };

    window.addEventListener("consent-changed", handler);
    return () => window.removeEventListener("consent-changed", handler);
  }, []);

  if (!GA_MEASUREMENT_ID || !allowAnalytics) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <AnalyticsPageTracker />
      </Suspense>
    </>
  );
}

export function ClarityScript() {
  const [enabled, setEnabled] = useState(() => {
    const consent = readConsent();
    return Boolean(consent?.analytics) && Boolean(CLARITY_ID);
  });

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<ConsentState>).detail;
      if (detail && detail.analytics && CLARITY_ID) {
        setEnabled(true);
      } else {
        setEnabled(false);
      }
    };

    window.addEventListener("consent-changed", handler);
    return () => window.removeEventListener("consent-changed", handler);
  }, []);

  if (!enabled || !CLARITY_ID) return null;

  return (
    <Script id="clarity-script" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){
        c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
        t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
        y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
      })(window, document, "clarity", "script", "${CLARITY_ID}");`}
    </Script>
  );
}

/**
 * Cookie Consent Banner (GDPR compliance)
 */
export function CookieConsent() {
  const storedConsent = readConsent();
  const [visible, setVisible] = useState(() => !storedConsent);
  const [analytics, setAnalytics] = useState(
    () => storedConsent?.analytics ?? true,
  );
  const [marketing, setMarketing] = useState(
    () => storedConsent?.marketing ?? false,
  );

  const save = (allowAnalytics: boolean, allowMarketing: boolean) => {
    const consent: ConsentState = {
      necessary: true,
      analytics: allowAnalytics,
      marketing: allowMarketing,
      updatedAt: new Date().toISOString(),
    };

    persistConsent(consent);
    setVisible(false);

    trackEvent({
      event: "heatmap_consent",
      category: "consent",
      action: allowAnalytics ? "accepted" : "rejected",
      custom_data: { analytics: allowAnalytics, marketing: allowMarketing },
    });
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 sm:left-1/2 sm:-translate-x-1/2 z-50 w-auto max-w-4xl shadow-2xl">
      <div className="bg-white text-gray-900 border-2 border-primary/30 rounded-2xl p-8 sm:p-10 flex flex-col gap-6">
        <div className="space-y-4 flex-1">
          <p className="text-base sm:text-lg font-bold text-gray-900">
            🍪 Utilizamos Cookies para Melhorar a Sua Experiência
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
            Usamos cookies essenciais para o site funcionar e analíticos para
            medir performance. Pode aceitar todos ou recusar analíticos. Leia a
            nossa{" "}
            <a
              href="/politica-privacidade#cookies"
              className="text-primary underline font-semibold hover:text-primary-dark transition"
            >
              Política de Privacidade e Cookies
            </a>
            .
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 text-sm text-gray-700 pt-2">
            <label className="flex items-center gap-3 cursor-pointer hover:text-primary transition">
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary cursor-pointer"
                checked
                readOnly
              />
              <span className="font-medium">Necessários ✓</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer hover:text-primary transition">
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary cursor-pointer"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
              />
              <span className="font-medium">Analíticos</span>
            </label>
            <label className="flex items-center gap-3 cursor-pointer hover:text-primary transition">
              <input
                type="checkbox"
                className="w-5 h-5 accent-primary cursor-pointer"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
              />
              <span className="font-medium">Marketing</span>
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 w-full">
          <button
            type="button"
            onClick={() => save(false, false)}
            className="flex-1 px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 font-bold text-base hover:bg-gray-100 hover:border-gray-400 transition"
          >
            ❌ Recusar Analíticos
          </button>
          <button
            type="button"
            onClick={() => save(analytics, marketing)}
            className="flex-1 px-6 py-3 rounded-xl bg-primary text-white font-bold text-base shadow-lg hover:bg-primary-dark hover:shadow-xl transition transform hover:scale-105"
          >
            💾 Guardar Preferências
          </button>
          <button
            type="button"
            onClick={() => save(true, true)}
            className="flex-1 px-6 py-3 rounded-xl bg-green-600 text-white font-bold text-base shadow-lg hover:bg-green-700 hover:shadow-xl transition transform hover:scale-105"
          >
            ✅ Aceitar Todos
          </button>
        </div>
      </div>
    </div>
  );
}
