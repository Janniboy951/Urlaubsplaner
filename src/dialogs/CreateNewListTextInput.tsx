import { addTodoList } from "@/redux/actions/Actions";
import { TodoList } from "@/Types";
import React, { forwardRef, useImperativeHandle } from "react";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";
import { v4 as uuidv4 } from "uuid";

function CreateNewListTextInput(props: any, ref: any) {
	const [newListName, setNewListName] = React.useState("");

	const dispatch = useDispatch();

	useImperativeHandle(
		ref,
		() => ({
			createNewList: () => {
				console.log(newListName, "asd");
				dispatch(
					addTodoList({ listID: uuidv4(), listName: newListName, todos: [] } as TodoList)
				);
				setNewListName("");
			},
		}),
		[newListName]
	);

	return (
		<TextInput
			label="Name"
			value={newListName}
			mode="outlined"
			onChangeText={(text) => setNewListName(text)}
		/>
	);
}

export default forwardRef(CreateNewListTextInput);
