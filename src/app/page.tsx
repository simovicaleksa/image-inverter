"use client";

import { LucideX } from "lucide-react";
import Image from "next/image";
import { ClearButton } from "~/components/clear-button";
import { FilesDropzone } from "~/components/files-dropzone";
import { Button } from "~/components/ui/button";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "~/components/ui/item";
import { useFiles } from "~/hooks/use-files";
import { formatBytes, formatFileType } from "~/lib/format";

export default function HomePage() {
	const { files, setFiles } = useFiles();

	const filesEmpty = files.length === 0;

	return (
		<main className="mt-20 flex size-full min-h-screen justify-center">
			<section className="flex size-full max-w-xl flex-col gap-10 p-5">
				<div className="flex flex-col items-center justify-center gap-2 text-center">
					<h1 className="font-bold text-4xl">Image Inverter</h1>
					<p className="text-muted-foreground">
						Scan your film for free online!
					</p>
				</div>

				<FilesDropzone />

				{!filesEmpty && (
					<div className="flex flex-col gap-5">
						<div className="flex flex-row items-center justify-between">
							<span className="text-muted-foreground text-sm">{`Files: ${files.length}`}</span>
							<ClearButton />
						</div>

						<div className="flex flex-col gap-2">
							{files.map((item) => (
								<Item key={item.url} variant={"outline"}>
									<ItemMedia>
										<Image
											alt="image preview"
											className="size-10 rounded object-cover"
											height={30}
											src={item.url}
											width={30}
										/>
									</ItemMedia>
									<ItemContent>
										<ItemTitle>{item.file.name}</ItemTitle>
										<ItemDescription className="uppercase">{`${formatFileType(item.file.type)} - ${formatBytes(item.file.size)}`}</ItemDescription>
									</ItemContent>
									<ItemContent>
										<Button
											onClick={() => {
												setFiles((prev) =>
													prev.filter((file) => file.id !== item.id),
												);
											}}
											size={"icon-xs"}
											variant={"destructive"}
										>
											<LucideX></LucideX>
										</Button>
									</ItemContent>
								</Item>
							))}
						</div>
					</div>
				)}
			</section>
		</main>
	);
}
