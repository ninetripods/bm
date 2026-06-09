# Bloommama Postpartum Care — PRD

## Original Problem Statement
Bilingual (English default + 中文) marketing + booking + admin website for in-home postpartum breast care in Perth.
Services: 产后开奶 (Milk-In), 催奶追奶 (Supply Boosting), 通乳 (Blocked Duct), 回奶 (Weaning), 排残奶 (Residual Clearing).
Pricing: 200/200/220/180/180 single; 500/500/550/450/— packages of 3; grand 5-bundle 1800.
Contact: phone 0451960316, WeChat QR, email bloommama66@gmail.com. Service area: Perth & surrounds.

## Architecture
- **Backend** FastAPI + Motor (MongoDB). JWT auth (PyJWT + bcrypt). Admin seeded from `.env` on startup.
- **Frontend** React 19, React Router 7, Tailwind, shadcn primitives, Framer-Motion ready, lucide-react icons.
- **Bilingual**: `LanguageContext` + `i18n.js` (UI + SERVICES + BENEFITS + WHY). Default `en`, toggle persisted to `localStorage`.
- **Auth**: token stored in `localStorage('bm_admin_token')` and `httpOnly` cookie; both supported.

## User Personas
- **New mother (public)** — wants information, pricing transparency, easy booking, bilingual support.
- **Bloommama practitioner (admin)** — receives, filters, updates status, deletes bookings.

## Core Requirements (Static)
- Bilingual EN/中文, default EN
- Mobile + desktop responsive
- Show 5 services with bilingual descriptions, durations (50–90 min), and prices
- "Why it matters" + 4 core benefits sections
- Transparent pricing + grand combo
- Online booking form → MongoDB
- Admin login + dashboard (list / filter / update status / delete)
- Phone, WeChat QR, email, Perth service area in footer + contact section
- Strong bilingual medical disclaimer

## What's Been Implemented (2026-02)
- Backend `/api/` health, `/api/auth/login`, `/api/auth/me`, `/api/auth/logout`
- Public POST `/api/bookings`
- Admin-protected GET/PATCH/DELETE `/api/bookings`
- Admin user seed on startup from `.env`
- Full marketing site (Hero, Services, Philosophy/Why, Benefits, Pricing, Booking, Contact, Disclaimer, Footer)
- Bilingual toggle (EN ⇄ 中文)
- Admin login page + admin dashboard with filter, inline status update, delete, expand-details
- WeChat QR rendered in contact + footer
- 17/17 backend pytest pass; full frontend Playwright flow pass

## Prioritized Backlog
### P1 — Polish & Trust
- Replace native select/date/time with shadcn Select + Calendar + Popover
- Add testimonials carousel ("Our Mothers' Stories")
- Add "Service Area" map (Leaflet/Mapbox) for Perth suburbs
- Email notification to admin (Resend) on new booking
- WhatsApp / Telegram click-to-chat option

### P2 — Growth
- Multi-step booking wizard (service → date → details)
- Service detail pages (`/services/:id`) with SEO content + JSON-LD LocalBusiness
- Blog / 知识科普 (postpartum care articles, CN/EN) for SEO + trust
- Discount code support for first-time mothers
- Gift voucher purchase (Stripe)

### P3 — Operations
- iCal / Google Calendar sync for confirmed bookings
- SMS reminder 24h before appointment (Twilio)
- Analytics (Plausible) for conversion funnel
