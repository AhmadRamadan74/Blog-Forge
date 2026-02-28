import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="border-b border-paper-400/10 bg-charcoal-950/80 backdrop-blur-md sticky top-0 z-50 p-2">
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5">
          <span className="font-display text-xl font-bold text-paper-100 tracking-tight">
            Blog<span className="text-ink-400 italic"> -Forge</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          <Link
            to="/"
            className={`px-4 py-1.5 text-sm font-body transition-colors duration-200 ${
              isActive("/")
                ? "text-paper-100"
                : "text-paper-400/60 hover:text-paper-300"
            }`}
          >
            Feed
          </Link>
          {user && (
            <>
              <Link
                to="/write"
                className={`px-4 py-1.5 text-sm font-body transition-colors duration-200 ${
                  isActive("/write")
                    ? "text-paper-100"
                    : "text-paper-400/60 hover:text-paper-300"
                }`}
              >
                Write
              </Link>
              <Link
                to={`/profile/${user.u_id}`}
                className={`px-4 py-1.5 text-sm font-body transition-colors duration-200 ${
                  location.pathname.startsWith("/profile")
                    ? "text-paper-100"
                    : "text-paper-400/60 hover:text-paper-300"
                }`}
              >
                Profile
              </Link>
              <Link
                to="/search"
                className={`px-4 py-1.5 text-sm font-body transition-colors duration-200 ${
                  isActive("/search")
                    ? "text-paper-100"
                    : "text-paper-400/60 hover:text-paper-300"
                }`}
              >
                Search
              </Link>
            </>
          )}
        </nav>

        {/* Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-xs font-mono text-ink-400">
                {user.u_firstName}
              </span>
              <button onClick={handleLogout} className="btn-ghost text-xs">
                Sign out
              </button>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn-ghost text-xs">
                Sign in
              </Link>
              <Link to="/signup" className="btn-primary text-xs">
                Sign up
              </Link>
            </>
          )}
        </div>

        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden text-paper-400 hover:text-paper-100 transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden border-t border-paper-400/10 bg-charcoal-900 px-6 py-4 flex flex-col gap-3">
          <Link to="/" onClick={() => setMenuOpen(false)} className="text-sm text-paper-300 py-1">Feed</Link>
          {user && (
            <>
              <Link to="/write" onClick={() => setMenuOpen(false)} className="text-sm text-paper-300 py-1">Write</Link>
              <Link to={`/profile/${user.u_id}`} onClick={() => setMenuOpen(false)} className="text-sm text-paper-300 py-1">Profile</Link>
              <Link to="/search" onClick={() => setMenuOpen(false)} className="text-sm text-paper-300 py-1">Search</Link>
              <button onClick={handleLogout} className="text-left text-sm text-ink-400 py-1">Sign out</button>
            </>
          )}
          {!user && (
            <div className="flex gap-3 pt-1">
              <Link to="/login" onClick={() => setMenuOpen(false)} className="btn-ghost text-xs">Sign in</Link>
              <Link to="/signup" onClick={() => setMenuOpen(false)} className="btn-primary text-xs">Sign up</Link>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
