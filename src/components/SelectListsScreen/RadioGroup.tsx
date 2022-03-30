import CreateNewListDialog from "@/dialogs/CreateNewList";
import { setCurrentTodoList } from "@/redux/Actions";
import { RootState } from "@/redux/Store";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useEffect, useLayoutEffect } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import "react-native-get-random-values";
import { useDispatch, useSelector } from "react-redux";

function RadioItem({
	checked,
	item,
	onSelect,
	onEdit,
}: {
	checked: boolean;
	item: any;
	onSelect: (id: string) => void;
	onEdit: (id: string) => void;
}) {
	console.log("rerender", "RadioItem");
	return (
		<TouchableOpacity style={styles.radioButtonOpacity} onPress={() => onSelect(item.listID)}>
			<View style={styles.radioButtonView}>
				<MaterialCommunityIcons
					name={checked ? "radiobox-marked" : "radiobox-blank"}
					size={25}
					color="blue"
				/>
				<Text style={styles.radioButtonText}>{item.listName}</Text>
			</View>
			<TouchableOpacity onPress={() => onEdit(item.listID)}>
				<MaterialCommunityIcons name={"pencil"} size={25} style={styles.radioButtonEdit} />
			</TouchableOpacity>
		</TouchableOpacity>
	);
}
const MemorizedRadioItem = React.memo(RadioItem);

function SelectListRadio({ navigation }: any) {
	const dispatch = useDispatch();
	console.log("rerender", "SelectListRadio");

	// Callbacks
	const dismissCreateNewList = useCallback(() => setAddListAlertVisible(false), []);
	const selectCurrentList = useCallback((id) => {
		setValue(id);
		dispatch(setCurrentTodoList(id));
	}, []);
	const editList = useCallback((id: string) => {
		dispatch(setCurrentTodoList(id));
		navigation.navigate("EditList");
	}, []);

	// States
	const todoLists: any[] = useSelector((state: RootState) => state.todoListReducer.todoLists);
	const [value, setValue] = React.useState("");
	const [addListAlertVisible, setAddListAlertVisible] = React.useState(false);

	useFocusEffect(() => {
		if (todoLists.length > 0) {
			setValue(todoLists[0]!.listID);
			dispatch(setCurrentTodoList(todoLists[0]!.listID));
		}
	});

	// Inner Functions
	function listFooter() {
		return (
			<TouchableOpacity
				style={styles.footerOpacity}
				onPress={() => setAddListAlertVisible(true)}
			>
				<MaterialCommunityIcons name="playlist-plus" size={20} color="blue" />
				<Text style={styles.addListText}>Neue Liste erstellen</Text>
			</TouchableOpacity>
		);
	}

	function renderItem({ item }: { item: any }) {
		return (
			<MemorizedRadioItem
				checked={value == item.listID}
				item={item}
				onSelect={selectCurrentList}
				onEdit={editList}
			/>
		);
	}

	return (
		<>
			<FlatList
				data={todoLists}
				style={{ width: "80%" }}
				renderItem={renderItem}
				keyExtractor={(item) => item.listID}
				ListFooterComponent={listFooter}
			/>
			<CreateNewListDialog visible={addListAlertVisible} onDismiss={dismissCreateNewList} />
		</>
	);
}

const styles = StyleSheet.create({
	addListText: {
		color: "blue",
		fontWeight: "bold",
		marginStart: 3,
	},
	radioButtonOpacity: {
		flexDirection: "row",
		alignItems: "center",
		margin: 5,
		width: "100%",
		justifyContent: "space-between",
	},
	radioButtonText: { marginStart: 10 },
	radioButtonView: {
		flexDirection: "row",
		alignItems: "center",
		margin: 5,
	},
	radioButtonEdit: {
		margin: 2,
	},
	footerOpacity: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		marginTop: "1%",
	},
});

export default React.memo(SelectListRadio);
