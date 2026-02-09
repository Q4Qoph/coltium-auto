"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  error?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, error, children, ...props }, ref) => {
    return (
      <div className="w-full">
        <select
          ref={ref}
          className={cn(
            "flex h-10 w-full rounded-md border border-zinc-700 bg-zinc-950 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50",
            error && "border-red-500",
            className
          )}
          {...props}
        >
          {children}
        </select>
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);
Select.displayName = "Select";
export { Select };
