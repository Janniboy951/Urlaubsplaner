import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { getDocumentAsync } from "expo-document-picker";

export async function saveFileAsync(text: string, folder: string, filename: string) {
	if ((await MediaLibrary.getPermissionsAsync()).granted == false) {
		await MediaLibrary.requestPermissionsAsync();
	}
	let fileUri = FileSystem.documentDirectory + filename;
	console.log(fileUri);
	await FileSystem.writeAsStringAsync(fileUri, text, {
		encoding: FileSystem.EncodingType.UTF8,
	});
	const asset = await MediaLibrary.createAssetAsync(fileUri);

	// MediaLibrary usually saves to /Pictures/ or /DCIM/ so adding ../ to get to the Home folder
	await MediaLibrary.createAlbumAsync("../" + folder, asset, false);
}

export async function readFileAsync() {
	let f = await getDocumentAsync({
		type: ["text/plain", "application/json"],
	});
	if (f.type == "success") {
		let fileContent = await FileSystem.readAsStringAsync(f.uri, {
			encoding: FileSystem.EncodingType.UTF8,
		});
		try {
			return JSON.parse(fileContent);
		} catch (error) {
			return {};
		}
	}
	return {};
}
