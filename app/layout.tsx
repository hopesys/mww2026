import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Miss Wellness World 2025 - Beauty with Wellness",
  description: "การประกวด Miss Wellness World มุ่งคัดเลือกทูตสุขสภาพเพื่อส่งเสริมสุขภาพดีจากภายในสู่ภายนอก ภายใต้แนวคิด Beauty with Wellness",
  keywords: ["Miss Wellness World", "beauty pageant", "wellness", "health", "beauty with wellness", "Thailand"],
  openGraph: {
    title: "Miss Wellness World 2025",
    description: "Beauty with Wellness - Global Wellness Pageant",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
