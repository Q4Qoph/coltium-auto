"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", loading, disabled, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          "inline-flex items-center justify-center font-medium rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-offset-[var(--background)] disabled:opacity-50 disabled:pointer-events-none gap-2",
          variant === "primary" &&
            "bg-[var(--primary)] !text-white hover:bg-[var(--primary-hover)] focus:ring-[var(--primary)]",
          variant === "secondary" &&
            "bg-slate-900 text-slate-50 hover:bg-slate-950 focus:ring-slate-500",
          variant === "outline" &&
            "border border-slate-300 text-slate-800 bg-white hover:bg-slate-50 focus:ring-slate-400",
          variant === "ghost" &&
            "text-slate-700 hover:bg-slate-100 focus:ring-slate-300",
          variant === "danger" &&
            "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
          size === "sm" && "px-3 py-1.5 text-xs tracking-wide uppercase",
          size === "md" && "px-4 py-2 text-sm tracking-wide uppercase",
          size === "lg" && "px-6 py-3 text-base tracking-wide uppercase",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <svg className="-ml-1 mr-2 h-4 w-4 animate-pulse" fill="none" viewBox="0 0 24 24" aria-hidden>
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  }
);
Button.displayName = "Button";
export { Button };
