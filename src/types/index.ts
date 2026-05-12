/**
 * Coltium-Auto – TypeScript interfaces
 * Independent mobile vehicle diagnostic oversight platform.
 */

export type Role = "user" | "technician" | "admin";

export interface User {
  id: string;
  email: string;
  name: string;
  role: Role;
  phone?: string;
  createdAt: string;
}

export interface SubscriptionPlan {
  id: string;
  name: string;
  slug: string;
  description: string;
  priceMonthly: number;
  priceYearly?: number;
  features: string[];
  inspectionLimit?: number; // null = unlimited
}

export interface Subscription {
  id: string;
  userId: string;
  planId: string;
  plan?: SubscriptionPlan;
  status: "pending" | "active" | "cancelled" | "expired" | "trialing" | "failed";
  currentPeriodEnd: string;
  createdAt: string;
}

export interface PaymentSummary {
  id: string;
  amount: number;
  status: "pending" | "completed" | "failed";
  createdAt: string;
}

/** Payment as returned to user (mine) or admin (list) */
export interface PaymentRow {
  id: string;
  userId: string;
  subscriptionId?: string;
  amount: number;
  method: "mpesa" | "manual";
  status: "pending" | "completed" | "failed";
  reference?: string;
  createdAt: string;
  subscription?: {
    id: string;
    status: Subscription["status"];
    plan?: { id: string; name: string };
  };
  user?: Pick<User, "id" | "email" | "name">;
}

export interface AdminSubscriptionSummary {
  id: string;
  user?: Pick<User, "id" | "email" | "name">;
  plan?: Pick<SubscriptionPlan, "id" | "name">;
  status: Subscription["status"];
  currentPeriodEnd: string;
  latestPayment: PaymentSummary | null;
}

/** Response when creating a subscription */
export interface SubscriptionCreateResponse {
  subscription: Subscription;
  payment?: {
    id: string;
    status: string;
    amount: number;
    checkoutRequestId?: string;
    customerMessage?: string;
  };
}

export type VehicleMake = string;
export type VehicleModel = string;

export interface Vehicle {
  id: string;
  userId: string;
  make: VehicleMake;
  model: VehicleModel;
  year: number;
  vin?: string;
  registrationNumber?: string;
  mileage?: number;
  mileageUnit?: "km" | "mi";
  createdAt: string;
  updatedAt: string;
}

export type InspectionStatus = "pending" | "assigned" | "in_progress" | "completed" | "cancelled";

/** Matches backend. Only 'preventive' requires an active subscription. */
export type ServiceType =
  | "on_demand"
  | "preventive"
  | "second_opinion"
  | "pre_purchase"
  | "insurance"
  | "fleet";

/** Requester (customer) contact info for admin/technician to reach them */
export interface InspectionRequester {
  id: string;
  name: string;
  email: string;
  phone?: string;
}

export interface Inspection {
  id: string;
  userId: string;
  vehicleId?: string | null;
  serviceType?: ServiceType;
  vehicle?: Vehicle;
  /** Requester (customer) — for admin/technician contact */
  user?: InspectionRequester;
  technicianId?: string;
  technician?: User;
  status: InspectionStatus;
  requestedAt: string;
  scheduledAt?: string;
  startedAt?: string;
  completedAt?: string;
  reportId?: string;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface DiagnosticReport {
  id: string;
  inspectionId: string;
  inspection?: Inspection;
  summary?: string;
  severityRanking: "critical" | "monitor" | "informational";
  findings: ReportFinding[];
  recommendations: string[];
  fileUrl?: string; // PDF
  uploadedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReportFinding {
  id: string;
  code?: string;
  description: string;
  severity: "critical" | "monitor" | "informational";
  system?: string;
}

// API request/response shapes
export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  email: string;
  password: string;
  name: string;
  role?: Role;
  phone?: string;
}

export interface AuthResponse {
  user: User;
  token: string;
  expiresAt: string;
}

export interface ApiError {
  message: string;
  code?: string;
  status?: number;
}

/** Public website contact form submission (stored for admin review) */
export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  createdAt: string;
}
