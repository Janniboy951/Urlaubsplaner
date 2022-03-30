import { Ionicons } from "@expo/vector-icons";
import React, { memo } from "react";
import { StyleProp, TextStyle, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { setSeason } from "@/redux/Actions";
import { RootState } from "@/redux/Store";

export default memo(SeasonSwitch);

function SeasonSwitch({ size, style }: { size?: number; style?: StyleProp<TextStyle> }) {
	const { season } = useSelector((state: RootState) => state.todoListReducer);

	const dispatch = useDispatch();

	function changeSeason() {
		dispatch(setSeason(season == "WINTER" ? "SUMMER" : "WINTER"));
	}

	return (
		<TouchableOpacity onPress={changeSeason}>
			<Ionicons
				name={season == "SUMMER" ? "sunny" : "snow"}
				size={size}
				color={season == "SUMMER" ? "#fb0" : "#0bf"}
				style={style}
			/>
		</TouchableOpacity>
	);
}
