import AccordianList from "@/components/TodosScreen/AccordianList";
import TodoProgressBar from "@/components/TodosScreen/TodoProgressBar";
import { getCurrentDateTimeSting } from "@/helper/Date";
import { generateResultExcel } from "@/helper/Excel";
import { shareExcelFile } from "@/helper/FileManager";
import { removeTodoList } from "@/redux/reducers/CheckTodoListReducer";
import { RootState } from "@/redux/Store";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import "react-native-get-random-values";
import { FAB } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";

export default function TodosScreen({ navigation }: any) {
	const listName = useSelector(
		(state: RootState) => state.checkTodoListReducer.currentList!.listName
	);
	const listID = useSelector(
		(state: RootState) => state.checkTodoListReducer.currentList!.listID
	);
	const finishedList = useSelector(
		(state: RootState) => state.checkTodoListReducer.currentList!,
		(l, r) =>
			(l.finishedTodoAmount == l.totalTodoAmount) ==
			(r.finishedTodoAmount == r.totalTodoAmount)
	);

	const dispatch = useDispatch();

	useEffect(() => {
		navigation.setOptions({ title: listName });
	}, []);
	console.log("RENDER TODOSCREEN");

	return (
		<View style={styles.container}>
			<TodoProgressBar />

			<AccordianList />
			<FAB
				visible={finishedList.finishedTodoAmount == finishedList.totalTodoAmount}
				icon="briefcase-check-outline"
				style={styles.fab}
				color="white"
				onPress={async () => {
					await shareExcelFile(
						await generateResultExcel(
							`Urlaubsplaner-TodoListe-${
								finishedList.listName
							}-${getCurrentDateTimeSting()}.xlsx`,
							finishedList
						)
					);
					// maybe need to remove currentTodolist too
					dispatch(removeTodoList(listID));
					navigation.goBack();
				}}
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
