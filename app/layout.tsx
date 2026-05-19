import type { Metadata } from "next";

import "./globals.css";

export const metadata: Metadata = {
  title: "Trevin & Carisa | Two Become One – May 16 2026",
  description:
    "Join us in celebrating Trevin & Carisa’s wedding on May 16, 2026 — a heartfelt website designed for friends and family to explore event details, RSVP with ease, and experience their love story through beautiful photos, elegant design, and personal touches.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased bg-black text-white`}>{children}</body>
    </html>
  );
}
