export default function BlogCard({ blog, index = 0 }) {
  const colors = [
    "from-ink-900/40 to-transparent",
    "from-charcoal-900 to-charcoal-800",
  ];

  return (
    <article
      className="card group cursor-pointer hover:border-paper-400/25 transition-all duration-300"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      <div className="p-6">
        {/* Meta */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-7 h-7 rounded-full bg-ink-800 border border-ink-600/40 flex items-center justify-center">
            <span className="text-xs font-mono text-ink-400 font-medium">
              {blog.u_firstName?.[0]?.toUpperCase() || "?"}
            </span>
          </div>
          <span className="text-xs font-body text-paper-400/60">{blog.u_firstName || "Unknown"}</span>
          {blog.b_created_at && (
            <>
              <span className="text-paper-400/20 text-xs">·</span>
              <span className="text-xs font-mono text-paper-400/40">
                {new Date(blog.b_created_at).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </>
          )}
        </div>

        {/* Title */}
        <h2 className="font-display text-xl font-semibold text-paper-100 leading-snug mb-3 group-hover:text-ink-300 transition-colors duration-200">
          {blog.b_title}
        </h2>

        {/* Content Preview */}
        <p className="text-sm font-body text-paper-400/60 leading-relaxed line-clamp-3">
          {blog.b_content}
        </p>

        {/* Footer */}
        <div className="mt-5 pt-4 border-t border-paper-400/10 flex items-center justify-between">
          <span className="label">Article</span>
          <span className="text-xs font-mono text-ink-500 group-hover:text-ink-400 transition-colors">
            Read &rarr;
          </span>
        </div>
      </div>
    </article>
  );
}
