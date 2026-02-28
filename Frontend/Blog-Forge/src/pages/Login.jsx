import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Login() {
  const { login, loading, error, setError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(form.email, form.password);
    if (result.success) navigate("/");
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-6">
      <div className="w-full max-w-sm animate-fade-up">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="label mb-3">Welcome back</p>
          <h1 className="font-display text-4xl font-bold text-paper-100">Sign in</h1>
          <p className="mt-3 text-sm font-body text-paper-400/60">
            Continue your writing journey
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="border border-red-500/30 bg-red-500/10 px-4 py-3">
              <p className="text-xs font-body text-red-400">{error}</p>
            </div>
          )}

          <div>
            <label className="label block mb-2">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@example.com"
              required
              className="input-field"
            />
          </div>

          <div>
            <label className="label block mb-2">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
              required
              className="input-field"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn-primary w-full mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border border-paper-300/40 border-t-paper-100 rounded-full animate-spin" />
                Signing in...
              </>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="mt-6 text-center text-xs font-body text-paper-400/50">
          No account?{" "}
          <Link to="/signup" className="text-ink-400 hover:text-ink-300 transition-colors">
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}
