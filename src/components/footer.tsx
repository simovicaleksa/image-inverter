"use client";

import { useFiles } from "~/hooks/use-files";
import { formatBytes } from "~/lib/format";
import { Button } from "./ui/button";

export function Footer() {
	const { files } = useFiles();
	const isEmpty = files.length === 0;
	const totalSize = files.reduce((acc, item) => acc + item.file.size, 0);

	if (isEmpty) return null;

	return (
		<footer className="fixed bottom-0 w-full border-t bg-secondary p-3 px-8">
			<div className="mx-auto flex w-full max-w-7xl flex-row items-center justify-between">
				<div className="flex flex-col">
					<span>Scanning {files.length} images</span>
					<span className="text-muted-foreground text-sm">
						Total: {formatBytes(totalSize)}
					</span>
				</div>
				<Button size={"lg"}>Convert</Button>
			</div>
		</footer>
	);
}
