import * as MediaLibrary from "expo-media-library";
import * as FileSystem from "expo-file-system";
import { isAvailableAsync as isShareAvailableAsync, shareAsync } from "expo-sharing";
import { getDocumentAsync } from "expo-document-picker";
import { IO_TodoList } from "@/Types";

export async function saveFileAsync(text: string, folder: string, filename: string) {
	if ((await MediaLibrary.getPermissionsAsync()).granted == false) {
		await MediaLibrary.requestPermissionsAsync();
	}
	let fileUri = FileSystem.documentDirectory + filename;
	// 	console.log(fileUri);
	await FileSystem.writeAsStringAsync(fileUri, text, {
		encoding: FileSystem.EncodingType.UTF8,
	});
	const asset = await MediaLibrary.createAssetAsync(fileUri);

	// MediaLibrary usually saves to /Pictures/ or /DCIM/ so adding ../ to get to the Home folder
	await MediaLibrary.createAlbumAsync("../" + folder, asset, false);
}

export async function shareFileAsync(text: string, filename: string) {
	if (await isShareAvailableAsync()) {
		let fileUri = FileSystem.documentDirectory + filename;
		await FileSystem.writeAsStringAsync(fileUri, text, {
			encoding: FileSystem.EncodingType.UTF8,
		});
		await shareAsync(fileUri, {
			dialogTitle: `Save ${filename}`,
			mimeType: "application/json",
		});
	}
}

export async function shareExcelFile(excelFileUri: string) {
	shareAsync(excelFileUri, {
		mimeType: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
		dialogTitle: "Save finished list",
		UTI: "com.microsoft.excel.xlsx", // iOS
	}).catch((error) => {
		console.error("Error", error);
	});
}

export async function readCsvFileAsync() {
	let f = await getDocumentAsync();
	if (f.type == "success") {
		const str = await FileSystem.readAsStringAsync(f.uri, { encoding: "utf8" });
		const data = str.split("\n");
		data.shift(); // remove first line

		const todos: IO_TodoList = [];
		let prevGroup: string | undefined = undefined;
		data.forEach((line: string) => {
			const splitted = line.split(";");
			if (splitted[0] && splitted[1]) {
				if (splitted[0] !== prevGroup) {
					todos.push({ title: splitted[0], todos: [] });
					prevGroup = splitted[0];
				}
				todos[todos.length - 1].todos.push({
					title: splitted[1],
					pictureNeeded: splitted[2][0] == "1",
				});
			}
		});
		return todos;
	}
	return [];
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
