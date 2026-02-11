"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type WebsiteTheme = "dark" | "light";

interface WebsiteThemeContextValue {
  theme: WebsiteTheme;
  toggleTheme: () => void;
}

const WebsiteThemeContext = createContext<WebsiteThemeContextValue | null>(null);

const STORAGE_KEY = "coltium_website_theme";

export function WebsiteThemeProvider({ children }: { children: React.ReactNode }) {
  // Default to light (white) theme; override from localStorage if present
  const [theme, setTheme] = useState<WebsiteTheme>("light");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const stored = window.localStorage.getItem(STORAGE_KEY) as WebsiteTheme | null;
    if (stored === "light" || stored === "dark") {
      setTheme(stored);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem(STORAGE_KEY, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  return (
    <WebsiteThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </WebsiteThemeContext.Provider>
  );
}

export function useWebsiteTheme() {
  const ctx = useContext(WebsiteThemeContext);
  if (!ctx) {
    throw new Error("useWebsiteTheme must be used within WebsiteThemeProvider");
  }
  return ctx;
}

