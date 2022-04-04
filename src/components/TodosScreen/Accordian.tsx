import { PerformantTodo, PerformantTodoPart } from "@/Types";
import React, { memo } from "react";
import { View, TouchableOpacity, FlatList, StyleSheet, Text } from "react-native";
import Todo from "@/components/TodosScreen/Todo";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import FontAwesome from "@expo/vector-icons/build/FontAwesome";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/Store";
import _ from "lodash";

function PartCheckBox({ checked }: { checked: boolean }): JSX.Element {
	if (checked) {
		return (
			<MaterialCommunityIcons name="checkbox-marked-circle-outline" color="green" size={30} />
		);
	} else {
		return (
			<MaterialCommunityIcons name="checkbox-blank-circle-outline" color="black" size={30} />
		);
	}
}
const MemodAccordianHead = memo(AccordianHead);

function AccordianHead({ expanded, id }: { expanded: boolean; id: string }) {
	// 	console.log("RENDER ACCORDIANHEAD");
	const checked = useSelector(
		(state: RootState) => state.checkTodoListReducer.currentList!.todos[id].checked
	);
	const title = useSelector(
		(state: RootState) => state.checkTodoListReducer.currentList!.todos[id].title
	);
	return (
		<>
			<View style={{ flexDirection: "row" }}>
				<PartCheckBox checked={checked} />
				<Text style={styles.title}>{title}</Text>
			</View>
			<FontAwesome name={expanded ? "angle-up" : "angle-down"} size={30} color="#777" />
		</>
	);
}
function _keyExtractor(item: string): string {
	return item;
}

function Accordian({ id }: { id: string }) {
	const [expanded, setExpanded] = React.useState(false);

	const newTodos = useSelector(
		(state: RootState) =>
			Object.values(state.checkTodoListReducer.currentList!.todos[id].todos).map((v) => v.id),
		(l, r) => _.isEqual(l, r)
	);

	// 	console.log("RERENDER ACCORDIAN");
	function renderItem({ item }: { item: string }) {
		return <Todo todoID={item} partID={id} />;
	}
	return (
		<View style={{ width: "100%" }}>
			<TouchableOpacity style={styles.row} onPress={() => setExpanded(!expanded)}>
				<MemodAccordianHead expanded={expanded} id={id} />
			</TouchableOpacity>
			<View style={styles.parentHr} />
			{expanded && (
				<FlatList
					style={{ width: "100%" }}
					data={newTodos}
					renderItem={renderItem}
					keyExtractor={_keyExtractor}
					initialNumToRender={10}
					removeClippedSubviews={true}
					updateCellsBatchingPeriod={55}
					windowSize={7}
				/>
			)}
		</View>
	);
}

export default memo(Accordian, (prev, next) => _.isEqual(prev, next));

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
