"use client";

import { LucideFolderDown } from "lucide-react";
import {
	createContext,
	type Dispatch,
	type SetStateAction,
	use,
	useCallback,
	useState,
} from "react";
import {
	AlertDialog,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "~/components/ui/alert-dialog";
import { Button } from "~/components/ui/button";
import {
	Item,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "~/components/ui/item";
import { Progress } from "~/components/ui/progress";
import { zipFiles } from "~/lib/file";
import { formatBytes } from "~/lib/format";
import { invertImage } from "~/lib/image";
import { useFiles } from "./use-files";

type ProgressDialogContextType = {
	progress: number;
	setProgress: Dispatch<SetStateAction<number>>;
	isOpen: boolean;
	setIsOpen: Dispatch<SetStateAction<boolean>>;
	invertBegin: () => void;
};

const ProgressDialogContext = createContext<ProgressDialogContextType | null>(
	null,
);

export function ProgressDialogProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	const { files } = useFiles();

	const [progress, setProgress] = useState(0);
	const [isOpen, setIsOpen] = useState(false);
	const [zipUrl, setZipUrl] = useState<string | null>(null);
	const [zipSize, setZipSize] = useState(0);

	const imagesLeft = files.length - Math.floor((files.length * progress) / 100);
	const isComplete = progress === 100;

	const invertBegin = useCallback(async () => {
		setIsOpen(true);

		const results: File[] = [];

		for (const file of files) {
			const invertedImage = await invertImage(file.file);
			results.push(invertedImage);
			setProgress((results.length / files.length) * 100);
		}

		const zip = await zipFiles(results);
		setZipUrl(zip.url);
		setZipSize(zip.blob.size);
	}, [files]);

	function handleDownloadClick() {
		if (!zipUrl) return;
		const a = document.createElement("a");
		a.href = zipUrl;
		a.download = "images.zip";
		a.click();
		URL.revokeObjectURL(zipUrl);
		setIsOpen(false);
		setZipUrl(null);
		setZipSize(0);
		setProgress(0);
	}

	function handleCancelClick() {
		setIsOpen(false);
		setZipUrl(null);
		setZipSize(0);
		setProgress(0);
		if (zipUrl) URL.revokeObjectURL(zipUrl);
	}

	return (
		<ProgressDialogContext.Provider
			value={{
				progress,
				setProgress,
				isOpen,
				setIsOpen,
				invertBegin,
			}}
		>
			<AlertDialog open={isOpen}>
				<AlertDialogContent>
					<AlertDialogHeader>
						<AlertDialogTitle className="flex flex-row items-center gap-2">
							{isComplete ? "Inverting completed" : "Inverting images"}
						</AlertDialogTitle>
						<AlertDialogDescription>
							{isComplete
								? "Download your images."
								: `${imagesLeft} ${imagesLeft === 1 ? "image" : "images"} left`}
						</AlertDialogDescription>
					</AlertDialogHeader>
					<div className="flex size-full flex-col items-center justify-center">
						{isComplete ? (
							<ItemComplete name="images.zip" size={formatBytes(zipSize)} />
						) : (
							<Progress className="w-full" value={progress}></Progress>
						)}
					</div>

					<AlertDialogFooter>
						<Button onClick={handleCancelClick} variant={"outline"}>
							Cancel
						</Button>
						<Button disabled={!zipUrl} onClick={handleDownloadClick}>
							Download
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			{children}
		</ProgressDialogContext.Provider>
	);
}

function ItemComplete({ name, size }: { name: string; size: string }) {
	return (
		<Item variant={"outline"}>
			<ItemMedia>
				<LucideFolderDown className="size-6" />
			</ItemMedia>
			<ItemContent>
				<ItemTitle>{name}</ItemTitle>
				<ItemDescription>{size}</ItemDescription>
			</ItemContent>
		</Item>
	);
}

export function useProgressDialog() {
	const context = use(ProgressDialogContext);

	if (!context)
		throw new Error(
			"useProgressDialog must be used within a ProgressDialogProvider",
		);

	return context;
}
