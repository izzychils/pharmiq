import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";
import "./globals.css";

const sans = Manrope({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const display = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pharmiq.online"),
  title: {
    default: "Pharmiq — AI for pharmacy operations",
    template: "%s · Pharmiq",
  },
  description:
    "Pharmiq is the AI operating system for pharmacies: batch and expiry control, FEFO dispensing, prescription workflows, reorder intelligence and a clinical assistant staff can actually audit.",
  keywords: [
    "pharmacy software",
    "pharmacy inventory",
    "medicine expiry tracking",
    "FEFO",
    "prescription management",
    "pharmacy AI",
  ],
  openGraph: {
    title: "Pharmiq — AI for pharmacy operations",
    description:
      "Batch-level inventory, expiry control, FEFO dispensing and a verified clinical assistant in one calm workspace.",
    url: "https://pharmiq.online",
    siteName: "Pharmiq",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pharmiq — AI for pharmacy operations",
    description:
      "Inventory, expiry and dispensing intelligence for pharmacies that refuse to guess.",
  },
};

export const viewport: Viewport = {
  themeColor: "#040a08",
  colorScheme: "dark",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
