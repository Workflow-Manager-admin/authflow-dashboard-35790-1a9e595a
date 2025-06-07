import React, { useState } from "react";
import { useNavigate, Link, useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext";

const COLORS = {
  primary: "#2563eb",
  secondary: "#64748b",
  accent: "#14b8a6",
};

export default function LoginPage() {
  const { supabase } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  async function handleEmailLogin(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    setMsg("");
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setErr(error.message);
    } else {
      setMsg("Login successful!");
      // Optionally redirect to dashboard or intended route
      navigate((location.state && location.state.from?.pathname) || "/dashboard", { replace: true });
    }
  }

  async function handleGoogleLogin() {
    setLoading(true);
    setErr("");
    setMsg("");
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google"
    });
    setLoading(false);
    if (error) setErr(error.message);
    // Supabase will handle redirect on successful OAuth
  }

  return (
    <div className="max-w-md w-full bg-white rounded shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold text-center mb-4" style={{ color: COLORS.primary }}>
        Sign in to AuthFlow
      </h2>
      <form onSubmit={handleEmailLogin} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          className="border rounded px-3 py-2 focus:outline-none focus:ring"
          value={email}
          required
          autoFocus
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border rounded px-3 py-2 focus:outline-none focus:ring"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full rounded text-white py-2 font-medium mt-2 transition"
          style={{ backgroundColor: COLORS.primary }}
          disabled={loading}
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
      <button
        className="w-full mt-4 rounded text-white py-2 font-medium flex items-center justify-center gap-2 transition"
        style={{ backgroundColor: COLORS.accent }}
        onClick={handleGoogleLogin}
        disabled={loading}
      >
        <span>
          <svg width="20" height="20" viewBox="0 0 256 262" xmlns="http://www.w3.org/2000/svg"><g><path d="M255.96 133.317c0-10.523-.957-20.587-2.732-30.04H130.74v56.816h70.182c-3.032 16.279-12.188 30.082-25.945 39.357v32.429h41.96c24.541-22.611 38.708-55.943 38.708-98.562" fill="#4285F4"/><path d="M130.74 262c34.86 0 64.145-11.544 85.527-31.38l-41.96-32.43c-11.646 7.787-26.536 12.406-43.568 12.406-33.485 0-61.849-22.619-72.062-53.012H13.378v33.424C34.704 234.432 79.504 262 130.74 262" fill="#34A853"/><path d="M58.677 157.582c-5.201-15.52-5.201-32.047 0-47.567V76.591H13.378c-15.839 31.628-15.839 67.173 0 98.801l45.3-34.81" fill="#FBBC05"/><path d="M130.74 51.628c18.98-.288 37.185 6.91 50.964 20.205l38.094-38.094C194.875 12.237 164.053-.169 130.74 0c-51.235 0-96.035 27.568-117.362 67.278l45.3 34.81c10.134-30.393 38.499-53.012 72.062-53.012" fill="#EA4335"/></g></svg>
        </span>
        Sign in with Google
      </button>
      {err && (
        <div className="bg-red-100 border border-red-200 text-red-700 rounded p-2 mt-3">
          {err}
        </div>
      )}
      {msg && (
        <div className="bg-green-100 border border-green-200 text-green-700 rounded p-2 mt-3">
          {msg}
        </div>
      )}
      <div className="mt-6 text-sm text-right">
        Don't have an account?{" "}
        <Link to="/register" className="font-medium" style={{ color: COLORS.accent }}>
          Register
        </Link>
      </div>
    </div>
  );
}
