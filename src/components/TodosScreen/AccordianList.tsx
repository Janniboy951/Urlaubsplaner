import { RootState } from "@/redux/Store";
import { PerformantTodoPart } from "@/Types";
import _ from "lodash";
import React, { memo } from "react";
import { FlatList, View } from "react-native";
import { useSelector } from "react-redux";
import Accordian from "./Accordian";

//#region private functions

function _keyExtractor(item: { id: string }, index: number): string {
	return item.id;
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
