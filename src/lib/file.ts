import { zipSync } from "fflate";

export async function zipFiles(files: File[]) {
	const zipData: Record<string, Uint8Array> = {};

	for (const file of files) {
		const arrayBuffer = await file.arrayBuffer();
		zipData[file.name] = new Uint8Array(arrayBuffer);
	}

	const zipped = zipSync(zipData);

	const blob = new Blob([new Uint8Array(zipped)], {
		type: "application/zip",
	});
	const url = URL.createObjectURL(blob);

	return { blob, url };
}
