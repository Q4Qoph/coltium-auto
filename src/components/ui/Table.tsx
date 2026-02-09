"use client";

import { cn } from "@/lib/utils";

export function Table({ className, ...props }: React.HTMLAttributes<HTMLTableElement>) {
  return (
    <div className="overflow-x-auto">
      <table className={cn("w-full caption-bottom text-sm", className)} {...props} />
    </div>
  );
}

export function TableHeader({ ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <thead className="border-b border-zinc-700" {...props} />;
}

export function TableBody({ ...props }: React.HTMLAttributes<HTMLTableSectionElement>) {
  return <tbody className="[&_tr:last-child]:border-0" {...props} />;
}

export function TableRow({ className, ...props }: React.HTMLAttributes<HTMLTableRowElement>) {
  return (
    <tr
      className={cn("border-b border-zinc-800 transition-colors hover:bg-zinc-800/50", className)}
      {...props}
    />
  );
}

export function TableHead({ className, ...props }: React.HTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={cn(
        "h-12 px-4 text-left align-middle font-medium text-zinc-400",
        className
      )}
      {...props}
    />
  );
}

export function TableCell({ className, ...props }: React.TdHTMLAttributes<HTMLTableCellElement>) {
  return <td className={cn("p-4 align-middle", className)} {...props} />;
}
