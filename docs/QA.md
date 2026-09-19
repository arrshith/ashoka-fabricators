# QA record — 19 September 2026

Passed: production Worker build; TypeScript check; HTTP status checks of 18 pages plus sitemap/robots (200) and missing route (404); local enquiry tests for cross-origin protection, invalid contact, honeypot, file signatures, successful persistence, notification status, idempotency, reference collision and durable rate limits.

The enquiry integration suite also passed against the compiled Worker on port 8787, with the root .dev.vars injected by scripts/start-worker.mjs. The test retries only Wrangler's explicit “worker restarted mid-request” transport condition, using the same reference/payload. Homepage, quote, product detail and sitemap return 200 from the compiled Worker.

Browser inspected in Codex Chromium: desktop and 390px homepage, no mobile horizontal overflow, images, responsive navigation, product prefill, quote progression and negative-dimension rejection. Reduced-motion CSS disables transitions/smooth scrolling; essential content does not depend on motion/WebGL.

Product-family filtering was exercised successfully. Later extended browser QA was interrupted by the in-app browser reporting ERR_NETWORK_IO_SUSPENDED; no security controls were changed. HTTP and API testing continued independently.

No claim of Safari/Firefox/Edge testing, production Lighthouse scores or real-user Core Web Vitals. Those are pending. Direct phone/WhatsApp and notification delivery require verified business configuration. Original catalogue image quality is limited. Hot reload can emit framework optimizer/multiple-renderer warnings; assess production independently of development timing/warnings.
