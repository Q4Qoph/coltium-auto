"use client";

import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { User, Role, AuthResponse } from "@/types";
import { authApi } from "@/lib/api";
import { mockLogin, mockSignup } from "@/lib/mock-auth";

const STORAGE_TOKEN = "coltium_token";
const STORAGE_USER = "coltium_user";

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

interface AuthContextValue extends AuthState {
  login: (email: string, password: string) => Promise<AuthResponse>;
  signup: (email: string, password: string, name: string, role?: Role) => Promise<AuthResponse>;
  logout: () => void;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    token: null,
    loading: true,
  });

  const hasApi = typeof process !== "undefined" && !!process.env.NEXT_PUBLIC_API_URL;

  const setAuthCookie = useCallback((token: string | null) => {
    if (typeof document === "undefined") return;
    if (token) {
      document.cookie = `coltium_token=${encodeURIComponent(token)}; path=/; max-age=${7 * 24 * 60 * 60}; SameSite=Lax`;
    } else {
      document.cookie = "coltium_token=; path=/; max-age=0";
    }
  }, []);

  const loadStored = useCallback(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem(STORAGE_TOKEN);
    const raw = localStorage.getItem(STORAGE_USER);
    let user: User | null = null;
    if (raw) try { user = JSON.parse(raw) as User; } catch { /* ignore */ }
    if (token) setAuthCookie(token);
    setState({ user, token, loading: false });
  }, [setAuthCookie]);

  useEffect(() => {
    loadStored();
  }, [loadStored]);

  const login = useCallback(async (email: string, password: string): Promise<AuthResponse> => {
    const res = hasApi
      ? await authApi.login({ email, password })
      : await mockLogin(email, password);
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_TOKEN, res.token);
      localStorage.setItem(STORAGE_USER, JSON.stringify(res.user));
      setAuthCookie(res.token);
    }
    setState({ user: res.user, token: res.token, loading: false });
    return res;
  }, [hasApi, setAuthCookie]);

  const signup = useCallback(async (email: string, password: string, name: string, role?: Role): Promise<AuthResponse> => {
    const res = hasApi
      ? await authApi.signup({ email, password, name, role })
      : await mockSignup(email, password, name, role ?? "user");
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_TOKEN, res.token);
      localStorage.setItem(STORAGE_USER, JSON.stringify(res.user));
      setAuthCookie(res.token);
    }
    setState({ user: res.user, token: res.token, loading: false });
    return res;
  }, [hasApi, setAuthCookie]);

  const logout = useCallback(() => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(STORAGE_TOKEN);
      localStorage.removeItem(STORAGE_USER);
      setAuthCookie(null);
    }
    setState({ user: null, token: null, loading: false });
  }, [setAuthCookie]);

  const setUser = useCallback((user: User | null) => {
    setState((s) => ({ ...s, user }));
    if (typeof window !== "undefined") {
      if (user) localStorage.setItem(STORAGE_USER, JSON.stringify(user));
      else localStorage.removeItem(STORAGE_USER);
    }
  }, []);

  const value: AuthContextValue = {
    ...state,
    login,
    signup,
    logout,
    setUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}

export function useOptionalAuth() {
  return useContext(AuthContext);
}
