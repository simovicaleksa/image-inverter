import "~/styles/globals.css";

import type { Metadata } from "next";
import { Geist } from "next/font/google";

export const metadata: Metadata = {
  title: "Image Inverter",
  description: "Lightweight bulk image inverter."
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans"
});

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={`${geist.variable}`}
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
