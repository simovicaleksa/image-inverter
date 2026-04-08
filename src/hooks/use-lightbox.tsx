"use client";

import Image from "next/image";
import {
	createContext,
	type Dispatch,
	type MouseEvent,
	type SetStateAction,
	use,
	useCallback,
	useState,
} from "react";
import { Dialog, DialogContent } from "~/components/ui/dialog";
import { cn } from "~/lib/utils";
import type { RichFile } from "~/types/file";
import { useFiles } from "./use-files";

type LightboxContextType = {
	current: RichFile | null;
	setCurrent: Dispatch<SetStateAction<RichFile | null>>;
	setCurrentUrl: (url: string) => void;
};

const LightboxContext = createContext<LightboxContextType | null>(null);

export function LightboxProvider({ children }: { children: React.ReactNode }) {
	const [current, setCurrent] = useState<RichFile | null>(null);
	const { files } = useFiles();

	const setCurrentUrl = useCallback(
		(url: string) => {
			const current = files.find((file) => file.url === url);

			if (!current) {
				setCurrent(null);
				return;
			}

			setCurrent(current);
		},
		[files],
	);

	return (
		<LightboxContext.Provider value={{ current, setCurrent, setCurrentUrl }}>
			<LightboxDialog current={current} setCurrent={setCurrent} />
			{children}
		</LightboxContext.Provider>
	);
}

function LightboxDialog({
	current,
	setCurrent,
}: {
	current: RichFile | null;
	setCurrent: Dispatch<SetStateAction<RichFile | null>>;
}) {
	const isOpen = !!current;
	const [zoom, setZoom] = useState(1);
	const [origin, setOrigin] = useState("center center");
	const orientation =
		(current?.width ?? 0) >= (current?.height ?? 0) ? "horizontal" : "vertical";

	function handleClose() {
		setCurrent(null);
		setZoom(1);
		setOrigin("center center");
	}

	function handleZoom(e: MouseEvent<HTMLImageElement>) {
		const rect = e.currentTarget.getBoundingClientRect();

		const x = ((e.clientX - rect.left) / rect.width) * 100;
		const y = ((e.clientY - rect.top) / rect.height) * 100;

		setOrigin(`${x}% ${y}%`);

		setZoom((prev) => {
			const newZoom = Math.min(4, prev + 2);
			if (newZoom >= 4) {
				setOrigin("center center");
				return 1;
			}

			return newZoom;
		});
	}

	return (
		<Dialog onOpenChange={handleClose} open={isOpen}>
			{current && (
				<DialogContent
					className={cn(
						"size-fit max-w-none overflow-hidden border-none bg-transparent p-5 ring-0 duration-0 sm:max-w-none",
						{
							"max-w-dvw sm:max-w-dvw": orientation === "horizontal",
							"max-h-dvh max-w-none sm:max-w-none": orientation === "vertical",
						},
					)}
					showCloseButton={false}
					style={{
						scale: zoom,
						transformOrigin: origin,
					}}
				>
					<Image
						alt="file lightbox"
						className={cn("size-fit rounded-md object-contain")}
						height={current.height}
						onClick={(e) => handleZoom(e)}
						src={current.url}
						width={current.width}
					/>
				</DialogContent>
			)}
		</Dialog>
	);
}

export function useLightbox() {
	const context = use(LightboxContext);

	if (!context)
		throw new Error("useLightbox must be used within a LightboxProvider");

	return context;
}
