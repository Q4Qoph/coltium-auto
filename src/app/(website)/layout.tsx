"use client";

import Footer from "./(components)/Footer";
import Navbar from "./(components)/Navbar";
import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/lib/contact";
import { WebsiteThemeProvider, useWebsiteTheme } from "@/lib/website-theme";

const WebsiteShell = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { theme } = useWebsiteTheme();

  return (
    <div className={theme === "dark" ? "bg-black text-white" : "bg-white text-slate-900"}>
      <Navbar />
      {children}
      <Footer />

      {/* Floating WhatsApp Button */}
      <Link
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 transition-all duration-300 flex items-center space-x-2"
      >
        <MessageCircle size={20} className="text-white" />
      </Link>
    </div>
  );
};

const WebsiteLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <WebsiteThemeProvider>
      <WebsiteShell>{children}</WebsiteShell>
    </WebsiteThemeProvider>
  );
};

export default WebsiteLayout;
