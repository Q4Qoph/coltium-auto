import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import { QueryProvider } from "@/lib/query-client";


export const metadata: Metadata = {
  title: "Coltium-Auto | Independent Mobile Vehicle Diagnostic & Technical Oversight",
  description: "Independent, professional vehicle diagnostic oversight — so you understand the true root cause before anyone starts replacing parts. We do not repair vehicles or sell parts.",
  keywords: ["vehicle diagnostics", "independent diagnostic", "mobile diagnostics", "fault codes", "ECU diagnostics", "second opinion garage", "pre-purchase inspection", "fleet diagnostics", "Coltium-Auto", "vehicle health check"],
  openGraph: {
    title: "Coltium-Auto | Independent Mobile Vehicle Diagnostic & Technical Oversight",
    description: "Professional, high-accuracy vehicle diagnosis and technical oversight. We diagnose correctly, explain clearly, and guide you toward informed decisions — before money is spent on repairs.",
    url: "https://www.intl-coltium.com",
    siteName: "Coltium-Auto",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_KE",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Coltium-Auto | Independent Mobile Vehicle Diagnostic & Technical Oversight",
    description: "Independent vehicle diagnostic oversight. We provide technical facts only — no repair incentives, no parts sales.",
    images: ["/logo.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen text-slate-900 bg-[var(--background)]">
        <QueryProvider>
          <AuthProvider>{children}</AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
