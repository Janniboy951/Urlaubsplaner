import React, { memo } from "react";
import { View, StyleSheet, FlatList } from "react-native";
import { PerformantTodoList, PerformantTodoPart } from "@/Types";
import Accordian from "./Accordian";
import _ from "lodash";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";

//#region private functions

function _keyExtractor(item: { id: string }, index: number): string {
	return item.id;
}
function isEqual(
	prev: Readonly<{
		accordianListData: PerformantTodoList;
	}>,
	next: Readonly<{
		accordianListData: PerformantTodoList;
	}>
): boolean {
	return _.isEqual(
		Object.values(prev.accordianListData.todos).map((v) => v.id),
		Object.values(next.accordianListData.todos).map((v) => v.id)
	);
}

//#endregion

export default memo(AccordianList);

function _renderAccordianListItem({ item }: { item: PerformantTodoPart }): JSX.Element {
	return <Accordian id={item.id} />;
}

function AccordianList() {
	const currentTodoList = useSelector(
		(state: RootState) => Object.values(state.checkTodoListReducer.currentList!.todos),
		(l, r) =>
			_.isEqual(
				l.map((v) => v.id),
				r.map((v) => v.id)
			)
	);

	console.log("Load ACCORDIANLIST");

	return (
		<View style={{ width: "100%" }}>
			<FlatList
				style={{ width: "100%", height: "100%" }}
				data={currentTodoList}
				renderItem={_renderAccordianListItem}
				keyExtractor={_keyExtractor}
			></FlatList>
		</View>
	);
}

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		fontWeight: "bold",
		color: "#000",
		marginLeft: 10,
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		height: 56,
		paddingLeft: 20,
		paddingRight: 18,
		alignItems: "center",
		backgroundColor: "#fff",
	},
	parentHr: {
		height: 1,
		color: "#ffffff",
		width: "100%",
	},
	child: {
		backgroundColor: "#999999",
		padding: 0,
	},
});
