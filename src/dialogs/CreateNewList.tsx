import { addTodoList } from "@/redux/Actions";
import React, { memo } from "react";
import { Button, Dialog, Portal, TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import { test } from "@/ExampleData";
import { TodoList } from "@/Types";

function CreateNewListDialog({ visible, onDismiss }: { visible: boolean; onDismiss: () => void }) {
	console.log("rerender CreateNewListDialog");
	const [newListName, setNewListName] = React.useState("");

	const dispatch = useDispatch();

	function createNewList() {
		dispatch(addTodoList({ listID: uuidv4(), listName: newListName, todos: [] } as TodoList));
		onDismiss();
		setNewListName("");
	}

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onDismiss}>
				<Dialog.Title>Neue Liste hinzufügen</Dialog.Title>
				<Dialog.Content>
					<TextInput
						label="Name"
						value={newListName}
						mode="outlined"
						onChangeText={(text) => setNewListName(text)}
					/>
				</Dialog.Content>
				<Dialog.Actions>
					<Button onPress={createNewList}>Ok</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}

export default memo(CreateNewListDialog);
