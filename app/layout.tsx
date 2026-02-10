import type { Metadata } from "next";
import "./globals.css";

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
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
