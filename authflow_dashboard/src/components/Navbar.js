import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

// Custom palette
const COLORS = {
  primary: "#2563eb",
  secondary: "#64748b",
  accent: "#14b8a6",
};

export default function Navbar() {
  const { user, supabase } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate("/login");
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 shadow bg-white border-b border-gray-100">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center font-bold text-xl gap-2" style={{ color: COLORS.primary }}>
            <span className="inline-block rounded bg-[var(--accent)] mr-1" style={{
              width: "1.3rem",
              height: "1.3rem",
              backgroundColor: COLORS.accent,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center"
            }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 20 20"><circle cx="10" cy="10" r="8" fill={COLORS.primary}/><circle cx="10" cy="10" r="3" fill="white"/></svg>
            </span>
            AuthFlow
          </Link>
          <div className="flex gap-4 items-center">
            {!user && (
              <>
                <NavLink to="/login" label="Login" location={location} activeColor={COLORS.primary} />
                <NavLink to="/register" label="Register" location={location} activeColor={COLORS.accent} />
              </>
            )}
            {user && (
              <>
                <NavLink to="/dashboard" label="Dashboard" location={location} activeColor={COLORS.primary} />
                <button
                  className="px-4 py-2 ml-4 rounded font-medium border bg-[var(--accent)] hover:opacity-80 text-white transition"
                  style={{ backgroundColor: COLORS.accent, border: `1px solid ${COLORS.secondary}` }}
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

function NavLink({ to, label, location, activeColor }) {
  const isActive = location.pathname === to;
  return (
    <Link
      to={to}
      className={`px-3 py-2 rounded text-base font-medium transition ${
        isActive
          ? "text-white shadow"
          : "text-gray-700 hover:text-white hover:bg-gray-200"
      }`}
      style={isActive ? { backgroundColor: activeColor } : {}}
    >
      {label}
    </Link>
  );
}
