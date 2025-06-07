import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import AuthProvider, { useAuth } from "./components/AuthContext";
import Navbar from "./components/Navbar";
import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import Dashboard from "./components/Dashboard";
import "./App.css";

// PUBLIC_INTERFACE
function ProtectedRoute({ children }) {
  const { user, initializing } = useAuth();
  const location = useLocation();

  if (initializing) {
    return <div className="flex justify-center mt-20">Loading...</div>;
  }
  return user ? (
    children
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

// PUBLIC_INTERFACE
function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Router>
          <Navbar />
          <main className="flex-1 pt-20 flex flex-col items-center justify-center px-4">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </Router>
      </div>
    </AuthProvider>
  );
}

function NotFound() {
  return (
    <div className="text-center text-gray-800 mt-20">
      <h2 className="font-bold text-2xl mb-2">404 Not Found</h2>
      <p>This page does not exist.</p>
    </div>
  );
}

export default App;
