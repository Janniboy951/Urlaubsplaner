import RadioGroup from "@/components/SelectListsScreen/RadioGroup";
import SeasonSwitch from "@/components/SelectListsScreen/SeasonSwitch";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import "react-native-gesture-handler";
import { Button } from "react-native-paper";

export default function SelectListsScreen({ navigation }: any) {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Liste auswählen</Text>
			<View style={styles.separator} />
			<RadioGroup navigation={navigation} />
			<SeasonSwitch size={75} style={{ marginHorizontal: 10, marginVertical: 20 }} />
			<Button
				icon="check"
				mode="contained"
				onPress={() => navigation.navigate("Todos")}
				style={styles.startButton}
			>
				Loslegen
			</Button>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
	title: {
		marginTop: 70,
		fontSize: 20,
		fontWeight: "bold",
	},
	separator: {
		marginVertical: 30,
		height: 1,
		width: "80%",
		backgroundColor: "#bbb",
	},
	startButton: {
		marginVertical: 25,
		width: "80%",
	},
});
