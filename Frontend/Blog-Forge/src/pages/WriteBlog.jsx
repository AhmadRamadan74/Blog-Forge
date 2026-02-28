import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useBlog } from "../context/BlogContext";
import { useAuth } from "../context/AuthContext";

export default function WriteBlog() {
  const { createBlog, loading, error } = useBlog();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: "", content: "" });

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;
    const result = await createBlog({
      title: form.title,
      content: form.content,
      authorId: user.u_id,
    });
    if (result.success) navigate("/");
  };

  const wordCount = form.content
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return (
    <main className="max-w-2xl mx-auto px-6 py-12 animate-fade-up">
      {/* Header */}
      <div className="mb-10">
        <p className="label mb-3">New story</p>
        <h1 className="font-display text-5xl font-bold text-paper-100">Write</h1>
        <div className="mt-6 h-px bg-gradient-to-r from-ink-600/60 via-paper-400/20 to-transparent" />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="border border-red-500/30 bg-red-500/10 px-4 py-3">
            <p className="text-xs font-body text-red-400">{error}</p>
          </div>
        )}

        <div>
          <label className="label block mb-2">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Your story title..."
            required
            className="input-field font-display text-xl"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="label">Content</label>
            <span className="text-xs font-mono text-paper-400/30">
              {wordCount} {wordCount === 1 ? "word" : "words"}
            </span>
          </div>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            placeholder="Tell your story..."
            required
            rows={16}
            className="input-field resize-none leading-relaxed"
          />
        </div>

        <div className="flex items-center gap-3 pt-2">
          <button
            type="submit"
            disabled={loading || !form.title || !form.content}
            className="btn-primary flex items-center gap-2"
          >
            {loading ? (
              <>
                <span className="w-3.5 h-3.5 border border-paper-300/40 border-t-paper-100 rounded-full animate-spin" />
                Publishing...
              </>
            ) : (
              "Publish story"
            )}
          </button>
          <button
            type="button"
            onClick={() => navigate("/")}
            className="btn-ghost"
          >
            Cancel
          </button>
        </div>
      </form>
    </main>
  );
}
