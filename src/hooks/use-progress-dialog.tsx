"use client";

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
import { Progress } from "~/components/ui/progress";
import { zipFiles } from "~/lib/file";
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
	const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

	const invertBegin = useCallback(async () => {
		setIsOpen(true);

		const results: File[] = [];

		for (const file of files) {
			const invertedImage = await invertImage(file.file);
			results.push(invertedImage);
			setProgress((files.length / results.length) * 100);
		}

		const url = await zipFiles(results);
		setDownloadUrl(url);
	}, [files]);

	function handleDownloadClick() {
		if (!downloadUrl) return;
		const a = document.createElement("a");
		a.href = downloadUrl;
		a.download = "images.zip";
		a.click();
		URL.revokeObjectURL(downloadUrl);
		setIsOpen(false);
		setDownloadUrl(null);
		setProgress(0);
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
							Processing {files.length} images
						</AlertDialogTitle>
						<AlertDialogDescription></AlertDialogDescription>
					</AlertDialogHeader>
					<Progress value={progress}></Progress>
					<AlertDialogFooter>
						<Button
							className="w-full"
							disabled={!downloadUrl}
							onClick={handleDownloadClick}
						>
							Download
						</Button>
					</AlertDialogFooter>
				</AlertDialogContent>
			</AlertDialog>
			{children}
		</ProgressDialogContext.Provider>
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
