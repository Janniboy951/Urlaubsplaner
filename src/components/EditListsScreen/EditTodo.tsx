import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { removeTodo } from "@/redux/reducers/TodoListReducer";
import { RootState } from "@/redux/Store";

export default React.memo(EditTodo);

function EditTodo({ todoID, partID }: { todoID: string; partID: string }) {
	const [confirmDeleteVisible, setConfirmDeleteVisible] = React.useState(false);
	const dispatch = useDispatch();
	const thisTodo = useSelector(
		(state: RootState) => state.todoListReducer.currentTodoList.todos[partID].todos[todoID]
	);

	function deleteItem() {
		dispatch(removeTodo({ todoID: thisTodo.id, partID: partID }));
	}
	return (
		<View style={{ width: "100%" }}>
			<View style={styles.row}>
				<View style={{ flexDirection: "row" }}>
					<MaterialCommunityIcons name="checkbox-intermediate" size={30} color="black" />
					<Text style={styles.title}>{thisTodo.title}</Text>
				</View>
				<View style={{ flexDirection: "row" }}>
					<TouchableOpacity onPress={() => setConfirmDeleteVisible(true)}>
						<MaterialCommunityIcons name="delete-outline" size={30} color="#b00" />
					</TouchableOpacity>
					<Portal>
						<Dialog
							visible={confirmDeleteVisible}
							onDismiss={() => setConfirmDeleteVisible(false)}
						>
							<Dialog.Title>Wirklich löschen?</Dialog.Title>
							<Dialog.Actions>
								<Button onPress={() => setConfirmDeleteVisible(false)}>Nein</Button>
								<Button onPress={deleteItem}>Ja</Button>
							</Dialog.Actions>
						</Dialog>
					</Portal>
				</View>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		color: "#666666",
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
