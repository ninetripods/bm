import React from "react";
import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { CONTACT } from "../lib/i18n";

export default function SiteFooter() {
  const { t } = useLang();
  return (
    <footer data-testid="site-footer" className="bg-ink-900 text-cream-100">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-16 lg:py-20 grid grid-cols-1 md:grid-cols-3 gap-12">
        <div>
          <h3 className="font-serif text-3xl text-cream-50 mb-3">Bloommama</h3>
          <p className="text-sm text-cream-200/80 leading-relaxed max-w-xs">
            {t.tagline}
          </p>
        </div>
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.18em] text-cream-200/60">{t.sections.contactTitle}</p>
          <a href={`tel:${CONTACT.phoneRaw}`} data-testid="footer-phone" className="flex items-center gap-2 text-cream-100 hover:text-terracotta-400 transition-colors">
            <Phone className="w-4 h-4" strokeWidth={1.5} /> {CONTACT.phone}
          </a>
          <a href={`mailto:${CONTACT.email}`} data-testid="footer-email" className="flex items-center gap-2 text-cream-100 hover:text-terracotta-400 transition-colors">
            <Mail className="w-4 h-4" strokeWidth={1.5} /> {CONTACT.email}
          </a>
          <div className="flex items-center gap-2 text-cream-200/80 text-sm">
            <MapPin className="w-4 h-4" strokeWidth={1.5} /> {t.footer.areaValue}
          </div>
          <div className="flex items-center gap-2 text-cream-200/80 text-sm">
            <Clock className="w-4 h-4" strokeWidth={1.5} /> {t.footer.hours}
          </div>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-cream-200/60 mb-3">WeChat</p>
          <div className="inline-block bg-cream-50 p-3 rounded-2xl">
            <img
              src={CONTACT.wechatQrUrl}
              alt="WeChat QR"
              data-testid="footer-wechat-qr"
              className="w-32 h-32 object-contain"
            />
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-cream-200/60">
          <p>© {new Date().getFullYear()} {t.footer.copyright}</p>
          <Link to="/admin/login" data-testid="footer-admin-link" className="hover:text-cream-50 transition-colors">
            {t.nav.admin}
          </Link>
        </div>
      </div>
    </footer>
  );
}
