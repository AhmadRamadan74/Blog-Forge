import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser } from "../context/UserContext";

export default function SearchUsers() {
  const { searchResults, loading, error, searchUsers } = useUser();
  const [query, setQuery] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearched(true);
    await searchUsers(query);
  };

  return (
    <main className="max-w-2xl mx-auto px-6 py-12 animate-fade-up">
      {/* Header */}
      <div className="mb-10">
        <p className="label mb-3">Discover</p>
        <h1 className="font-display text-5xl font-bold text-paper-100">Find authors</h1>
        <div className="mt-6 h-px bg-gradient-to-r from-ink-600/60 via-paper-400/20 to-transparent" />
      </div>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by first name..."
          className="input-field flex-1"
        />
        <button type="submit" disabled={loading || !query.trim()} className="btn-primary">
          {loading ? (
            <span className="w-4 h-4 border border-paper-300/40 border-t-paper-100 rounded-full animate-spin" />
          ) : (
            "Search"
          )}
        </button>
      </form>

      {/* Results */}
      {searched && !loading && (
        <>
          {error && (
            <p className="text-center text-sm font-body text-paper-400/40 py-8">{error}</p>
          )}

          {!error && searchResults.length === 0 && (
            <p className="text-center font-display text-2xl text-paper-400/20 italic py-8">
              No authors found
            </p>
          )}

          {searchResults.length > 0 && (
            <div className="space-y-3 animate-stagger">
              <p className="label mb-4">
                {searchResults.length} result{searchResults.length !== 1 ? "s" : ""}
              </p>
              {searchResults.map((u) => (
                <Link
                  to={`/profile/${u.u_id}`}
                  key={u.u_id}
                  className="card flex items-center gap-4 p-4 hover:border-paper-400/25 transition-all duration-200 group block"
                >
                  <div className="w-10 h-10 rounded-full bg-ink-800 border border-ink-600/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-display text-lg text-ink-400 font-semibold">
                      {u.u_firstName?.[0]?.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-body font-medium text-paper-100 group-hover:text-ink-300 transition-colors">
                      {u.u_firstName} {u.u_middleName} {u.u_lastName}
                    </p>
                    <p className="text-xs font-body text-paper-400/50 truncate">{u.u_email}</p>
                  </div>
                  <span className="text-xs font-mono text-ink-600 group-hover:text-ink-400 transition-colors flex-shrink-0">
                    View &rarr;
                  </span>
                </Link>
              ))}
            </div>
          )}
        </>
      )}
    </main>
  );
}
