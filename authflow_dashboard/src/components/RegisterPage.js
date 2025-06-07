import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "./AuthContext";

const COLORS = {
  primary: "#2563eb",
  secondary: "#64748b",
  accent: "#14b8a6",
};

// PUBLIC_INTERFACE
export default function RegisterPage() {
  const { supabase } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    setErr("");
    setMsg("");
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setErr(error.message);
    } else {
      setMsg("Registration successful! Please check your email for verification.");
      setTimeout(() => {
        navigate("/login");
      }, 1400);
    }
  }

  return (
    <div className="max-w-md w-full bg-white rounded shadow-lg p-8 mt-8">
      <h2 className="text-2xl font-bold text-center mb-4" style={{ color: COLORS.primary }}>
        Register for AuthFlow
      </h2>
      <form onSubmit={handleRegister} className="flex flex-col gap-3">
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
          placeholder="Password (min 6 chars)"
          className="border rounded px-3 py-2 focus:outline-none focus:ring"
          value={password}
          minLength={6}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="w-full rounded text-white py-2 font-medium mt-2 transition"
          style={{ backgroundColor: COLORS.primary }}
          disabled={loading}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
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
        Already have an account?{" "}
        <Link to="/login" className="font-medium" style={{ color: COLORS.accent }}>
          Login
        </Link>
      </div>
    </div>
  );
}
