import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export default function AdminLogin() {
  const { login, user } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (user && typeof user === "object") navigate("/admin");
  }, [user, navigate]);

  const submit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await login(email, password);
      navigate("/admin");
    } catch (err) {
      const d = err.response?.data?.detail;
      setError(typeof d === "string" ? d : "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50 px-6 py-20">
      <div className="w-full max-w-md">
        <Link to="/" className="block text-center mb-10">
          <p className="font-serif text-3xl text-ink-900">Bloommama</p>
          <p className="text-xs uppercase tracking-[0.22em] text-ink-700/60 mt-1">admin</p>
        </Link>
        <form
          onSubmit={submit}
          data-testid="admin-login-form"
          className="bg-cream-100 border border-cream-300 rounded-3xl p-8 sm:p-10 shadow-soft"
        >
          <div className="w-14 h-14 rounded-full bg-sage-100 text-sage-600 flex items-center justify-center mb-6 mx-auto">
            <Lock strokeWidth={1.5} />
          </div>
          <h1 className="font-serif text-3xl text-ink-900 text-center mb-2">Sign in</h1>
          <p className="text-sm text-ink-700 text-center mb-8">Manage your bookings</p>

          <label className="block mb-4">
            <span className="block text-xs uppercase tracking-wider text-ink-700/70 mb-1.5">Email</span>
            <input
              data-testid="admin-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-200"
            />
          </label>
          <label className="block mb-6">
            <span className="block text-xs uppercase tracking-wider text-ink-700/70 mb-1.5">Password</span>
            <input
              data-testid="admin-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-xl border border-cream-300 bg-cream-50 px-4 py-2.5 text-sm outline-none focus:border-sage-400 focus:ring-2 focus:ring-sage-200"
            />
          </label>

          {error && (
            <p data-testid="admin-login-error" className="text-sm text-red-700 bg-red-50 border border-red-200 rounded-xl px-4 py-2 mb-4">
              {error}
            </p>
          )}

          <button
            data-testid="admin-login-submit"
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-full bg-sage-500 hover:bg-sage-600 text-cream-50 font-medium tracking-wide transition-colors disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
        <Link to="/" className="block text-center mt-6 text-sm text-ink-700/70 hover:text-ink-900">
          ← Back to site
        </Link>
      </div>
    </div>
  );
}
