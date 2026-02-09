"use client";

import { cn } from "@/lib/utils";

type BadgeVariant = "default" | "success" | "warning" | "danger" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

export function Badge({ className, variant = "default", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-zinc-700 text-zinc-200",
        variant === "success" && "bg-emerald-900/50 text-emerald-300",
        variant === "warning" && "bg-amber-900/50 text-amber-300",
        variant === "danger" && "bg-red-900/50 text-red-300",
        variant === "outline" && "border border-zinc-600 text-zinc-300",
        className
      )}
      {...props}
    />
  );
}
