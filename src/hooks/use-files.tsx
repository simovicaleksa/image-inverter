"use client";

import { createContext, use, useState, type Dispatch, type SetStateAction } from "react";

type FilesContextType = {
  files: Blob[];
  setFiles: Dispatch<SetStateAction<Blob[]>>;
};

const FilesContext = createContext<FilesContextType | null>(null);

type Props = {
  children: React.ReactNode;
};

export function FilesProvider(props: Props) {
  const [files, setFiles] = useState<Blob[]>([]);

  return <FilesContext.Provider value={{ files, setFiles }}>{props.children}</FilesContext.Provider>;
}

export function useFiles() {
  const context = use(FilesContext);

  if (!context) throw new Error("useFiles must be used within a FilesProvider");

  return context;
}
