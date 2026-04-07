"use client";

import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { useFiles } from "~/hooks/use-files";
import { cn } from "~/lib/utils";

export function FilesDropzone() {
  const { addFiles } = useFiles();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // add files to the stack

    addFiles(acceptedFiles);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": []
    },
    maxFiles: 100
  });

  return (
    <div
      {...getRootProps()}
      className={cn(
        "border-2 p-5 border-dashed rounded-xl min-h-64 flex flex-col items-center justify-center text-center duration-200 cursor-pointer hover:border-foreground",
        {
          "border-foreground scale-105": isDragActive
        }
      )}
    >
      <span className="text-sm text-foreground cursor-default">
        {isDragActive ? "Drop the file here..." : "Drag & drop an image here, or click to select"}
      </span>
      <input {...getInputProps()} />
    </div>
  );
}
