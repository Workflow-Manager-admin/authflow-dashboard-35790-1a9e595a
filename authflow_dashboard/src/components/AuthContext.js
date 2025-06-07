import React, { useState, useEffect, useContext, createContext } from "react";
import { createClient } from "@supabase/supabase-js";

// Please insert your Supabase project credentials below for a real setup
const SUPABASE_URL = "https://YOUR_SUPABASE_PROJECT.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const AuthContext = createContext();

// PUBLIC_INTERFACE
export function useAuth() {
  return useContext(AuthContext);
}

// PUBLIC_INTERFACE
export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    // Fetch session on mount
    const session = supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setInitializing(false);
    });

    // Listen for session changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });
    return () => subscription.unsubscribe();
  }, []);

  const value = { user, setUser, supabase, initializing };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
