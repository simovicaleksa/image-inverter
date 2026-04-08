import init, {
	invert,
	open_image,
	type PhotonImage,
	putImageData,
} from "@silvia-odwyer/photon";
import { canvasToBlob } from "./blob";

let initialized = false;

async function photonInit() {
	if (!initialized) {
		await init();
		initialized = true;
	}
}

export async function invertImage(file: File): Promise<File> {
	await photonInit();

	const bitmap = await createImageBitmap(file);

	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	if (!ctx) {
		throw new Error("Could not get 2D context");
	}

	canvas.width = bitmap.width;
	canvas.height = bitmap.height;

	ctx.drawImage(bitmap, 0, 0);

	const photonImage: PhotonImage = open_image(canvas, ctx);

	invert(photonImage);

	putImageData(canvas, ctx, photonImage);

	const blob = await canvasToBlob(canvas);

	return new File([blob], file.name);
}
