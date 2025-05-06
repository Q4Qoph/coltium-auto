import type { Metadata } from "next";
import "./globals.css";


export const metadata: Metadata = {
  title: "Wrap and Drive | Premium Car Wraps in Kenya",
  description: "Where automotive transformation meets top tier craftmanship",
  keywords: ["Wrap in Kenya", "Best wraps", "Car wrap services", "Car details", "Vehicle customization", "Wrap and drive", "Wrap", "Wraps"],
  openGraph: {
    title: "Wrap and Drive | Premium Car Wraps in Kenya",
    description: "Transform your ride with expert vehicle wrapping and detailing services from Kenya’s top customizers.",
    url: "https://www.wrapanddrive.com",
    siteName: "Wrap and Drive",
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
    title: "Wrap and Drive | Premium Car Wraps in Kenya",
    description: "Get your vehicle wrapped and styled by Kenya’s leading auto customization shop.",
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
      <body
        className={`antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
