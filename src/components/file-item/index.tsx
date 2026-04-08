import { LucideX } from "lucide-react";
import { Button } from "~/components/ui/button";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "~/components/ui/item";
import { useFiles } from "~/hooks/use-files";
import { formatBytes, formatFileType } from "~/lib/format";
import type { RichFile } from "~/types/file";
import { ItemThumbnail } from "./thumbnail";

export function FileItem({ item }: { item: RichFile }) {
	const { setFiles } = useFiles();

	return (
		<Item variant={"outline"}>
			<ItemThumbnail url={item.url} />
			<ItemContent>
				<ItemTitle className="line-clamp-1">{item.file.name}</ItemTitle>
				<ItemDescription className="uppercase">{`${formatFileType(item.file.type)} - ${formatBytes(item.file.size)}`}</ItemDescription>
			</ItemContent>
			<ItemContent>
				<Button
					onClick={() => {
						setFiles((prev) => prev.filter((file) => file.id !== item.id));
					}}
					size={"icon-xs"}
					variant={"destructive"}
				>
					<LucideX></LucideX>
				</Button>
			</ItemContent>
		</Item>
	);
}
