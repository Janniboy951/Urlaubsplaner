import DeleteGroupDialog from "@/dialogs/DeleteGroup";
import { RootState } from "@/redux/Store";
import { PerformantTodo, PerformantTodoPart } from "@/Types";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import _ from "lodash";
import React, { Dispatch, memo, SetStateAction } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import AddElement from "../EditListsScreen/AddElement";
import AddNewGroup from "../EditListsScreen/AddGroup";
import EditTodo from "./EditTodo";

//#region private functions

function _keyExtractor(item: string, index: number): string {
	return item;
}
//#endregion

function PartCheckBox({ checked }: { checked: boolean }): JSX.Element {
	// console.log("Load PartCheckBox");
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

function AccordianHead({
	expanded,
	id,
	onDelete,
}: {
	expanded: boolean;
	id: string;
	onDelete: () => void;
}) {
	const title = useSelector(
		(state: RootState) => state.todoListReducer.currentTodoList.todos[id].title
	);
	return (
		<>
			<View style={{ flexDirection: "row" }}>
				<PartCheckBox checked={false} />
				<Text style={styles.title}>{title}</Text>
			</View>
			<View style={{ flexDirection: "row" }}>
				<FontAwesome
					name={expanded ? "angle-up" : "angle-down"}
					size={30}
					color="#777"
					style={{ marginEnd: 10 }}
				/>
				<TouchableOpacity onPress={onDelete}>
					<MaterialCommunityIcons name="delete-outline" size={30} color="#b00" />
				</TouchableOpacity>
			</View>
		</>
	);
}

function Accordian({
	id,
	onDelete,
}: {
	id: string;

	onDelete: () => void;
}) {
	const [expanded, setExpanded] = React.useState(false);

	const newTodos = useSelector(
		(state: RootState) => Object.values(state.todoListReducer.currentTodoList.todos[id].todos),
		(l, r) => _.isEqual(l, r)
	);

	console.log(newTodos, "asd");
	function renderItem({ item }: { item: PerformantTodo }) {
		return <EditTodo todoID={item.id} partID={id} />;
	}

	return (
		<View style={{ width: "100%" }}>
			<TouchableOpacity style={styles.row} onPress={() => setExpanded(!expanded)}>
				<AccordianHead expanded={expanded} id={id} onDelete={onDelete} />
			</TouchableOpacity>
			<View style={styles.parentHr} />
			{expanded && (
				<FlatList
					style={{ width: "100%" }}
					data={newTodos}
					renderItem={renderItem}
					keyExtractor={_listKeyExtractor}
					initialNumToRender={10}
					removeClippedSubviews={true}
					updateCellsBatchingPeriod={55}
					windowSize={7}
					ListFooterComponent={<AddElement partID={id} />}
				/>
			)}
		</View>
	);
}

// TODO Optimizable
const MemorizedAccordian = React.memo(Accordian);

export default memo(AccordianList);

function _listKeyExtractor(item: { id: string }, index: number): string {
	return item.id;
}

function AccordianList({
	setAccordianListData,
}: {
	setAccordianListData?: Dispatch<SetStateAction<any>>;
}) {
	if (setAccordianListData == undefined) {
		setAccordianListData = (v) => {
			console.log(v);
		};
	}
	const currentTodoList = useSelector(
		(state: RootState) => Object.values(state.todoListReducer.currentTodoList.todos),
		(l, r) =>
			_.isEqual(
				l.map((v) => v.id),
				r.map((v) => v.id)
			)
	);

	const [deleteAlertVisible, setDeleteAlertVisible] = React.useState(false);
	const [deleteID, setDeleteID] = React.useState("");

	function deletePart(id: string) {
		setDeleteID(id);
		setDeleteAlertVisible(true);
	}

	// console.log("Load ACCORDIANLIST");
	function _renderAccordianListItem({ item }: { item: PerformantTodoPart }): JSX.Element {
		return <MemorizedAccordian onDelete={() => deletePart(item.id)} id={item.id} />;
	}
	return (
		<View style={{ width: "100%" }}>
			<FlatList
				style={{ width: "100%", height: "100%" }}
				data={currentTodoList}
				renderItem={_renderAccordianListItem}
				keyExtractor={_listKeyExtractor}
				ListFooterComponent={<AddNewGroup />}
			></FlatList>
			<DeleteGroupDialog
				visible={deleteAlertVisible}
				onDismiss={() => setDeleteAlertVisible(false)}
				id={deleteID}
			/>
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
