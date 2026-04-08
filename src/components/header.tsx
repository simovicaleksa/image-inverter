import Link from "next/link";
import { ThemeSwitch } from "~/hooks/use-theme";
import { Button } from "./ui/button";
import { GitHub } from "./ui/github";

export function Header() {
	return (
		<header className="w-full p-5 px-8">
			<div className="mx-auto flex size-full max-w-4xl flex-row items-center justify-between">
				<Link className="rounded px-2 py-1 font-bold text-2xl" href="/">
					Image{" "}
					<span className="bg-primary text-primary-foreground">Inverter</span>
				</Link>

				<div className="flex flex-row items-center gap-3">
					<a
						href="https://github.com/simovicaleksa/image-inverter"
						rel="noopener"
						target="_blank"
					>
						<Button size={"icon"} variant={"ghost"}>
							<GitHub className="size-5" />
						</Button>
					</a>
					<ThemeSwitch />
				</div>
			</div>
		</header>
	);
}
