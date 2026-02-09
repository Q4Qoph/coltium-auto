/**
 * Mock data for development when API is not available.
 */

import type { Vehicle, Inspection, DiagnosticReport, Subscription, SubscriptionPlan } from "@/types";

export const mockPlans: SubscriptionPlan[] = [
  {
    id: "plan_1",
    name: "On-Call Diagnostic",
    slug: "on-call",
    description: "Pay per inspection when you need oversight.",
    priceMonthly: 0,
    features: ["One-off inspections", "Full diagnostic report", "Severity ranking", "Recommendations"],
  },
  {
    id: "plan_2",
    name: "Vehicle Health",
    slug: "vehicle-health",
    description: "Regular health checks for your vehicle.",
    priceMonthly: 4999,
    priceYearly: 49990,
    features: ["2 inspections per year", "Preventive health checks", "Early fault detection", "Priority support"],
    inspectionLimit: 2,
  },
  {
    id: "plan_3",
    name: "Fleet Oversight",
    slug: "fleet",
    description: "For organisations with multiple vehicles.",
    priceMonthly: 14999,
    priceYearly: 149990,
    features: ["Unlimited vehicles", "Routine diagnostics", "Fleet dashboard", "Dedicated support"],
  },
];

export const mockVehicles: Vehicle[] = [
  {
    id: "v1",
    userId: "u1",
    make: "Toyota",
    model: "Land Cruiser",
    year: 2020,
    vin: "JTEBU5JRXA5123456",
    registrationNumber: "KCA 123A",
    mileage: 45000,
    mileageUnit: "km",
    createdAt: "2024-01-15T10:00:00Z",
    updatedAt: "2024-01-15T10:00:00Z",
  },
];

export const mockInspections: Inspection[] = [
  {
    id: "i1",
    userId: "u1",
    vehicleId: "v1",
    vehicle: mockVehicles[0],
    status: "completed",
    requestedAt: "2024-02-01T09:00:00Z",
    scheduledAt: "2024-02-02T10:00:00Z",
    completedAt: "2024-02-02T12:00:00Z",
    reportId: "r1",
    createdAt: "2024-02-01T09:00:00Z",
    updatedAt: "2024-02-02T12:00:00Z",
  },
];

export const mockReports: DiagnosticReport[] = [
  {
    id: "r1",
    inspectionId: "i1",
    summary: "Engine and transmission systems within normal parameters. One minor fault in ABS sensor.",
    severityRanking: "monitor",
    findings: [
      { id: "f1", code: "C1234", description: "ABS sensor intermittent", severity: "monitor", system: "Brakes" },
    ],
    recommendations: ["Have ABS sensor checked at next service."],
    uploadedAt: "2024-02-02T12:00:00Z",
    createdAt: "2024-02-02T12:00:00Z",
    updatedAt: "2024-02-02T12:00:00Z",
  },
];
