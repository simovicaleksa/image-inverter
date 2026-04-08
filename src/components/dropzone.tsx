"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFiles } from "~/hooks/use-files";
import { cn } from "~/lib/utils";

export function Dropzone() {
	const { addFiles } = useFiles();

	const onDrop = useCallback(
		(acceptedFiles: File[]) => {
			// add files to the stack

			addFiles(acceptedFiles);
		},
		[addFiles],
	);

	const { getRootProps, getInputProps, isDragActive } = useDropzone({
		onDrop,
		accept: {
			"image/*": [],
		},
		maxFiles: 100,
	});

	return (
		<div
			{...getRootProps()}
			className={cn(
				"flex h-48 cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed p-5 text-center duration-200 hover:border-foreground",
				{
					"scale-105 border-foreground": isDragActive,
				},
			)}
		>
			<span className="cursor-default text-foreground text-sm">
				{isDragActive
					? "Drop the file here..."
					: "Drag & drop an image here, or click to select"}
			</span>
			<input {...getInputProps()} />
		</div>
	);
}
