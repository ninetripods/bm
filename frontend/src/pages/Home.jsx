import React from "react";
import {
  Sparkles, Droplets, Waves, Leaf, Flower,
  Target, HeartPulse, Wind, Sprout,
  AlertTriangle, Phone, Mail, MapPin, Hand, Ban,
  UserCheck, MessageCircle, Sliders, ArrowRight, Check,
} from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { SERVICES, GRAND_PACKAGE, BENEFITS, WHY, CONTACT, IMAGES } from "../lib/i18n";
import BookingForm from "../components/BookingForm";

const ICONS = { Sparkles, Droplets, Waves, Leaf, Flower, Target, HeartPulse, Wind, Sprout };

export default function Home() {
  return (
    <main className="overflow-x-hidden">
      <Hero />
      <Services />
      <Philosophy />
      <Benefits />
      <Promise />
      <Pricing />
      <Booking />
      <Contact />
      <Disclaimer />
    </main>
  );
}

// Dispatch a global event for booking form prefill, then scroll to booking
function startBooking({ service, plan } = {}) {
  window.dispatchEvent(
    new CustomEvent("bm-book", { detail: { service, plan } })
  );
  setTimeout(() => {
    document.getElementById("booking")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, 30);
}

/* ---------- Hero ---------- */
function Hero() {
  const { lang, t } = useLang();
  return (
    <section id="home" className="relative pt-28 pb-20 sm:pt-32 sm:pb-28 lg:pt-36 lg:pb-32 bg-cream-50">
      <div className="absolute inset-0 bg-grain opacity-60 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center relative">
        <div className="lg:col-span-7 animate-fade-up">
          <p data-testid="hero-eyebrow" className="text-xs uppercase tracking-[0.22em] text-sage-500 mb-5">
            {t.hero.eyebrow}
          </p>
          <h1 data-testid="hero-title" className="font-serif text-5xl sm:text-6xl lg:text-7xl leading-[1.05] text-ink-900">
            {t.hero.h1Top} <br />
            <span className="italic text-terracotta-500">{t.hero.h1Mid}</span> <br />
            {t.hero.h1Bot}
          </h1>
          <p data-testid="hero-sub" className="mt-7 text-base sm:text-lg text-ink-700 max-w-xl leading-relaxed">
            {t.hero.sub}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <button
              data-testid="hero-cta-book"
              onClick={() => startBooking()}
              className="px-7 py-3 rounded-full bg-sage-500 hover:bg-sage-600 text-cream-50 font-medium text-sm tracking-wide shadow-soft transition-colors"
            >
              {t.hero.ctaBook}
            </button>
            <a
              data-testid="hero-cta-services"
              href="#services"
              className="px-7 py-3 rounded-full border border-ink-900/15 hover:border-sage-500 hover:text-sage-600 text-ink-900 font-medium text-sm tracking-wide transition-colors"
            >
              {t.hero.ctaServices}
            </a>
          </div>
          <div className="mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-ink-700/80">
            <Badge icon={<Hand className="w-4 h-4" />} text={t.hero.badge1} />
            <Badge icon={<Ban className="w-4 h-4" />} text={t.hero.badge2} />
            <Badge icon={<MapPin className="w-4 h-4" />} text={t.hero.badge3} />
          </div>
        </div>
        <div className="lg:col-span-5 relative">
          <div className="relative aspect-[4/5] rounded-[2.5rem] overflow-hidden shadow-soft">
            <img src={IMAGES.hero} alt="Peaceful newborn" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-tr from-ink-900/10 to-transparent" />
          </div>
          <div className="hidden md:block absolute -bottom-8 -left-10 w-40 h-40 rounded-full overflow-hidden border-8 border-cream-50 shadow-soft">
            <img src={IMAGES.serviceCare} alt="hand" className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:block absolute -top-6 -right-6 bg-cream-50 px-5 py-4 rounded-2xl shadow-soft border border-cream-300">
            <p className="font-serif text-2xl text-ink-900">50–90 <span className="text-base text-ink-700">min</span></p>
            <p className="text-xs text-ink-700/70 uppercase tracking-wider">{t.hero.perSession}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Badge({ icon, text }) {
  return (
    <span className="inline-flex items-center gap-2 text-sm">
      <span className="text-sage-500">{icon}</span> {text}
    </span>
  );
}

/* ---------- Services (intro only, no prices) ---------- */
function Services() {
  const { lang, t } = useLang();
  return (
    <section id="services" className="scroll-mt-24 py-20 sm:py-28 bg-cream-100 border-y border-cream-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead eyebrow={t.sections.servicesEyebrow} title={t.sections.servicesTitle} sub={t.sections.servicesSub} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-14">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.icon] || Sparkles;
            return (
              <article
                key={s.id}
                data-testid={`service-card-${s.id}`}
                className="group bg-cream-50 border border-cream-300 rounded-3xl p-7 sm:p-8 hover:shadow-soft hover:-translate-y-1 transition-all duration-300 flex flex-col"
                style={{ animationDelay: `${i * 80}ms` }}
              >
                <div className="w-12 h-12 rounded-2xl bg-sage-100 text-sage-600 flex items-center justify-center mb-5 group-hover:bg-sage-500 group-hover:text-cream-50 transition-colors">
                  <Icon strokeWidth={1.5} />
                </div>
                <p className="text-xs uppercase tracking-[0.18em] text-terracotta-500 mb-2">{s[lang].tagline}</p>
                <h3 className="font-serif text-2xl text-ink-900 mb-3 leading-tight">{s[lang].name}</h3>
                <p className="text-sm text-ink-700 leading-relaxed">{s[lang].desc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Philosophy / Why ---------- */
function Philosophy() {
  const { lang, t } = useLang();
  return (
    <section id="philosophy" className="scroll-mt-24 py-20 sm:py-28 bg-cream-50">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-12 lg:gap-16 items-start">
        <div className="lg:col-span-5 lg:sticky lg:top-32">
          <SectionHead align="left" eyebrow={t.sections.whyEyebrow} title={t.sections.whyTitle} sub={t.sections.whySub} />
          <div className="mt-8 aspect-[4/3] rounded-3xl overflow-hidden shadow-soft">
            <img src={IMAGES.wellness} alt="wellness" className="w-full h-full object-cover" />
          </div>
        </div>
        <div className="lg:col-span-7 space-y-5">
          {WHY.map((w, i) => (
            <div
              key={i}
              data-testid={`why-card-${i}`}
              className="bg-cream-100 border border-cream-300 rounded-2xl p-6 sm:p-7 hover:border-terracotta-300 transition-colors"
            >
              <div className="flex items-start gap-4">
                <AlertTriangle className="w-5 h-5 text-terracotta-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
                <div>
                  <h4 className="font-serif text-xl text-ink-900 mb-2">{w[lang].title}</h4>
                  <p className="text-sm text-ink-700 leading-relaxed">{w[lang].desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Benefits ---------- */
function Benefits() {
  const { lang, t } = useLang();
  return (
    <section className="py-20 sm:py-28 bg-sage-700 text-cream-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grain opacity-30 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-6 sm:px-10 relative">
        <SectionHead dark eyebrow={t.sections.benefitsEyebrow} title={t.sections.benefitsTitle} />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 gap-6">
          {BENEFITS.map((b, i) => {
            const Icon = ICONS[b.icon];
            return (
              <div
                key={i}
                data-testid={`benefit-${i}`}
                className="bg-sage-600/40 backdrop-blur-sm border border-cream-50/10 rounded-3xl p-7 sm:p-8 hover:bg-sage-600/60 transition-colors"
              >
                <div className="flex items-start gap-5">
                  <div className="w-12 h-12 rounded-2xl bg-cream-50/10 flex items-center justify-center text-terracotta-300">
                    <Icon strokeWidth={1.5} />
                  </div>
                  <div>
                    <h4 className="font-serif text-2xl text-cream-50 mb-3 leading-tight">{b[lang].title}</h4>
                    <p className="text-sm text-cream-100/90 leading-relaxed">{b[lang].desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Promise (1-on-1 tracking) ---------- */
function Promise() {
  const { t } = useLang();
  const icons = [UserCheck, MessageCircle, Sliders];
  return (
    <section data-testid="promise-1on1" className="py-20 sm:py-24 bg-cream-50">
      <div className="max-w-6xl mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
        <div className="lg:col-span-5 relative">
          <div className="aspect-square rounded-[2.5rem] overflow-hidden shadow-soft">
            <img src={IMAGES.motherBaby} alt="mother and baby" className="w-full h-full object-cover" />
          </div>
          <div className="hidden md:flex absolute -bottom-6 -right-6 bg-terracotta-500 text-cream-50 px-6 py-4 rounded-2xl items-center gap-3 shadow-soft">
            <UserCheck className="w-7 h-7" strokeWidth={1.5} />
            <div>
              <p className="font-serif text-xl leading-none">1 : 1</p>
              <p className="text-[10px] uppercase tracking-[0.18em] opacity-80">dedicated</p>
            </div>
          </div>
        </div>
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-[0.22em] text-terracotta-500 mb-4">{t.sections.promiseEyebrow}</p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-ink-900 leading-tight mb-5">
            {t.sections.promiseTitle}
          </h2>
          <p className="text-base sm:text-lg text-ink-700 leading-relaxed mb-7">
            {t.sections.promiseDesc}
          </p>
          <ul className="space-y-3">
            {t.sections.promiseBullets.map((b, i) => {
              const Ic = icons[i] || Check;
              return (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-9 h-9 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center flex-shrink-0">
                    <Ic className="w-4 h-4" strokeWidth={1.5} />
                  </span>
                  <span className="text-ink-900 font-medium leading-relaxed pt-1.5">{b}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */
function Pricing() {
  const { lang, t } = useLang();
  // Cells: 5 services + 1 grand package = 6 grid cells
  return (
    <section id="pricing" className="scroll-mt-24 py-20 sm:py-28 bg-cream-100 border-y border-cream-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <SectionHead eyebrow={t.sections.pricingEyebrow} title={t.sections.pricingTitle} sub={t.sections.pricingSub} />
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s) => (
            <PriceCard key={s.id} s={s} />
          ))}
          <GrandCard />
        </div>
        <p data-testid="pricing-note" className="mt-10 text-sm text-ink-700/80 italic text-center max-w-2xl mx-auto">
          {t.sections.pricingNote}
        </p>
      </div>
    </section>
  );
}

function PriceCard({ s }) {
  const { lang, t } = useLang();
  const residualNote = s.packageNoteEn && (lang === "cn" ? s.packageNoteCn : s.packageNoteEn);
  return (
    <article
      data-testid={`price-${s.id}`}
      className="bg-cream-50 border border-cream-300 rounded-3xl p-7 flex flex-col"
    >
      <p className="text-xs uppercase tracking-[0.18em] text-terracotta-500 mb-2">{s[lang].tagline}</p>
      <h4 className="font-serif text-2xl text-ink-900 leading-tight mb-5 min-h-[3.5rem]">{s[lang].name}</h4>

      <div className="border-t border-cream-300 pt-4 flex items-end justify-between gap-3">
        <div>
          <p className="text-xs uppercase tracking-wider text-ink-700/60">{t.sections.single}</p>
          <p className="font-serif text-3xl text-ink-900 leading-none mt-1">${s.single}</p>
        </div>
        <button
          data-testid={`book-single-${s.id}`}
          onClick={() => startBooking({ service: s.id, plan: "single" })}
          className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-sage-500 hover:bg-sage-600 text-cream-50 text-xs font-medium tracking-wide transition-colors"
        >
          {t.sections.bookThis} <ArrowRight className="w-3 h-3" />
        </button>
      </div>

      {s.package && (
        <div className="border-t border-cream-300 mt-4 pt-4 flex items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-ink-700/60">{t.sections.package}</p>
            <p className="font-serif text-3xl text-terracotta-500 leading-none mt-1">${s.package}</p>
            {residualNote && (
              <p data-testid={`residual-note-${s.id}`} className="text-[11px] mt-1 text-sage-600 italic">
                {residualNote}
              </p>
            )}
          </div>
          <button
            data-testid={`book-package-${s.id}`}
            onClick={() => startBooking({ service: s.id, plan: "package" })}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 text-xs font-medium tracking-wide transition-colors"
          >
            {t.sections.bookThis} <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      )}
    </article>
  );
}

function GrandCard() {
  const { lang, t } = useLang();
  return (
    <article
      data-testid="grand-package"
      className="relative bg-ink-900 text-cream-50 border border-ink-900 rounded-3xl p-7 flex flex-col overflow-hidden"
    >
      <div className="absolute inset-0 bg-grain opacity-20 pointer-events-none" />
      <div className="relative flex-1 flex flex-col">
        <p className="text-xs uppercase tracking-[0.22em] text-terracotta-300 mb-2">{t.sections.grandTitle}</p>
        <h4 className="font-serif text-2xl text-cream-50 leading-tight mb-4 min-h-[3.5rem]">
          {GRAND_PACKAGE[lang].name}
        </h4>
        <ul className="text-xs text-cream-100/80 space-y-1.5 mb-5">
          {GRAND_PACKAGE[lang].items.map((it, i) => (
            <li key={i} className="flex items-center gap-2">
              <Check className="w-3 h-3 text-terracotta-300" strokeWidth={2} />
              {it}
            </li>
          ))}
        </ul>
        <div className="border-t border-cream-50/20 pt-4 mt-auto flex items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-wider text-cream-100/60">4 × 3 sessions</p>
            <p className="font-serif text-4xl text-terracotta-300 leading-none mt-1">${GRAND_PACKAGE.price}</p>
          </div>
          <button
            data-testid="book-grand"
            onClick={() => startBooking({ plan: "grand" })}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 text-xs font-medium tracking-wide transition-colors"
          >
            {t.sections.bookThis} <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
    </article>
  );
}

/* ---------- Booking ---------- */
function Booking() {
  const { t } = useLang();
  return (
    <section id="booking" className="scroll-mt-24 py-20 sm:py-28 bg-cream-50">
      <div className="max-w-4xl mx-auto px-6 sm:px-10">
        <SectionHead eyebrow={t.nav.booking} title={t.sections.bookTitle} sub={t.sections.bookSub} />
        <div className="mt-12">
          <BookingForm />
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function Contact() {
  const { t } = useLang();
  return (
    <section id="contact" className="scroll-mt-24 py-20 sm:py-28 bg-cream-100 border-t border-cream-300">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 grid lg:grid-cols-12 gap-12 items-start">
        <div className="lg:col-span-6">
          <SectionHead align="left" eyebrow={t.nav.contact} title={t.sections.contactTitle} sub={t.sections.contactSub} />
          <ul className="mt-10 space-y-5">
            <ContactItem icon={<Phone strokeWidth={1.5} />} label={t.nav.contact} value={CONTACT.phone} href={`tel:${CONTACT.phoneRaw}`} testid="contact-phone" />
            <ContactItem icon={<Mail strokeWidth={1.5} />} label="Email" value={CONTACT.email} href={`mailto:${CONTACT.email}`} testid="contact-email" />
            <ContactItem icon={<MapPin strokeWidth={1.5} />} label={t.footer.area} value={t.footer.areaValue} testid="contact-area" />
          </ul>
        </div>
        <div className="lg:col-span-6">
          <div className="bg-cream-50 border border-cream-300 rounded-3xl p-8 sm:p-10 text-center">
            <p className="text-xs uppercase tracking-[0.18em] text-terracotta-500 mb-4">WeChat</p>
            <div className="inline-block bg-cream-50 p-4 rounded-2xl shadow-soft">
              <img
                src={CONTACT.wechatQrUrl}
                alt="WeChat QR code"
                data-testid="contact-wechat-qr"
                className="w-56 h-56 sm:w-64 sm:h-64 object-contain"
              />
            </div>
            <p className="mt-5 text-sm text-ink-700">Scan to add us on WeChat · 扫一扫加微信</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function ContactItem({ icon, label, value, href, testid }) {
  const inner = (
    <div className="flex items-center gap-4 group">
      <span className="w-11 h-11 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center group-hover:bg-sage-500 group-hover:text-cream-50 transition-colors">
        {icon}
      </span>
      <div>
        <p className="text-xs uppercase tracking-wider text-ink-700/60">{label}</p>
        <p className="font-serif text-xl text-ink-900">{value}</p>
      </div>
    </div>
  );
  return (
    <li data-testid={testid}>
      {href ? <a href={href} className="block">{inner}</a> : inner}
    </li>
  );
}

/* ---------- Disclaimer ---------- */
function Disclaimer() {
  const { t } = useLang();
  return (
    <section className="bg-cream-200 border-t border-cream-300 py-12">
      <div className="max-w-5xl mx-auto px-6 sm:px-10">
        <div data-testid="disclaimer" className="flex items-start gap-4 text-ink-700">
          <AlertTriangle className="w-6 h-6 text-terracotta-500 flex-shrink-0 mt-1" strokeWidth={1.5} />
          <div>
            <p className="font-serif text-xl text-ink-900 mb-2">{t.disclaimer.title}</p>
            <p className="text-xs sm:text-sm leading-relaxed text-ink-700/90">{t.disclaimer.body}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Reusable section header ---------- */
function SectionHead({ eyebrow, title, sub, align = "center", dark = false }) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  const subCls = dark ? "text-cream-100/80" : "text-ink-700";
  const titleCls = dark ? "text-cream-50" : "text-ink-900";
  const eyeCls = dark ? "text-terracotta-300" : "text-terracotta-500";
  return (
    <div className={`max-w-2xl ${alignCls}`}>
      {eyebrow && <p className={`text-xs uppercase tracking-[0.22em] ${eyeCls} mb-4`}>{eyebrow}</p>}
      <h2 className={`font-serif text-3xl sm:text-4xl lg:text-5xl leading-tight ${titleCls}`}>{title}</h2>
      {sub && <p className={`mt-5 text-base sm:text-lg leading-relaxed ${subCls}`}>{sub}</p>}
    </div>
  );
}
