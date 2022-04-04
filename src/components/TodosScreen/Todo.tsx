import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import TakePhotoButton from "./TakePhotoButton";
import { useDispatch, useSelector } from "react-redux";
import { checkTodo } from "@/redux/reducers/CheckTodoListReducer";
import { RootState } from "@/redux/Store";

export default React.memo(Todo);

function sleep(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

function Todo({ todoID, partID }: { todoID: string; partID: string }) {
	const dispatch = useDispatch();
	const thisTodo = useSelector(
		(state: RootState) => state.checkTodoListReducer.currentList!.todos[partID].todos[todoID]
	);
	const [checked, setChecked] = React.useState(thisTodo.finished || false);

	async function toggleCheck() {
		setChecked(!checked);
		await sleep(0); // Somehow its getting faster
		dispatch(checkTodo({ partID, todoID }));
	}
	// 	console.log("load todo");
	return (
		<View style={{ width: "100%" }}>
			<TouchableOpacity style={styles.row} onPress={toggleCheck}>
				<View style={{ flexDirection: "row" }}>
					<MaterialCommunityIcons
						name={checked ? "check-box-outline" : "checkbox-blank-outline"}
						size={30}
					/>
					<Text style={styles.title}>{thisTodo.title}</Text>
				</View>
				<TakePhotoButton
					color={thisTodo.pictureUri ? "green" : thisTodo.pictureNeeded ? "red" : "black"}
					todoID={todoID}
					partID={partID}
				/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		color: "#666666",
		marginLeft: 10,
		flexWrap: "wrap",
		width: 220,
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
