import "~/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "~/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Image Inverter",
  description: "Lightweight bulk image inverter."
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      className={cn(inter.variable, "font-sans", inter.variable)}
      lang="en"
    >
      <body>{children}</body>
    </html>
  );
}
