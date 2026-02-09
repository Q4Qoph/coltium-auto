"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, error, type = "text", ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          type={type}
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border bg-zinc-950 px-3 py-2 text-sm text-white placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            error ? "border-red-500" : "border-zinc-700",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
Input.displayName = "Input";
export { Input };
