import { addTodoGroup } from "@/redux/reducers/TodoListReducer";
import React from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";

function AddGroup({
	alertVisible,
	dismissAlert,
}: {
	alertVisible: boolean;
	dismissAlert: () => void;
}) {
	// 	console.log("UPDATE");

	const dispatch = useDispatch();

	const submitAlert = () => {
		dismissAlert();
		dispatch(addTodoGroup(newGroupName));
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
						defaultValue=""
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
