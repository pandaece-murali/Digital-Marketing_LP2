import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PANDAeCe | CPL-Focused Digital Marketing Services",
  description:
    "PANDAeCe helps business owners generate quality leads with Google Ads, Meta Ads, conversion-focused websites, CRM integration, and marketing automation.",
  openGraph: {
    title: "PANDAeCe | CPL-Focused Digital Marketing Services",
    description:
      "A connected growth system for business owners: ads, websites, CRM, and automation.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}