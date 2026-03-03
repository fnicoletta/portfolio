import type { Metadata } from "next";
import { Inter, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-instrument",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: "Franky Khoury Nicoletta | CTO & Founding Engineer",
  description:
    "CTO & Founding Engineer building AI-powered products from zero to production. Full-stack TypeScript, React, Next.js, Node.js.",
  keywords: [
    "Franky Khoury",
    "CTO",
    "Founding Engineer",
    "Full Stack Developer",
    "TypeScript",
    "React",
    "Next.js",
    "AI Engineer",
  ],
  authors: [{ name: "Franky Khoury Nicoletta" }],
  openGraph: {
    title: "Franky Khoury Nicoletta | CTO & Founding Engineer",
    description: "Building products from zero to one.",
    type: "website",
    url: "https://frankykhoury.com",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
