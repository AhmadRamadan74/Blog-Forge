import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { useAuth } from "../context/AuthContext";
import BlogCard from "../components/BlogCard";

export default function Home() {
  const { blogs, loading, error, fetchBlogs } = useBlog();
  const { user } = useAuth();

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Hero Header */}
      <div className="mb-12 animate-fade-up">
        <div className="flex items-end justify-between">
          <div>
            <p className="label mb-3">Latest stories</p>
            <h1 className="font-display text-5xl font-bold text-paper-100 leading-none">
              The Feed
            </h1>
          </div>
          {user && (
            <Link to="/write" className="btn-primary">
              Write a story
            </Link>
          )}
        </div>
        <div className="mt-6 h-px bg-gradient-to-r from-ink-600/60 via-paper-400/20 to-transparent" />
      </div>

      {/* Content */}
      {loading && (
        <div className="flex items-center justify-center py-24">
          <div className="flex items-center gap-3 text-paper-400/40">
            <span className="w-4 h-4 border border-paper-400/20 border-t-ink-500 rounded-full animate-spin" />
            <span className="text-sm font-body">Loading stories...</span>
          </div>
        </div>
      )}

      {error && !loading && (
        <div className="border border-red-500/20 bg-red-500/5 px-5 py-4 text-center">
          <p className="text-sm font-body text-red-400">{error}</p>
        </div>
      )}

      {!loading && !error && blogs.length === 0 && (
        <div className="text-center py-24">
          <p className="font-display text-3xl text-paper-400/20 italic mb-3">
            No stories yet
          </p>
          <p className="text-sm font-body text-paper-400/40">
            Be the first to{" "}
            {user ? (
              <Link to="/write" className="text-ink-400 hover:text-ink-300 underline underline-offset-2">
                write one
              </Link>
            ) : (
              "write one"
            )}
          </p>
        </div>
      )}

      {!loading && blogs.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 animate-stagger">
          {blogs.map((blog, i) => (
            <BlogCard key={blog.b_id ?? i} blog={blog} index={i} />
          ))}
        </div>
      )}
    </main>
  );
}
