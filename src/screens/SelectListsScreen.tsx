import RadioGroup from "@/components/SelectListsScreen/RadioGroup";
import SeasonSwitch from "@/components/SelectListsScreen/SeasonSwitch";
import { addTodoList, selectTodoList } from "@/redux/reducers/CheckTodoListReducer";
import { RootState } from "@/redux/Store";
import { convertToPerformant } from "@/Types";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { Button } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

export default function SelectListsScreen({ navigation }: any) {
	const dispatch = useDispatch();
	const currentTodoList = useSelector(
		(state: RootState) => state.todoListReducer.currentTodoList
	);
	const editingTodoLists = useSelector(
		(state: RootState) => state.checkTodoListReducer.todoLists
	);
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Liste auswählen</Text>
			<View style={styles.separator} />
			<RadioGroup navigation={navigation} />
			<SeasonSwitch size={75} style={{ marginHorizontal: 10, marginVertical: 20 }} />
			<Button
				icon="check"
				mode="contained"
				onPress={() => {
					if (Object.keys(editingTodoLists).indexOf(currentTodoList!.listID) == -1) {
						console.log("ADD to Lists");
						dispatch(addTodoList(currentTodoList));
					}

					dispatch(selectTodoList(currentTodoList!.listID));
					navigation.navigate("Todos");
				}}
				style={styles.startButton}
			>
				Loslegen
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		marginTop: 70,
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
		backgroundColor: "#bbb",
	},
	startButton: {
		marginVertical: 25,
		width: "80%",
	},
});
