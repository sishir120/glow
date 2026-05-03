import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import { MobileBottomNav } from "@/components/mobile-bottom-nav";
import { PwaRegister } from "@/components/pwa-register";


const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "GlowUp Hub | Science-Based Metabolic Reset for Women",
  description: "Stop fighting your biology. Join 10,480+ women resetting their metabolism with Clinical Nutritionist Sabita Subedi. Science, not starvation.",
  keywords: [
    "metabolic weight loss",
    "clinical nutritionist nepal",
    "hormonal balance diet",
    "sustainable weight loss app",
    "sabita subedi nutritionist",
    "no starvation diet",
    "healthy habits tracker",
    "weight loss for women",
    "postpartum weight loss",
    "pcos weight loss"
  ],
  openGraph: {
    title: "GlowUp Hub – Sustainable Weight Loss & Metabolic Health",
    description: "Expert-led weight loss program with personalized nutrition, habit tracking, and metabolic health coaching. Join 10,000+ members achieving lasting results without starvation or shame.",
    url: "https://glowuphub.com",
    siteName: "GlowUp Hub",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "GlowUp Hub - Sustainable Weight Loss App with Expert Nutritionist Support",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "GlowUp Hub – Sustainable Weight Loss Program",
    description: "Expert nutritionist-led weight loss. Track nutrition, build healthy habits, achieve metabolic health. 10,000+ success stories.",
    images: ["/twitter-image.jpg"],
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "GlowUp Hub",
  },
  formatDetection: {
    telephone: false,
  },
};

export const viewport: Viewport = {
  themeColor: "#10b981",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} antialiased bg-background text-foreground pb-20 md:pb-0`}
      >
        <Providers>
          {children}
          <MobileBottomNav />
          <PwaRegister />
        </Providers>
      </body>
    </html>
  );
}
