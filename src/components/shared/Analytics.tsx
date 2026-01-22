"use client";

import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect, Suspense } from "react";

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
  | "scroll_depth";

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
      config?: Record<string, any>
    ) => void;
    dataLayer: unknown[];
  }
}

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : "");
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
  if (!GA_MEASUREMENT_ID) {
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

/**
 * Cookie Consent Banner (GDPR compliance)
 */
export function CookieConsent() {
  // Implementação básica - expandir conforme necessidade
  return null; // Placeholder para implementação futura
}
