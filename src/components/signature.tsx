import { Button } from "./ui/button";

export function Signature() {
	return (
		<span className="size-fit text-xs">
			Made with ❤️ by{" "}
			<a href="https://github.com/simovicaleksa" rel="noopener" target="_blank">
				<Button className="px-0 text-xs" variant="link">
					{" "}
					simovicaleksa
				</Button>
			</a>
		</span>
	);
}
