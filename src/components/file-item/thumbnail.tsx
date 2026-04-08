import Image from "next/image";
import { useLightbox } from "~/hooks/use-lightbox";
import { ItemMedia } from "../ui/item";

export function ItemThumbnail({ url }: { url: string }) {
	const { setCurrentUrl } = useLightbox();

	function handleClick() {
		setCurrentUrl(url);
	}

	return (
		<ItemMedia>
			<button className="cursor-pointer" onClick={handleClick} type="button">
				<Image
					alt="image preview"
					className="size-10 rounded object-cover"
					height={30}
					src={url}
					width={30}
				/>
			</button>
		</ItemMedia>
	);
}
