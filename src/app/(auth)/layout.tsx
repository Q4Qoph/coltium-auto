 "use client";

import { WebsiteThemeProvider, useWebsiteTheme } from "@/lib/website-theme";

function AuthShell({ children }: { children: React.ReactNode }) {
  const { theme } = useWebsiteTheme();

  const backgroundClass =
    theme === "dark"
      ? "bg-zinc-950 text-white"
      : "bg-slate-50 text-slate-900";

  return (
    <div className={`min-h-screen flex items-center justify-center px-4 ${backgroundClass}`}>
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}

export default function AuthLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <WebsiteThemeProvider>
      <AuthShell>{children}</AuthShell>
    </WebsiteThemeProvider>
  );
}
