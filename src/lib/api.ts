/**
 * Coltium-Auto REST API client
 * Base URL: NEXT_PUBLIC_API_URL (e.g. https://api.coltium-auto.com)
 */

import type {
  User,
  Vehicle,
  Inspection,
  DiagnosticReport,
  Subscription,
  SubscriptionPlan,
  AuthResponse,
  LoginRequest,
  SignupRequest,
  ApiError,
} from "@/types";

const getBaseUrl = () => process.env.NEXT_PUBLIC_API_URL ?? "";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("coltium_token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const url = `${getBaseUrl()}${path}`;
  const token = getToken();
  const isFormData = options.body instanceof FormData;
  const headers: HeadersInit = {
    ...(isFormData ? {} : { "Content-Type": "application/json" }),
    ...(options.headers as Record<string, string>),
  };
  if (token) (headers as Record<string, string>)["Authorization"] = `Bearer ${token}`;

  const res = await fetch(url, { ...options, headers });
  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    const err: ApiError = {
      message: (data as { message?: string }).message ?? "Request failed",
      status: res.status,
    };
    throw err;
  }
  return data as T;
}

// —— Auth ——
export const authApi = {
  login: (body: LoginRequest) =>
    request<AuthResponse>("/auth/login", { method: "POST", body: JSON.stringify(body) }),
  signup: (body: SignupRequest) =>
    request<AuthResponse>("/auth/signup", { method: "POST", body: JSON.stringify(body) }),
  me: () => request<User>("/auth/me"),
  logout: () => request<{ ok: boolean }>("/auth/logout", { method: "POST" }),
};

// —— Users (admin) ——
export const usersApi = {
  list: (params?: { page?: number; limit?: number; role?: string }) => {
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return request<{ users: User[]; total: number }>(`/users?${q}`);
  },
  get: (id: string) => request<User>(`/users/${id}`),
};

// —— Vehicles ——
export const vehiclesApi = {
  list: () => request<Vehicle[]>("/vehicles"),
  get: (id: string) => request<Vehicle>(`/vehicles/${id}`),
  create: (body: Omit<Vehicle, "id" | "userId" | "createdAt" | "updatedAt">) =>
    request<Vehicle>("/vehicles", { method: "POST", body: JSON.stringify(body) }),
  update: (id: string, body: Partial<Vehicle>) =>
    request<Vehicle>(`/vehicles/${id}`, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (id: string) =>
    request<{ ok: boolean }>(`/vehicles/${id}`, { method: "DELETE" }),
};

// —— Inspections ——
export const inspectionsApi = {
  list: (params?: { status?: string; vehicleId?: string }) => {
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return request<Inspection[]>(`/inspections?${q}`);
  },
  listMine: () => request<Inspection[]>("/inspections/mine"), // technician
  listAssigned: () => request<Inspection[]>("/inspections/assigned"), // technician
  get: (id: string) => request<Inspection>(`/inspections/${id}`),
  create: (body: { vehicleId: string; scheduledAt?: string; notes?: string }) =>
    request<Inspection>("/inspections", { method: "POST", body: JSON.stringify(body) }),
  assign: (id: string, technicianId: string) =>
    request<Inspection>(`/inspections/${id}/assign`, {
      method: "POST",
      body: JSON.stringify({ technicianId }),
    }),
  start: (id: string) =>
    request<Inspection>(`/inspections/${id}/start`, { method: "POST" }),
  complete: (id: string) =>
    request<Inspection>(`/inspections/${id}/complete`, { method: "POST" }),
};

// —— Reports ——
export const reportsApi = {
  list: (params?: { vehicleId?: string; inspectionId?: string }) => {
    const q = new URLSearchParams(params as Record<string, string>).toString();
    return request<DiagnosticReport[]>(`/reports?${q}`);
  },
  get: (id: string) => request<DiagnosticReport>(`/reports/${id}`),
  upload: (inspectionId: string, formData: FormData) =>
    request<DiagnosticReport>(`/inspections/${inspectionId}/report`, {
      method: "POST",
      body: formData,
    }),
  update: (id: string, body: Partial<DiagnosticReport>) =>
    request<DiagnosticReport>(`/reports/${id}`, {
      method: "PATCH",
      body: JSON.stringify(body),
    }),
};

// —— Subscriptions ——
export const subscriptionsApi = {
  plans: () => request<SubscriptionPlan[]>("/subscriptions/plans"),
  mine: () => request<Subscription | null>("/subscriptions/mine"),
  create: (body: { planId: string; interval: "monthly" | "yearly" }) =>
    request<Subscription>("/subscriptions", { method: "POST", body: JSON.stringify(body) }),
  cancel: (id: string) =>
    request<Subscription>(`/subscriptions/${id}/cancel`, { method: "POST" }),
};

// —— Technicians (admin) ——
export const techniciansApi = {
  list: () => request<User[]>("/admin/technicians"),
  create: (body: SignupRequest) =>
    request<User>("/admin/technicians", { method: "POST", body: JSON.stringify(body) }),
};
