import { RootState } from "@/redux/Store";
import React from "react";
import { View } from "react-native";
import { Colors, ProgressBar } from "react-native-paper";
import { useSelector } from "react-redux";

export default TodoProgressBar;

function TodoProgressBar() {
	const { finishedTodoAmount, totalTodoAmount } = useSelector(
		(state: RootState) => state.checkTodoListReducer.currentList!,
		(l, r) =>
			l.finishedTodoAmount == r.finishedTodoAmount && l.totalTodoAmount == r.totalTodoAmount
	);
	return (
		<View style={{ width: "100%" }}>
			<ProgressBar
				progress={totalTodoAmount != 0 ? finishedTodoAmount / totalTodoAmount : 1}
				color={true ? Colors.blue800 : Colors.red800}
				style={{ height: 21, width: undefined }}
			/>
		</View>
	);
}
