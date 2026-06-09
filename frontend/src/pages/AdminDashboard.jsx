import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { LogOut, RefreshCw, Trash2, Mail, Phone, MessageCircle, Calendar, MapPin, ChevronDown } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { SERVICES } from "../lib/i18n";

const API = `${process.env.REACT_APP_BACKEND_URL}/api`;
const STATUSES = ["pending", "confirmed", "completed", "cancelled"];

const STATUS_STYLE = {
  pending: "bg-amber-100 text-amber-800 border-amber-200",
  confirmed: "bg-sage-100 text-sage-700 border-sage-200",
  completed: "bg-emerald-100 text-emerald-700 border-emerald-200",
  cancelled: "bg-stone-200 text-stone-600 border-stone-300",
};

function serviceLabel(id) {
  const s = SERVICES.find((x) => x.id === id);
  return s ? s.en.name : id;
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    if (user === false) navigate("/admin/login");
  }, [user, navigate]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${API}/bookings`, { withCredentials: true });
      setBookings(data);
    } catch (e) {
      console.error("Failed to load bookings:", e);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (user && typeof user === "object") load();
  }, [user, load]);

  const updateStatus = async (id, status) => {
    try {
      await axios.patch(`${API}/bookings/${id}`, { status }, { withCredentials: true });
      setBookings((bs) => bs.map((b) => (b.id === id ? { ...b, status } : b)));
    } catch (e) {
      console.error("Failed to update booking status:", e);
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this booking?")) return;
    try {
      await axios.delete(`${API}/bookings/${id}`, { withCredentials: true });
      setBookings((bs) => bs.filter((b) => b.id !== id));
    } catch (e) {
      console.error("Failed to delete booking:", e);
    }
  };

  if (!user || typeof user !== "object") {
    return <div className="min-h-screen flex items-center justify-center text-ink-700">Loading…</div>;
  }

  const filtered = filter === "all" ? bookings : bookings.filter((b) => b.status === filter);
  const counts = STATUSES.reduce((acc, s) => ({ ...acc, [s]: bookings.filter((b) => b.status === s).length }), {});

  return (
    <div className="min-h-screen bg-cream-50">
      <header className="border-b border-cream-300 bg-cream-50/80 backdrop-blur-xl sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-baseline gap-2">
            <span className="font-serif text-2xl text-ink-900">Bloommama</span>
            <span className="text-xs uppercase tracking-[0.18em] text-ink-700/60">admin</span>
          </Link>
          <div className="flex items-center gap-3">
            <button
              data-testid="admin-refresh"
              onClick={load}
              className="p-2 rounded-full hover:bg-cream-100 text-ink-700"
              title="Refresh"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
            </button>
            <span className="hidden sm:inline text-sm text-ink-700">{user.email}</span>
            <button
              data-testid="admin-logout"
              onClick={async () => { await logout(); navigate("/admin/login"); }}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full border border-cream-300 hover:border-sage-400 text-sm text-ink-900 transition-colors"
            >
              <LogOut className="w-4 h-4" /> Logout
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 sm:px-10 py-10">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-8">
          <div>
            <p className="text-xs uppercase tracking-[0.22em] text-terracotta-500 mb-2">Bookings</p>
            <h1 className="font-serif text-4xl sm:text-5xl text-ink-900 leading-tight">
              {bookings.length} total request{bookings.length === 1 ? "" : "s"}
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <FilterChip label={`All · ${bookings.length}`} active={filter === "all"} onClick={() => setFilter("all")} testid="filter-all" />
            {STATUSES.map((s) => (
              <FilterChip key={s} label={`${s} · ${counts[s] || 0}`} active={filter === s} onClick={() => setFilter(s)} testid={`filter-${s}`} />
            ))}
          </div>
        </div>

        {loading && filtered.length === 0 ? (
          <div className="bg-cream-100 border border-cream-300 rounded-3xl p-16 text-center text-ink-700">Loading…</div>
        ) : filtered.length === 0 ? (
          <div data-testid="empty-state" className="bg-cream-100 border border-cream-300 rounded-3xl p-16 text-center">
            <p className="font-serif text-2xl text-ink-900 mb-2">No bookings yet</p>
            <p className="text-ink-700">New requests will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((b) => (
              <BookingRow key={b.id} b={b} onStatus={updateStatus} onDelete={remove} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function FilterChip({ label, active, onClick, testid }) {
  return (
    <button
      data-testid={testid}
      onClick={onClick}
      className={`px-4 py-1.5 rounded-full text-sm border capitalize transition-colors ${
        active
          ? "bg-sage-500 border-sage-500 text-cream-50"
          : "bg-cream-100 border-cream-300 text-ink-700 hover:border-sage-400"
      }`}
    >
      {label}
    </button>
  );
}

function BookingRow({ b, onStatus, onDelete }) {
  const [open, setOpen] = useState(false);
  return (
    <article
      data-testid={`booking-${b.id}`}
      className="bg-cream-100 border border-cream-300 rounded-3xl overflow-hidden"
    >
      <div className="p-5 sm:p-6 flex flex-col lg:flex-row lg:items-center gap-4">
        <button
          onClick={() => setOpen((o) => !o)}
          className="flex-1 text-left"
          data-testid={`booking-toggle-${b.id}`}
        >
          <div className="flex items-baseline gap-3 flex-wrap">
            <p className="font-serif text-2xl text-ink-900 leading-tight">{b.name}</p>
            <span className={`text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full border ${STATUS_STYLE[b.status]}`}>
              {b.status}
            </span>
            {b.package && <span className="text-xs text-ink-700/60 uppercase tracking-wider">{b.package}</span>}
          </div>
          <p className="text-sm text-ink-700 mt-1">{serviceLabel(b.service)}</p>
          <div className="flex flex-wrap gap-x-4 gap-y-1 mt-2 text-xs text-ink-700/80">
            <span className="inline-flex items-center gap-1"><Phone className="w-3 h-3" /> {b.phone}</span>
            {b.email && <span className="inline-flex items-center gap-1"><Mail className="w-3 h-3" /> {b.email}</span>}
            {b.wechat && <span className="inline-flex items-center gap-1"><MessageCircle className="w-3 h-3" /> {b.wechat}</span>}
            {(b.preferred_date || b.preferred_time) && (
              <span className="inline-flex items-center gap-1"><Calendar className="w-3 h-3" /> {b.preferred_date} {b.preferred_time}</span>
            )}
            {b.suburb && <span className="inline-flex items-center gap-1"><MapPin className="w-3 h-3" /> {b.suburb}</span>}
          </div>
        </button>
        <div className="flex items-center gap-2 flex-wrap">
          <select
            data-testid={`status-${b.id}`}
            value={b.status}
            onChange={(e) => onStatus(b.id, e.target.value)}
            className="rounded-full border border-cream-300 bg-cream-50 px-3 py-1.5 text-sm capitalize focus:border-sage-400 outline-none"
          >
            {STATUSES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
          <button
            data-testid={`delete-${b.id}`}
            onClick={() => onDelete(b.id)}
            className="p-2 rounded-full text-ink-700/70 hover:bg-red-50 hover:text-red-600 transition-colors"
            title="Delete"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            className="p-2 text-ink-700/60"
            data-testid={`expand-${b.id}`}
          >
            <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
      {open && (
        <div className="border-t border-cream-300 bg-cream-50 px-6 py-5 text-sm text-ink-700 space-y-2">
          {b.postpartum_stage && <p><span className="text-ink-700/60 uppercase text-xs tracking-wider mr-2">Stage</span>{b.postpartum_stage}</p>}
          {b.notes && <p><span className="text-ink-700/60 uppercase text-xs tracking-wider mr-2">Notes</span>{b.notes}</p>}
          <p className="text-xs text-ink-700/60">Received {new Date(b.created_at).toLocaleString()}</p>
        </div>
      )}
    </article>
  );
}
