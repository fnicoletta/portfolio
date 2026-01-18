import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import { Press_Start_2P } from "next/font/google";
import { Providers } from "@/components/providers/Providers";
import "./globals.css";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart2P = Press_Start_2P({
  weight: "400",
  variable: "--font-pixel",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Franky Khoury | Project Engineer & Game Dev",
  description:
    "Portfolio of Franky Khoury - Project Engineer with 5+ years of coding experience. Building production-grade software with AI assistance. Game developer hobbyist.",
  keywords: [
    "Franky Khoury",
    "Project Engineer",
    "Software Developer",
    "Game Developer",
    "Portfolio",
  ],
  authors: [{ name: "Franky Khoury" }],
  openGraph: {
    title: "Franky Khoury | Project Engineer & Game Dev",
    description:
      "Portfolio of Franky Khoury - Project Engineer building production-grade software.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistMono.variable} ${pressStart2P.variable} antialiased bg-void text-white`}
      >
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
