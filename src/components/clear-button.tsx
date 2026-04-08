"use client";

import { useFiles } from "~/hooks/use-files";
import { Button } from "./ui/button";

export function ClearButton() {
	const { setFiles } = useFiles();

	function handleClear() {
		setFiles([]);
	}

	return (
		<Button
			className={"text-muted-foreground"}
			onClick={handleClear}
			size={"sm"}
			variant={"link"}
		>
			Clear
		</Button>
	);
}
