import AccordianList from "@/components/TodosScreen/Accordian";
import Todo from "@/components/TodosScreen/Todo";
import { resetFinishedAmount } from "@/redux/Actions";
import { RootState } from "@/redux/Store";
import { TodoList } from "@/Types";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-get-random-values";
import { Colors, FAB, ProgressBar } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

function renderItem({ item, setHeadChecked, data }: any) {
	return <Todo todo={item} setHeadChecked={setHeadChecked} partData={data} />;
}

export default function TodosScreen({ navigation }: any) {
	const {
		currentTodoList,
		currentFinishedAmount,
	}: { currentTodoList: TodoList | undefined; currentFinishedAmount: number } = useSelector(
		(state: RootState) => state.todoListReducer
	);
	const dispatch = useDispatch();

	let todoAmount = 0;
	if (currentTodoList) {
		currentTodoList.todos.forEach((todoPart) => {
			todoAmount += todoPart.todos.length;
		});
	}
	if (todoAmount == 0) {
		todoAmount = -1;
	}

	useEffect(() => {
		navigation.setOptions({ title: "Todos: " + currentTodoList?.listName });
		dispatch(resetFinishedAmount());
	}, []);

	return (
		<View style={styles.container}>
			<View style={{ width: "100%" }}>
				<ProgressBar
					progress={currentFinishedAmount / todoAmount}
					color={true ? Colors.blue800 : Colors.red800}
					style={{ height: 21, width: undefined }}
				/>
			</View>

			<AccordianList
				accordianListData={currentTodoList?.todos}
				setAccordianListData={() => {}} // edited
				renderItem={renderItem}
			/>
			<FAB
				visible={currentFinishedAmount == todoAmount}
				icon="briefcase-check-outline"
				style={styles.fab}
				color="white"
				onPress={() => {
					navigation.goBack();
				}} // edited
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		height: "100%",
		backgroundColor: "#fff",
	},
	fab: {
		position: "absolute",
		margin: 16,
		right: 0,
		bottom: 0,
		backgroundColor: "blue",
	},
	title: {
		marginTop: 30,
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
	},
});
