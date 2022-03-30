import { alterCurrentTodoList } from "@/redux/Actions";
import { RootState } from "@/redux/Store";
import React from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function AddGroup({
	alertVisible,
	dismissAlert,
}: {
	alertVisible: boolean;
	dismissAlert: () => void;
}) {
	console.log("UPDATE");

	const dispatch = useDispatch();
	const { currentTodoList } = useSelector((state: RootState) => state.todoListReducer);

	const submitAlert = () => {
		dismissAlert();
		let newGroup = {
			id: uuidv4(),
			title: newGroupName,
			todos: [],
		};
		dispatch(
			alterCurrentTodoList({
				...currentTodoList,
				todos: [...currentTodoList?.todos, newGroup],
			})
		);

		setNewGroupName("");
	};

	const [newGroupName, setNewGroupName] = React.useState("");
	return (
		<Portal>
			<Dialog visible={alertVisible} onDismiss={dismissAlert}>
				<Dialog.Title>Neue Gruppe hinzufügen</Dialog.Title>
				<Dialog.Content>
					<TextInput
						label="Name"
						value={newGroupName}
						mode="outlined"
						onChangeText={(text) => setNewGroupName(text)}
					></TextInput>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={submitAlert}>Ok</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}

export default AddGroup;
