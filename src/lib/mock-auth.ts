/**
 * Mock auth for development when NEXT_PUBLIC_API_URL is not set.
 * Replace with real API calls in production.
 */

import type { User, AuthResponse, Role } from "@/types";

const MOCK_USERS: Record<string, { user: User; password: string }> = {
  "user@coltium-auto.com": {
    user: {
      id: "u1",
      email: "user@coltium-auto.com",
      name: "Jane Owner",
      role: "user",
      phone: "+254 700 000 001",
      createdAt: new Date().toISOString(),
    },
    password: "password",
  },
  "tech@coltium-auto.com": {
    user: {
      id: "t1",
      email: "tech@coltium-auto.com",
      name: "John Technician",
      role: "technician",
      createdAt: new Date().toISOString(),
    },
    password: "password",
  },
  "admin@coltium-auto.com": {
    user: {
      id: "a1",
      email: "admin@coltium-auto.com",
      name: "Admin User",
      role: "admin",
      createdAt: new Date().toISOString(),
    },
    password: "password",
  },
};

export function mockLogin(email: string, password: string): Promise<AuthResponse> {
  const entry = MOCK_USERS[email];
  if (!entry || entry.password !== password) {
    return Promise.reject({ message: "Invalid email or password", status: 401 });
  }
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  return Promise.resolve({
    user: entry.user,
    token: `mock_${entry.user.id}_${Date.now()}`,
    expiresAt,
  });
}

export function mockSignup(
  email: string,
  password: string,
  name: string,
  role: Role = "user"
): Promise<AuthResponse> {
  if (MOCK_USERS[email]) {
    return Promise.reject({ message: "Email already registered", status: 400 });
  }
  const user: User = {
    id: `mock_${Date.now()}`,
    email,
    name,
    role,
    createdAt: new Date().toISOString(),
  };
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString();
  return Promise.resolve({
    user,
    token: `mock_${user.id}_${Date.now()}`,
    expiresAt,
  });
}

export function getMockUserFromToken(token: string | null): User | null {
  if (!token || !token.startsWith("mock_")) return null;
  const id = token.split("_")[1];
  for (const entry of Object.values(MOCK_USERS)) {
    if (entry.user.id === id) return entry.user;
  }
  return null;
}
