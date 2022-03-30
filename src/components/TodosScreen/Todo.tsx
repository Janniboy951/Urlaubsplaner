import React, { useEffect } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import TakePhotoButton from "./TakePhotoButton";
import { getCurrentDateTimeSting } from "@/helper/Date";
import { useDispatch } from "react-redux";
import { changeFinishedAmount } from "@/redux/Actions";
import { Todo as TodoType } from "@/Types";

export default React.memo(Todo);

function Todo({
	todo,
	setHeadChecked,
	partData,
}: {
	todo: TodoType;
	setHeadChecked: any;
	partData: any;
}) {
	const [finished, setFinsihed] = React.useState(todo.finished);
	const dispatch = useDispatch();

	function toggleCheck() {
		todo.finished = !todo.finished;
		todo.finishedAt = getCurrentDateTimeSting();
		setFinsihed(todo.finished);
		setHeadChecked(
			partData.filter((todo: any) => todo.finished === true).length == partData.length
		);
		// console.log(partData.filter((todo: any) => todo.finished === true).length, partData.length);

		dispatch(changeFinishedAmount(todo.finished ? 1 : -1));
	}
	useEffect(() => setFinsihed(todo.finished), []);
	// console.log(todo, partData);
	console.log("Load TODO");
	return (
		<View style={{ width: "100%" }}>
			<TouchableOpacity style={styles.row} onPress={toggleCheck}>
				<View style={{ flexDirection: "row" }}>
					<MaterialCommunityIcons
						name={finished ? "check-box-outline" : "checkbox-blank-outline"}
						size={30}
					/>
					<Text style={styles.title}>{todo.title}</Text>
				</View>
				<TakePhotoButton color={todo.pictureNeeded ? "red" : "black"} />
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
