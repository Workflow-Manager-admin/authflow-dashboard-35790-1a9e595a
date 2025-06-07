import React, { useState, useEffect, useContext, createContext } from "react";
import { createClient } from "@supabase/supabase-js";

/*
  NOTE:
  To use Supabase Auth, you must create a `.env` file in your project root (at the same level as package.json)
  and add the following lines with your project info:

  REACT_APP_SUPABASE_URL=https://rlnkyrtrvgvgcajqyfhe.supabase.co
  REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJsbmt5cnRydmd2Z2NhanF5ZmhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkzMTk1MzksImV4cCI6MjA2NDg5NTUzOX0.IaZwzGGl080wFP3jxnFFcAYIGmll0flnluPkSTJJeGY
  
  (Replace the URL and key above if you have your own Supabase project)
*/

// Supabase credentials from environment variables
const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.REACT_APP_SUPABASE_ANON_KEY;

// If env variables are missing, show an error in console
if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  // eslint-disable-next-line no-console
  console.error("Supabase credentials missing! Please set REACT_APP_SUPABASE_URL and REACT_APP_SUPABASE_ANON_KEY in your .env file.");
}

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
