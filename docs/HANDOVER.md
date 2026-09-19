# Delivery notes

## Research and design
IndiaMART confirms 1972, Hyderabad, core products, customization, fabrication and quality-testing functions. A third-party directory gives 1970; primary company information takes precedence. See RESEARCH.md. The design pairs the authentic red logo and real catalogue photography with steel-dark sections, large Manrope typography, a 1972 heritage panel and light product pages. The hero has a restrained user-controlled detail view. No heavy WebGL, animation libraries or scroll hijacking.

## Implemented architecture
Home; filterable product collection; five product detail pages; five-question solution finder; seven-step quote form; honest project-reference empty state; about; contact; resources and three guides; privacy; terms; 404/loading/error states. Metadata, canonical architecture, Open Graph/X text, Organization/Product/Service/Breadcrumb JSON-LD, sitemap and robots. No fake ratings.

## Enquiry operation
Server validation covers fields, consent, body limits, up to three 4 MB files, and signatures for JPG/PNG/WebP/PDF. Same-origin requests, honeypot, durable five-attempts-per-15-minute rate limit using keyed digests, idempotent references, private random R2 keys. No public lead listing or upload download endpoint. Owner reviews data through Sites tools. Successful receipt confirms storage, and states whether business notification happened. Configure an HTTPS webhook for notifications; files are not forwarded, only metadata. A trusted operator retrieves files from private storage. Signature validation is not malware scanning.

## Contact and analytics
Contextual WhatsApp links are implemented but hidden until the direct number is verified. Phone/email are also centralized and blank. IndiaMART is the active contact path. The map shows Hyderabad only, not a guessed workshop pin. `ashoka:analytics` browser custom events expose form start/completion and WhatsApp clicks; no vendor tracking or marketing cookies run by default.

SEO uses the trusted configured runtime `SITE_URL` when available, then the build-time `NEXT_PUBLIC_SITE_URL`. Request headers are not trusted for canonical URLs.

Page/product/project view, phone, brochure and outbound-click event hooks are also included. Only non-sensitive path/category/host metadata is emitted, never enquiry fields or query strings.

## Assets
Company-listed logo, shutter/gate/motor/fabrication photos and company-album exterior. WebP derivatives and self-hosted Manrope (SIL OFL). No stock or AI imagery. Original ownership/reuse rights require confirmation and low source resolution limits fidelity. See ASSETS.md.

## Required before public launch
Confirm direct phone/WhatsApp/email, exact address/hours, service area and final domain; image rights and higher-resolution originals; technical specifications and installation/warranty scope; notification endpoint and enquiry owner; privacy contact/retention policy; approved case studies and client permissions. Complete Safari/Firefox/Edge and production Lighthouse/Core Web Vitals checks.

## Recommended next work
A professional photo shoot, approved project stories, maintained technical sheets and operational WhatsApp/enquiry notifications. CMS and authenticated lead dashboard can follow if needed. These add more value than decorative 3D.
