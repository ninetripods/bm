import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, Phone } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { CONTACT } from "../lib/i18n";

const SECTIONS = ["services", "philosophy", "pricing", "booking", "contact"];

export default function SiteHeader() {
  const { lang, toggle, t } = useLang();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const goToSection = (id) => {
    setOpen(false);
    if (location.pathname !== "/") {
      navigate(`/#${id}`);
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 50);
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <header
      data-testid="site-header"
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-cream-50/80 border-b border-cream-300/60"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
        <Link to="/" data-testid="brand-link" className="flex items-baseline gap-2 group">
          <span className="font-serif text-2xl sm:text-3xl text-ink-900 tracking-tight">
            Bloommama
          </span>
          <span className="hidden sm:inline text-xs uppercase tracking-[0.18em] text-ink-700/70">
            postpartum
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {SECTIONS.map((s) => (
            <button
              key={s}
              data-testid={`nav-${s}`}
              onClick={() => goToSection(s)}
              className="px-4 py-2 text-sm text-ink-700 hover:text-sage-600 transition-colors"
            >
              {t.nav[s]}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            data-testid="header-phone"
            href={`tel:${CONTACT.phoneRaw}`}
            className="hidden md:inline-flex items-center gap-2 text-sm text-ink-900 hover:text-sage-600 transition-colors"
          >
            <Phone className="w-4 h-4" strokeWidth={1.5} />
            {CONTACT.phone}
          </a>
          <button
            data-testid="lang-toggle"
            onClick={toggle}
            className="px-3 py-1.5 rounded-full border border-cream-300 text-sm hover:bg-cream-100 transition-colors font-medium"
            aria-label="Toggle language"
          >
            {lang === "en" ? "中文" : "EN"}
          </button>
          <button
            data-testid="cta-book-header"
            onClick={() => goToSection("booking")}
            className="hidden sm:inline-flex items-center px-5 py-2 rounded-full bg-sage-500 hover:bg-sage-600 text-white text-sm font-medium transition-colors shadow-soft"
          >
            {t.nav.booking}
          </button>
          <button
            data-testid="mobile-menu-toggle"
            className="lg:hidden p-2 text-ink-900"
            onClick={() => setOpen((o) => !o)}
            aria-label="Menu"
          >
            {open ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {open && (
        <div
          data-testid="mobile-menu"
          className="lg:hidden bg-cream-50 border-t border-cream-300/80 px-6 py-5 space-y-2 animate-fade-up"
        >
          {SECTIONS.map((s) => (
            <button
              key={s}
              data-testid={`mobile-nav-${s}`}
              onClick={() => goToSection(s)}
              className="block w-full text-left py-2 text-base text-ink-900"
            >
              {t.nav[s]}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
