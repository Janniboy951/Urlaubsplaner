import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import "react-native-get-random-values";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { addTodo } from "@/redux/reducers/TodoListReducer";

export default function AddTodo({ partID }: { partID: string }) {
	const [alertVisible, setAlertVisible] = React.useState(false);
	const [newElementName, setNewElementName] = React.useState("");
	const dispatch = useDispatch();

	const submitAlert = () => {
		setAlertVisible(false);
		dispatch(addTodo({ name: newElementName, partID: partID }));
		setNewElementName("");
	}; // setData((prevValue: any) => [...prevValue, newGroup]);
	// data.push(newGroup);

	return (
		<View style={{ width: "100%" }}>
			<Portal>
				<Dialog visible={alertVisible} onDismiss={() => setAlertVisible(false)}>
					<Dialog.Title>Neues Todo hinzufügen</Dialog.Title>
					<Dialog.Content>
						<TextInput
							label="Name"
							defaultValue=""
							mode="outlined"
							onChangeText={(text) => setNewElementName(text)}
						></TextInput>
					</Dialog.Content>
					<Dialog.Actions>
						<Button onPress={submitAlert}>Ok</Button>
					</Dialog.Actions>
				</Dialog>
			</Portal>
			<TouchableOpacity
				style={styles.row}
				onPress={() => {
					setAlertVisible(true);
				}}
			>
				<View style={{ flexDirection: "row" }}>
					<MaterialCommunityIcons name="card-plus-outline" color={"blue"} size={30} />
					<Text style={styles.title}>Neues Todo hinzufügen</Text>
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
