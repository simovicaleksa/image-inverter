import "~/styles/globals.css";

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { BackgroundGrid } from "~/components/background-grid";
import { Header } from "~/components/header";
import { FilesProvider } from "~/hooks/use-files";
import { LightboxProvider } from "~/hooks/use-lightbox";
import { ProgressDialogProvider } from "~/hooks/use-progress-dialog";
import { ThemeProvider } from "~/hooks/use-theme";
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
			className={cn(inter.variable, "font-sans", inter.variable)}
			lang="en"
			suppressHydrationWarning
		>
			<body className="bg-background">
				<BackgroundGrid />
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					disableTransitionOnChange
					enableSystem
				>
					<Header />
					<FilesProvider>
						<LightboxProvider>
							<ProgressDialogProvider>{children}</ProgressDialogProvider>
						</LightboxProvider>
					</FilesProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
