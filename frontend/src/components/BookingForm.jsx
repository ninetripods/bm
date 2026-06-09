import React, { useState, useEffect } from "react";
import axios from "axios";
import { CheckCircle2 } from "lucide-react";
import { useLang } from "../contexts/LanguageContext";
import { SERVICES } from "../lib/i18n";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;

const initial = {
  name: "",
  phone: "",
  email: "",
  wechat: "",
  service: "",
  package: "single",
  preferred_date: "",
  preferred_time: "",
  suburb: "",
  postpartum_stage: "",
  notes: "",
};

export default function BookingForm() {
  const { lang, t } = useLang();
  const [form, setForm] = useState(initial);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const onPrefill = (e) => {
      const { service, plan } = e.detail || {};
      setForm((f) => ({
        ...f,
        service: service || f.service,
        package: plan || f.package,
      }));
      setSuccess(false);
    };
    window.addEventListener("bm-book", onPrefill);
    return () => window.removeEventListener("bm-book", onPrefill);
  }, []);

  const onChange = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await axios.post("https://formspree.io/f/xaqzjpwz", {
        ...form,
        email: form.email || undefined,
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setSuccess(true);
    } catch (err) {
      const d = err.response?.data?.detail || err.message;
      setError(typeof d === "string" ? d : "Something went wrong. Please call us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div
        data-testid="booking-success"
        className="bg-cream-100 border border-cream-300 rounded-3xl p-10 text-center animate-fade-up"
      >
        <CheckCircle2 className="w-14 h-14 mx-auto text-sage-500 mb-4" strokeWidth={1.5} />
        <h3 className="font-serif text-3xl text-ink-900 mb-3">{t.booking.successTitle}</h3>
        <p className="text-ink-700 max-w-md mx-auto">{t.booking.successDesc}</p>
        <button
          data-testid="booking-new"
          onClick={() => {
            setForm(initial);
            setSuccess(false);
          }}
          className="mt-6 px-6 py-2.5 rounded-full bg-sage-500 hover:bg-sage-600 text-white text-sm font-medium"
        >
          {t.booking.newBooking}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} data-testid="booking-form" className="bg-cream-100/80 border border-cream-300 rounded-3xl p-6 sm:p-10 space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <Field label={t.booking.name} required>
          <input
            data-testid="booking-name"
            required
            value={form.name}
            onChange={onChange("name")}
            className={inputCls}
          />
        </Field>
        <Field label={t.booking.phone} required>
          <input
            data-testid="booking-phone"
            required
            value={form.phone}
            onChange={onChange("phone")}
            className={inputCls}
          />
        </Field>
        <Field label={t.booking.email}>
          <input
            data-testid="booking-email"
            type="email"
            value={form.email}
            onChange={onChange("email")}
            className={inputCls}
          />
        </Field>
        <Field label={t.booking.wechat}>
          <input
            data-testid="booking-wechat"
            value={form.wechat}
            onChange={onChange("wechat")}
            className={inputCls}
          />
        </Field>
        <Field label={t.booking.service} required>
          <select
            data-testid="booking-service"
            required
            value={form.service}
            onChange={onChange("service")}
            className={inputCls}
          >
            <option value="" disabled>—</option>
            {SERVICES.map((s) => (
              <option key={s.id} value={s.id}>
                {s[lang].name}
              </option>
            ))}
          </select>
        </Field>
        <Field label={t.booking.package}>
          <select
            data-testid="booking-package"
            value={form.package}
            onChange={onChange("package")}
            className={inputCls}
          >
            <option value="single">{t.booking.packageSingle}</option>
            <option value="package">{t.booking.packagePackage}</option>
            <option value="grand">{t.booking.packageGrand}</option>
          </select>
        </Field>
        <Field label={t.booking.date}>
          <input
            data-testid="booking-date"
            type="date"
            value={form.preferred_date}
            onChange={onChange("preferred_date")}
            className={inputCls}
          />
        </Field>
        <Field label={t.booking.time}>
          <input
            data-testid="booking-time"
            type="time"
            value={form.preferred_time}
            onChange={onChange("preferred_time")}
            className={inputCls}
          />
        </Field>
        <Field label={t.booking.suburb}>
          <input
            data-testid="booking-suburb"
            value={form.suburb}
            onChange={onChange("suburb")}
            className={inputCls}
          />
        </Field>
        <Field label={t.booking.stage}>
          <input
            data-testid="booking-stage"
            placeholder={t.booking.stagePlaceholder}
            value={form.postpartum_stage}
            onChange={onChange("postpartum_stage")}
            className={inputCls}
          />
        </Field>
      </div>
      <Field label={t.booking.notes}>
        <textarea
          data-testid="booking-notes"
          rows={3}
          value={form.notes}
          onChange={onChange("notes")}
          className={`${inputCls} resize-none`}
        />
      </Field>

      {error && (
        <p data-testid="booking-error" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2">
          {error}
        </p>
      )}

      <button
        data-testid="booking-submit"
        type="submit"
        disabled={submitting}
        className="w-full sm:w-auto px-8 py-3 rounded-full bg-terracotta-500 hover:bg-terracotta-600 text-cream-50 font-medium tracking-wide transition-colors disabled:opacity-50 shadow-soft"
      >
        {submitting ? t.booking.submitting : t.booking.submit}
      </button>
    </form>
  );
}

const inputCls =
  "w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm text-ink-900 outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-200 transition";

function Field({ label, required, children }) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.14em] text-ink-700/80 mb-1.5">
        {label}
        {required && <span className="text-terracotta-500"> *</span>}
      </span>
      {children}
    </label>
  );
}
