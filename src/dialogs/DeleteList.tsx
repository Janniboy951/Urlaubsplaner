import { removeTodoList } from "@/redux/reducers/TodoListReducer";
import { removeTodoList as removeCurrentTodolist } from "@/redux/reducers/CheckTodoListReducer";
import { RootState } from "@/redux/Store";
import React from "react";
import { Button, Dialog, Paragraph, Portal } from "react-native-paper";
// import Button from "react-native-paper/lib/typescript/components/Button";
// import Dialog from "react-native-paper/lib/typescript/components/Dialog/Dialog";
// import Portal from "react-native-paper/lib/typescript/components/Portal/Portal";
// import Paragraph from "react-native-paper/lib/typescript/components/Typography/Paragraph";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function DeleteList({
	visible,
	onDismiss,
	id,
}: {
	visible: boolean;
	onDismiss: () => void;
	id: string;
}) {
	const dispatch = useDispatch();

	const deleteList = () => {
		onDismiss();
		dispatch(removeTodoList(id));
		dispatch(removeCurrentTodolist(id));
	};

	return (
		<Portal>
			<Dialog visible={visible} onDismiss={onDismiss}>
				<Dialog.Title>Liste löschen</Dialog.Title>
				<Dialog.Content>
					<Paragraph>Möchtest du diese Liste wirklich löschen?</Paragraph>
				</Dialog.Content>
				<Dialog.Actions style={{ flexDirection: "column", alignItems: "flex-end" }}>
					<Button onPress={deleteList} color="red">
						Löschen
					</Button>
					{/* <Button onPress={() => {}}>Exportieren und löschen</Button> */}
					<Button onPress={onDismiss}>Abbrechen</Button>
				</Dialog.Actions>
			</Dialog>
		</Portal>
	);
}

export default DeleteList;
