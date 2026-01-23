"use client";

import { useEffect } from "react";
import Script from "next/script";

/**
 * Tawk.to Live Chat Integration
 * Free live chat widget for instant customer support
 * Sign up at https://www.tawk.to/ to get your property ID
 */
export function LiveChat() {
  useEffect(() => {
    // Initialize Tawk.to when component mounts
    if (typeof window !== "undefined") {
      // @ts-ignore
      window.Tawk_API = window.Tawk_API || {};
      // @ts-ignore
      window.Tawk_LoadStart = new Date();
    }
  }, []);

  return (
    <>
      {/* 
        IMPORTANT: Replace 'YOUR_PROPERTY_ID' and 'YOUR_WIDGET_ID' with your actual IDs from Tawk.to
        1. Sign up at https://www.tawk.to/
        2. Create a property
        3. Get your widget code
        4. Replace the placeholder IDs below
      */}
      <Script
        id="tawk-to-script"
        strategy="lazyOnload"
        dangerouslySetInnerHTML={{
          __html: `
            var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
            (function(){
              var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
              s1.async=true;
              s1.src='https://embed.tawk.to/YOUR_PROPERTY_ID/YOUR_WIDGET_ID';
              s1.charset='UTF-8';
              s1.setAttribute('crossorigin','*');
              s0.parentNode.insertBefore(s1,s0);
            })();
          `,
        }}
      />
    </>
  );
}

/**
 * Alternative: Tidio Live Chat (also free)
 * Uncomment this component if you prefer Tidio
 */
/*
export function TidioChat() {
  return (
    <Script
      id="tidio-chat"
      strategy="lazyOnload"
      src="//code.tidio.co/YOUR_TIDIO_KEY.js"
    />
  );
}
*/
