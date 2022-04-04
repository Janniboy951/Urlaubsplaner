import { PerformantTodoList } from "@/Types";
import ExcelJS from "exceljs";
import * as FileSystem from "expo-file-system";
import { Buffer as NodeBuffer } from "buffer";

export async function generateResultExcel(
	fileName: string,
	todoList: PerformantTodoList
): Promise<string> {
	const now = new Date();
	const fileUri = FileSystem.cacheDirectory + fileName;
	return new Promise<string>((resolve, reject) => {
		const workbook = new ExcelJS.Workbook();
		workbook.creator = "Urlaubsplaner";
		workbook.created = now;
		workbook.modified = now;
		// Add a sheet to work on
		const worksheet = workbook.addWorksheet(todoList.listName, {});
		// Just some columns as used on ExcelJS Readme
		worksheet.columns = [
			{ header: "Gruppe", key: "group", width: 20 },
			{ header: "Todo", key: "todo", width: 40 },
			{ header: "abgehakt um", key: "finishedAt", width: 20 },
			{ header: "Bild Url", key: "pictureUrl", width: 80 },
		];

		const rowData: {
			group: string;
			todo: string;
			finishedAt: string;
			pictureUrl: string | any;
		}[] = [];
		// Add some test data
		Object.values(todoList.todos).forEach((part) => {
			Object.values(part.todos).forEach((todo) => {
				rowData.push({
					group: part.title,
					todo: todo.title,
					finishedAt: todo.finishedAt || "",
					pictureUrl: todo.pictureUri || "None",
				});
			});
		});

		worksheet.addRows(rowData);
		worksheet.autoFilter = "A1:D1";

		// Test styling
		// Style first row
		worksheet.getRow(1).font = {
			size: 12,
			bold: true,
		};

		// Write to file
		workbook.xlsx.writeBuffer().then((buffer: ExcelJS.Buffer) => {
			// Do this to use base64 encoding
			const nodeBuffer = NodeBuffer.from(buffer);
			const bufferStr = nodeBuffer.toString("base64");
			FileSystem.writeAsStringAsync(fileUri, bufferStr, {
				encoding: FileSystem.EncodingType.Base64,
			}).then(() => {
				resolve(fileUri);
			});
		});
	});
}
