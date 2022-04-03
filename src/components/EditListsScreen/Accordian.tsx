import DeleteGroupDialog from "@/dialogs/DeleteGroup";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import React, { Dispatch, memo, SetStateAction } from "react";
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useDispatch } from "react-redux";
import AddElement from "../EditListsScreen/AddElement";
import AddNewGroup from "../EditListsScreen/AddGroup";

// type declaration
type AccordianData = {
	id: string;
	title: string;
	todos: AccordianElemenetData[];
	[key: string]: any;
};
type AccordianElemenetData = {
	id: string;
	title: string;
	[key: string]: any;
};

//#region private functions

function _keyExtractor(item: { id: string }, index: number): string {
	return item.id;
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
	title,
	checked,
	onDelete,
}: {
	expanded: boolean;
	title: string;
	checked: boolean;
	onDelete: () => void;
}) {
	return (
		<>
			<View style={{ flexDirection: "row" }}>
				<PartCheckBox checked={checked} />
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
	title,
	data,
	footerEnabled,
	accordianRenderItem,
	onDelete,
}: {
	title: string;
	data: AccordianElemenetData[];
	footerEnabled: boolean;
	accordianRenderItem: any;
	onDelete: () => void;
}) {
	const [expanded, setExpanded] = React.useState(false);
	const [headChecked, setHeadChecked] = React.useState(
		data.filter((todo: any) => todo.finished === true).length == data.length
	);
	const [accordianData, setAccordianData] = React.useState(data);

	React.useEffect(() => {
		setAccordianData(data);
	}, []);

	function _accordian_renderItem({ item }: { item: any }) {
		return accordianRenderItem({
			item,
			setHeadChecked,
			data,
			setAccordianData,
		});
	}

	return (
		<View style={{ width: "100%" }}>
			<TouchableOpacity style={styles.row} onPress={() => setExpanded(!expanded)}>
				<AccordianHead
					expanded={expanded}
					checked={headChecked}
					title={title}
					onDelete={onDelete}
				/>
			</TouchableOpacity>
			<View style={styles.parentHr} />
			{expanded && (
				<FlatList
					style={{ width: "100%" }}
					data={accordianData}
					renderItem={_accordian_renderItem}
					keyExtractor={_keyExtractor}
					initialNumToRender={10}
					removeClippedSubviews={true}
					updateCellsBatchingPeriod={55}
					windowSize={7}
					ListFooterComponent={
						footerEnabled ? <AddElement setData={setAccordianData} data={data} /> : null
					}
				/>
			)}
		</View>
	);
}

// TODO Optimizable
const MemorizedAccordian = React.memo(Accordian, (prevProps, nextProps) => {
	const dataEqual = prevProps.data === nextProps.data;
	const titleEqual = prevProps.title === nextProps.title;
	const accordianRenderItemEqual =
		prevProps.accordianRenderItem === nextProps.accordianRenderItem;
	const footerEnabledEqual = prevProps.footerEnabled === nextProps.footerEnabled;
	return dataEqual && titleEqual && accordianRenderItemEqual && footerEnabledEqual;
});

export default memo(AccordianList);

function AccordianList({
	accordianListData,
	setAccordianListData,
	renderItem,
	isFooterEnabled,
}: {
	accordianListData: any;
	setAccordianListData?: Dispatch<SetStateAction<any>>;
	renderItem: any;
	isFooterEnabled?: boolean;
}) {
	if (setAccordianListData == undefined) {
		setAccordianListData = (v) => {
			console.log(v);
		};
	}

	const [deleteAlertVisible, setDeleteAlertVisible] = React.useState(false);
	const [deleteID, setDeleteID] = React.useState("");

	function deletePart(id: string) {
		setDeleteID(id);
		setDeleteAlertVisible(true);
	}

	// console.log("Load ACCORDIANLIST");
	function _renderAccordianListItem({ item }: { item: AccordianData }): JSX.Element {
		return (
			<MemorizedAccordian
				onDelete={() => deletePart(item.id)}
				title={item.title}
				data={item.todos}
				footerEnabled={isFooterEnabled == true}
				accordianRenderItem={renderItem}
			/>
		);
	}
	return (
		<View style={{ width: "100%" }}>
			<FlatList
				style={{ width: "100%", height: "100%" }}
				data={accordianListData}
				renderItem={_renderAccordianListItem}
				keyExtractor={_keyExtractor}
				ListFooterComponent={isFooterEnabled ? <AddNewGroup /> : null}
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
