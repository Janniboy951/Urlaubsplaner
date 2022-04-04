import { tookPhoto } from "@/redux/reducers/CheckTodoListReducer";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

const takePicture = async () => {
	if ((await (await ImagePicker.getCameraPermissionsAsync()).granted) == false) {
		await ImagePicker.requestCameraPermissionsAsync();
	}
	await MediaLibrary.requestPermissionsAsync();

	let img = await ImagePicker.launchCameraAsync({
		mediaTypes: ImagePicker.MediaTypeOptions.Images,
	});
	if (!img.cancelled) {
		const asset = await MediaLibrary.createAssetAsync(img.uri);
		const albumName =
			"Urlaubsplaner - " +
			new Date().getDate() +
			"." +
			(new Date().getMonth() + 1) +
			"." +
			new Date().getFullYear();
		let urlaubsplanerAlbum = await MediaLibrary.getAlbumAsync(albumName);

		if (urlaubsplanerAlbum == null) {
			await MediaLibrary.createAlbumAsync(albumName, asset, false);
		} else {
			await MediaLibrary.addAssetsToAlbumAsync(asset, urlaubsplanerAlbum, false);
		}
		return (
			(
				await MediaLibrary.getAssetsAsync({
					album: urlaubsplanerAlbum,
					sortBy: ["creationTime"],
					first: 5,
				})
			).assets.filter(
				(foundAsset) =>
					foundAsset.filename == asset.filename &&
					foundAsset.creationTime == asset.creationTime
			)[0].uri || undefined
		);
	}
	return undefined;
};

export default function TakePhotoButton({
	color,
	partID,
	todoID,
}: {
	color: string;
	partID: string;
	todoID: string;
}) {
	const dispatch = useDispatch();
	return (
		<View>
			<TouchableOpacity
				onPress={async () => {
					const pictureUri = await takePicture();
					dispatch(tookPhoto({ partID: partID, todoID: todoID, pictureUri: pictureUri }));
				}}
			>
				<MaterialCommunityIcons name="camera" size={25} color={color} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({});
