"use client";

import { ClearButton } from "~/components/clear-button";
import { Dropzone } from "~/components/dropzone";
import { FileItem } from "~/components/file-item";
import { Footer } from "~/components/footer";
// import { Signature } from "~/components/signature";

import { useFiles } from "~/hooks/use-files";

export default function HomePage() {
	const { files } = useFiles();
	const filesEmpty = files.length === 0;

	return (
		<main className="my-20 flex size-full justify-center">
			<section className="flex size-full max-w-xl flex-col gap-10 p-8">
				<div className="flex flex-col items-center justify-center text-center">
					{/*<Signature />*/}
					<h1 className="mb-2 font-bold text-4xl">Image Inverter</h1>
					<p className="text-muted-foreground">
						Scan your film online for free!
					</p>
				</div>

				<Dropzone />

				{!filesEmpty && (
					<div className="flex flex-col gap-3">
						<div className="flex flex-row items-center justify-between">
							<span className="text-muted-foreground text-sm">{`${files.length} ${files.length === 1 ? "image" : "images"}`}</span>
							<ClearButton />
						</div>

						<div className="flex flex-col gap-2">
							{files.map((item) => (
								<FileItem item={item} key={item.id} />
							))}
						</div>
					</div>
				)}
			</section>
			<Footer />
		</main>
	);
}
