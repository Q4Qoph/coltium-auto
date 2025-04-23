import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Wrap and Drive",
  description: "Where automotive transformation meets top tier craftmanship",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
