import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FastAPI + Next.js + Clerk Integration Demo",
  description:
    "A full-stack template demonstrating authentication with Clerk, JWT-secured API calls from Next.js to FastAPI, and a modern dashboard UI. Features user sign-in, protected endpoints, and personalized content.",
  keywords: [
    "fastapi",
    "nextjs",
    "clerk",
    "authentication",
    "jwt",
    "api",
    "integration",
    "typescript",
    "tailwindcss",
    "dashboard",
    "fullstack"
  ],
  authors: [{ name: "ysskrishna", url: "https://github.com/ysskrishna" }],
  creator: "ysskrishna",
  openGraph: {
    title: "FastAPI + Next.js + Clerk Integration Demo",
    description:
      "A template for building full-stack apps with Next.js frontend, Clerk authentication, and FastAPI backend secured by JWT.",
    url: "https://github.com/ysskrishna/fastapi-nextjs-clerk",
    siteName: "FastAPI Next.js Clerk Demo",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FastAPI Next.js Clerk Demo"
      }
    ],
    locale: "en_US",
    type: "website"
  },
  metadataBase: new URL("http://localhost:3000"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClerkProvider>
            {children}
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
