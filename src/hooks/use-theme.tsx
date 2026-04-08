"use client";

import { LucideMoon, LucideSun } from "lucide-react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";
import { Button } from "~/components/ui/button";

export function ThemeProvider({
	children,
	...props
}: React.ComponentProps<typeof NextThemesProvider>) {
	return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

export function ThemeSwitch() {
	const { theme, setTheme } = useTheme();

	function handleClick() {
		const newTheme = theme === "dark" ? "light" : "dark";
		setTheme(newTheme);
	}

	return (
		<Button onClick={handleClick} size={"icon"} variant={"outline"}>
			<LucideSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
			<LucideMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
			<span className="sr-only">Toggle theme</span>
		</Button>
	);
}
