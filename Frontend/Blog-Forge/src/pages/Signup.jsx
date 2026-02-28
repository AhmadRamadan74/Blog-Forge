import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup, loading, error, setError } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    firstName: "",
    middleName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setError(null);
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    const result = await signup(form);
    if (result.success) {
      setSuccess(true);
      setTimeout(() => navigate("/login"), 1800);
    }
  };

  return (
    <div className="min-h-[calc(100vh-56px)] flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md animate-fade-up">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="label mb-3">Join the community</p>
          <h1 className="font-display text-4xl font-bold text-paper-100">Create account</h1>
          <p className="mt-3 text-sm font-body text-paper-400/60">
            Start sharing your thoughts with the world
          </p>
        </div>

        {success ? (
          <div className="border border-green-500/30 bg-green-500/10 px-5 py-4 text-center">
            <p className="text-sm font-body text-green-400">Account created! Redirecting to login...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="border border-red-500/30 bg-red-500/10 px-4 py-3">
                <p className="text-xs font-body text-red-400">{error}</p>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="label block mb-2">First Name</label>
                <input
                  type="text"
                  name="firstName"
                  value={form.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                  className="input-field"
                />
              </div>
              <div>
                <label className="label block mb-2">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={form.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                  className="input-field"
                />
              </div>
            </div>

            <div>
              <label className="label block mb-2">Middle Name <span className="normal-case text-paper-400/30 not-italic">(optional)</span></label>
              <input
                type="text"
                name="middleName"
                value={form.middleName}
                onChange={handleChange}
                placeholder="Middle"
                className="input-field"
              />
            </div>

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
                placeholder="Min. 8 characters"
                required
                className="input-field"
              />
            </div>

            <div>
              <label className="label block mb-2">Confirm Password</label>
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Repeat password"
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
                  Creating account...
                </>
              ) : (
                "Create account"
              )}
            </button>
          </form>
        )}

        <p className="mt-6 text-center text-xs font-body text-paper-400/50">
          Already have an account?{" "}
          <Link to="/login" className="text-ink-400 hover:text-ink-300 transition-colors">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
