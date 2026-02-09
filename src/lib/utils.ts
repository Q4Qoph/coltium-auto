/**
 * Merge class names (shadcn-style) for Tailwind.
 */
export function cn(...inputs: (string | undefined | null | false)[]): string {
  return inputs.filter(Boolean).join(" ");
}

export function formatDate(date: string | Date): string {
  return new Date(date).toLocaleDateString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatDateTime(date: string | Date): string {
  return new Date(date).toLocaleString("en-KE", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function inspectionStatusLabel(status: string): string {
  const labels: Record<string, string> = {
    pending: "Pending",
    assigned: "Assigned",
    in_progress: "In progress",
    completed: "Completed",
    cancelled: "Cancelled",
  };
  return labels[status] ?? status;
}

export function severityLabel(severity: string): string {
  const labels: Record<string, string> = {
    critical: "Critical",
    monitor: "Monitor",
    informational: "Informational",
  };
  return labels[severity] ?? severity;
}
