"use client";

import { LucideX } from "lucide-react";
import Image from "next/image";
import { FilesDropzone } from "~/components/files-dropzone";
import { Button } from "~/components/ui/button";
import { Item, ItemContent, ItemDescription, ItemMedia, ItemTitle } from "~/components/ui/item";
import { useFiles } from "~/hooks/use-files";
import { formatBytes, formatFileType } from "~/lib/format";

export default function HomePage() {
  const { files, setFiles } = useFiles();

  return (
    <main className="flex items-center justify-center size-full min-h-screen">
      <section className="p-5 max-w-xl size-full flex flex-col gap-10">
        <FilesDropzone />

        <div className="flex flex-col gap-2">
          {files.map((item) => (
            <Item
              key={item.url}
              variant={"outline"}
            >
              <ItemMedia>
                <Image
                  src={item.url}
                  width={30}
                  height={30}
                  alt="image preview"
                  className="object-cover size-10"
                />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{item.file.name}</ItemTitle>
                <ItemDescription>{`${formatFileType(item.file.type)} - ${formatBytes(item.file.size)}`}</ItemDescription>
              </ItemContent>
              <ItemContent>
                <Button
                  variant={"destructive"}
                  size={"icon-xs"}
                  onClick={() => {
                    setFiles((prev) => prev.filter((file) => file.id !== item.id));
                  }}
                >
                  <LucideX></LucideX>
                </Button>
              </ItemContent>
            </Item>
          ))}
        </div>
      </section>
    </main>
  );
}
