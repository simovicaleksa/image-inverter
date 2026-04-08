import "~/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { FilesProvider } from "~/hooks/use-files";
import { LightboxProvider } from "~/hooks/use-lightbox";
import { cn } from "~/lib/utils";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
	title: "Image Inverter",
	description: "Lightweight bulk image inverter.",
};

export default function RootLayout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<html
			className={cn(inter.variable, "dark font-sans", inter.variable)}
			lang="en"
		>
			<body className="bg-background">
				<FilesProvider>
					<LightboxProvider>{children}</LightboxProvider>
				</FilesProvider>
			</body>
		</html>
	);
}
