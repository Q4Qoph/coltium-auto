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
          "inline-flex items-center justify-center font-medium rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-black disabled:opacity-50 disabled:pointer-events-none",
          variant === "primary" && "bg-[var(--primary)] text-white hover:bg-[var(--primary-hover)] focus:ring-[var(--primary)]",
          variant === "secondary" && "bg-zinc-700 text-white hover:bg-zinc-600 focus:ring-zinc-500",
          variant === "outline" && "border border-zinc-600 text-white hover:bg-zinc-800 focus:ring-zinc-500",
          variant === "ghost" && "text-zinc-300 hover:bg-zinc-800 focus:ring-zinc-500",
          variant === "danger" && "bg-red-600 text-white hover:bg-red-700 focus:ring-red-500",
          size === "sm" && "px-3 py-1.5 text-sm",
          size === "md" && "px-4 py-2 text-sm",
          size === "lg" && "px-6 py-3 text-base",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24" aria-hidden>
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
