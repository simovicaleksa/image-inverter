"use client";

import {
	createContext,
	type Dispatch,
	type SetStateAction,
	use,
	useCallback,
	useEffect,
	useState,
} from "react";
import type { RichFile } from "~/types/file";

type FilesContextType = {
	files: RichFile[];
	setFiles: Dispatch<SetStateAction<RichFile[]>>;
	addFiles: (files: File[]) => void;
};

const FilesContext = createContext<FilesContextType | null>(null);

export function FilesProvider({ children }: { children: React.ReactNode }) {
	const [files, setFiles] = useState<RichFile[]>([]);

	const addFiles = useCallback((files: File[]) => {
		const richFiles = files.map((file) => {
			const url = URL.createObjectURL(file);
			const id = crypto.randomUUID();

			return { id, file, url };
		});

		setFiles(richFiles);
	}, []);

	useEffect(() => {
		return () => {
			files.forEach((file) => {
				URL.revokeObjectURL(file.url);
			});
		};
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
