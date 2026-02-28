import { createContext, useContext, useState, useCallback } from "react";
import api from "../utils/api";

const BlogContext = createContext(null);

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get("/blog");
      setBlogs(res.data.data || []);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to fetch blogs");
    } finally {
      setLoading(false);
    }
  }, []);

  const createBlog = async ({ title, content, authorId }) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.post("/blog", { title, content, authorId });
      await fetchBlogs();
      return { success: true, data: res.data };
    } catch (err) {
      const msg = err.response?.data?.message || "Failed to create blog";
      setError(msg);
      return { success: false, message: msg };
    } finally {
      setLoading(false);
    }
  };

  return (
    <BlogContext.Provider value={{ blogs, loading, error, fetchBlogs, createBlog }}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const ctx = useContext(BlogContext);
  if (!ctx) throw new Error("useBlog must be used within BlogProvider");
  return ctx;
};
