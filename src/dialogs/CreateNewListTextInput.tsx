import { createTodoList } from "@/redux/reducers/TodoListReducer";
import React, { forwardRef, useImperativeHandle } from "react";
import { TextInput } from "react-native-paper";
import { useDispatch } from "react-redux";

function CreateNewListTextInput(props: any, ref: any) {
	const [newListName, setNewListName] = React.useState("");

	const dispatch = useDispatch();

	useImperativeHandle(
		ref,
		() => ({
			createNewList: () => {
				dispatch(createTodoList(newListName));
				setNewListName("");
			},
		}),
		[newListName]
	);

	return (
		<TextInput
			label="Name"
			defaultValue=""
			mode="outlined"
			onChangeText={(text) => setNewListName(text)}
		/>
	);
}

export default forwardRef(CreateNewListTextInput);
