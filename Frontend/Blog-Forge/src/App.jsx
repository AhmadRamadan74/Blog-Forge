import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { BlogProvider } from "./context/BlogContext";
import { UserProvider } from "./context/UserContext";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import WriteBlog from "./pages/WriteBlog";
import Profile from "./pages/Profile";
import SearchUsers from "./pages/SearchUsers";

export default function App() {
  return (
    <AuthProvider>
      <BlogProvider>
        <UserProvider>
          <BrowserRouter>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/signup" element={<Signup />} />
                  <Route
                    path="/write"
                    element={
                      <ProtectedRoute>
                        <WriteBlog />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile/:id"
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/search"
                    element={
                      <ProtectedRoute>
                        <SearchUsers />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>



              <footer className="border-t border-paper-400/10 py-6 mt-12">
                <div className="max-w-5xl mx-auto px-6 flex items-center justify-between">
                  <span className="font-display text-sm italic text-paper-400/30">
                    Blog-Forge
                  </span>
                  <span className="text-xs font-mono text-paper-400/20">
                    {new Date().getFullYear()}
                  </span>
                </div>
              </footer>
            </div>
          </BrowserRouter>
        </UserProvider>
      </BlogProvider>
    </AuthProvider>
  );
}
