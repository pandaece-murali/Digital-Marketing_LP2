import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "PANDAeCe | Performance Marketing Agency",
  description:
    "PANDAeCe helps startups attract qualified leads through performance marketing, Google Ads, Meta Ads, conversion-focused websites, and marketing automation.",
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.variable}>
        {children}

        <script
          src="https://crm.pandaece.com/js/external-tracking.js"
          data-tracking-id="tk_c8115cbbe8574c6eb5fee47615eb895c"
        ></script>
      </body>
    </html>
  );
}