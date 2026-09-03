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
  title: "ThumbBatch — Bulk YouTube Thumbnails. One Click.",
  description: "ThumbBatch is a free, open-source Chrome extension for downloading high-quality YouTube thumbnails individually or in bulk. No account. No tracking. No hassle.",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    title: "ThumbBatch — Bulk YouTube Thumbnails. One Click.",
    description: "ThumbBatch is a free, open-source Chrome extension for downloading high-quality YouTube thumbnails individually or in bulk.",
    type: "website",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} dark`}>
      <body className="min-h-screen bg-background text-foreground font-sans antialiased selection:bg-accent/30 selection:text-white">
        {children}
      </body>
    </html>
  );
}
