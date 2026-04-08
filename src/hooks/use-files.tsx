"use client";

import {
	createContext,
	type Dispatch,
	type SetStateAction,
	use,
	useCallback,
	useEffect,
	useRef,
	useState,
} from "react";
import { getImageDimensions } from "~/lib/image";
import type { RichFile } from "~/types/file";

type FilesContextType = {
	files: RichFile[];
	setFiles: Dispatch<SetStateAction<RichFile[]>>;
	addFiles: (files: File[]) => void;
};

const FilesContext = createContext<FilesContextType | null>(null);

export function FilesProvider({ children }: { children: React.ReactNode }) {
	const [files, setFiles] = useState<RichFile[]>([]);

	const addFiles = useCallback(async (newFiles: File[]) => {
		const richFiles = await Promise.all(
			newFiles.map(async (file) => {
				const url = URL.createObjectURL(file);
				const id = crypto.randomUUID();

				let width = 0;
				let height = 0;

				try {
					const dimensions = await getImageDimensions(file);
					width = dimensions.width;
					height = dimensions.height;
				} catch {}

				return { id, file, url, width, height };
			}),
		);

		setFiles((prev) => [...prev, ...richFiles]);
	}, []);

	// cleanup unused object urls to prevent memory leak
	const prevFilesRef = useRef<RichFile[]>([]);
	useEffect(() => {
		const prevFiles = prevFilesRef.current;

		prevFiles.forEach((prevFile) => {
			const stillExists = files.some((f) => f.id === prevFile.id);
			if (!stillExists) {
				URL.revokeObjectURL(prevFile.url);
			}
		});

		prevFilesRef.current = files;
	}, [files]);

	return (
		<FilesContext.Provider value={{ files, setFiles, addFiles }}>
			{children}
		</FilesContext.Provider>
	);
}

export function useFiles() {
	const context = use(FilesContext);

	if (!context) throw new Error("useFiles must be used within a FilesProvider");

	return context;
}
