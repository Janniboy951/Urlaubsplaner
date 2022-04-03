import { alterCurrentTodoList } from "@/redux/reducers/TodoListReducer";
import { RootState } from "@/redux/Store";
import React from "react";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";

import { useDispatch, useSelector } from "react-redux";

function DeleteGroup({
	visible,
	onDismiss,
	id,
}: {
	visible: boolean;
	onDismiss: () => void;
	id: string;
}) {
	const dispatch = useDispatch();
	const currentTodoList = useSelector(
		(state: RootState) => state.todoListReducer.currentTodoList
	);

	function deleteGroup() {
		onDismiss();

		const pos = currentTodoList!.todos.findIndex((v: any) => v.id == id);
		const newTodos: any = currentTodoList!.todos.slice(0);
		newTodos.splice(pos, 1);
		dispatch(alterCurrentTodoList({ ...currentTodoList, todos: newTodos }));
	}

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onDismiss}>
				<Dialog.Title>Gruppe löschen</Dialog.Title>
				<Dialog.Content>
					<Paragraph>
						Möchtest du diese Gruppe mit allen Todos wirklich löschen?
					</Paragraph>
				</Dialog.Content>
				<Dialog.Actions style={{ flexDirection: "column", alignItems: "flex-end" }}>
					<Button onPress={deleteGroup} color="red">
						Löschen
					</Button>
					<Button onPress={onDismiss}>Abbrechen</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}

export default DeleteGroup;
