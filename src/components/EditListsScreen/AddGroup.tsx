import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import AddGroupDialog from "@/dialogs/AddGroup";

export default function AddNewGroup() {
	const [alertVisible, setAlertVisible] = React.useState(false);

	return (
		<View style={{ width: "100%" }}>
			<AddGroupDialog
				alertVisible={alertVisible}
				dismissAlert={() => setAlertVisible(false)}
			/>

			<TouchableOpacity
				style={styles.row}
				onPress={() => {
					setAlertVisible(true);
				}}
			>
				<View style={{ flexDirection: "row" }}>
					<MaterialCommunityIcons name="folder-plus-outline" color={"blue"} size={30} />
					<Text style={styles.title}>Neue Gruppe hinzufügen</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		color: "blue",
		marginLeft: 10,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		height: 56,
		paddingLeft: 50,
		paddingRight: 18,
		alignItems: "center",
		backgroundColor: "#fff",
	},
});
