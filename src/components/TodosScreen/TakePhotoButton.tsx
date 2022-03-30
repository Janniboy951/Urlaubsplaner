import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text, StyleSheet, PermissionsAndroid } from "react-native";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";

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
			MediaLibrary.createAlbumAsync(albumName, asset, false);
		} else {
			MediaLibrary.addAssetsToAlbumAsync(asset, urlaubsplanerAlbum, false);
		}
	}
};

export default function TakePhotoButton({ color }: { color: string }) {
	return (
		<View>
			<TouchableOpacity
				onPress={() => {
					takePicture();
				}}
			>
				<MaterialCommunityIcons name="camera" size={25} color={color} />
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({});
