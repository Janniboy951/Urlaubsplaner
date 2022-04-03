import EditTodo from "@/components/EditListsScreen/EditTodo";
import Accordian from "@/components/EditListsScreen/Accordian";
import { getCurrentDateTimeSting } from "@/helper/Date";
import { readFileAsync, shareFileAsync } from "@/helper/FileManager";
import { alterCurrentTodoList, saveCurrentTodoList } from "@/redux/reducers/TodoListReducer";
import { RootState } from "@/redux/Store";
import React, { useEffect } from "react";
import { Text, View, StyleSheet } from "react-native";
import { Appbar, Menu } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { TodoPart } from "@/Types";
import { v4 as uuidv4 } from "uuid";

function EditScreen({ navigation, route }: any) {
	const [listData, setListData] = React.useState<any[]>([]);

	const dispatch = useDispatch();

	const currentTodoList = useSelector(
		(state: RootState) => state.todoListReducer.currentTodoList
	);

	function WindowHeader({ listName, goBack }: { listName: string; goBack: any }) {
		const [menuVisible, setMenuVisible] = React.useState(false);
		function imported(v: any) {
			console.log(v);
			dispatch(
				alterCurrentTodoList({
					...currentTodoList,
					todos: v,
				})
			);
			// setListData(v);
		}

		return (
			<Appbar.Header style={{ backgroundColor: "#fff" }}>
				<Appbar.BackAction onPress={goBack} />
				<Appbar.Content title="Liste bearbeiten" subtitle={currentTodoList?.listName} />
				<Appbar.Action
					icon="content-save"
					onPress={() => {
						dispatch(saveCurrentTodoList({ ...currentTodoList, todoParts: listData }));
					}}
				/>
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
							v.forEach((todoPart: TodoPart) => {
								todoPart.id = uuidv4();
							});

							dispatch(
								alterCurrentTodoList({
									...currentTodoList,
									todos: [...currentTodoList!.todos, ...v],
								})
							);
							setMenuVisible(false);
						}}
					/>
					<Menu.Item
						title="Exportieren"
						onPress={() => {
							shareFileAsync(
								JSON.stringify(currentTodoList?.todos),
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
		setListData(currentTodoList!.todos);
	}, []);

	function renderItem({ item, setHeadChecked, data, setAccordianData }: any) {
		return <EditTodo todo={item} setData={setAccordianData} partData={data} />;
	}
	return (
		<>
			<WindowHeader listName="Test" goBack={navigation.goBack} />
			<View style={styles.container}>
				<Accordian
					accordianListData={currentTodoList!.todos}
					renderItem={renderItem}
					isFooterEnabled={true}
					setAccordianListData={(v) => setListData(v)}
				/>
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
