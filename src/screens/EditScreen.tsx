import Accordian from "@/components/EditListsScreen/Accordian";
import { getCurrentDateTimeSting } from "@/helper/Date";
import { readFileAsync, shareFileAsync } from "@/helper/FileManager";
import { RootState } from "@/redux/Store";
import React, { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Appbar, Menu } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { TodoPart } from "@/Types";
import { v4 as uuidv4 } from "uuid";
import { addTodo, addTodoGroup, importTodos } from "@/redux/reducers/TodoListReducer";

function EditScreen({ navigation, route }: any) {
	const dispatch = useDispatch();

	const currentTodoList = useSelector(
		(state: RootState) => state.todoListReducer.currentTodoList
	);

	function WindowHeader({ listName, goBack }: { listName: string; goBack: any }) {
		const [menuVisible, setMenuVisible] = React.useState(false);
		function imported(v: any) {
			console.log(v);
			// dispatch(
			// 	alterCurrentTodoList({
			// 		...currentTodoList,
			// 		todos: v,
			// 	})
			// );
			// setListData(v);
		}

		return (
			<Appbar.Header style={{ backgroundColor: "#fff" }}>
				<Appbar.BackAction onPress={goBack} />
				<Appbar.Content title="Liste bearbeiten" subtitle={currentTodoList?.listName} />
				<Menu
					anchor={
						<Appbar.Action
							icon="dots-vertical"
							onPress={() => setMenuVisible(true)}
							color="#000"
						/>
					}
					onDismiss={() => setMenuVisible(false)}
					visible={menuVisible}
				>
					<Menu.Item
						title="Importieren"
						onPress={async () => {
							const v = await readFileAsync();
							dispatch(importTodos(v));

							setMenuVisible(false);
						}}
					/>
					<Menu.Item
						title="Exportieren"
						onPress={() => {
							const res: any[] = [];
							Object.values(currentTodoList.todos).forEach((part) => {
								const processedPart = { title: part.title, todos: [] };
								const processedTodos: any = [];
								Object.values(part.todos).forEach((todo) => {
									processedTodos.push({ title: todo.title });
								});
								processedPart.todos = processedTodos;
								res.push(processedPart);
							});
							shareFileAsync(
								JSON.stringify(res),
								`Export-${currentTodoList?.listName.toString()} ${getCurrentDateTimeSting()}.json`
							);
							setMenuVisible(false);
						}}
					/>
				</Menu>
			</Appbar.Header>
		);
	}

	useEffect(() => {
		navigation.setOptions({
			headerShown: false,
			title: `Bearbeiten: ${currentTodoList?.listName}`,
		});
	}, []);

	return (
		<>
			<WindowHeader listName="Test" goBack={navigation.goBack} />
			<View style={styles.container}>
				<Accordian />
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "#fff",
	},
});

export default EditScreen;
