import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "CVCompass",
    description: "AI-powered job match scoring, cover letter generation, and interview prep - all from a single job posting.",
    openGraph: {
        title: "CVCompass",
        description: "AI-powered job match scoring, cover letter generation, and interview prep - all from a single job posting.",
        url: "https://resumioai-frontend.onrender.com",
        siteName: "CVCompass",
        images: [
            {
                url: "https://resumioai-frontend.onrender.com/og-image.png",
                width: 1200,
                height: 630,
            }
        ],
    },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className="dark" lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
      </body>
    </html>
  );
}
