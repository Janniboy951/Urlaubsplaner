import { persistor, Store } from "@/redux/Store";
import EditScreen from "@/screens/EditScreen";
import SelectListsScreen from "@/screens/SelectListsScreen";
import TodoScreen from "@/screens/TodoScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import React from "react";
import "react-native-gesture-handler";
import { Provider as ReactNativePaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider as ReactReduxProvider } from "react-redux";
import { PersistGate } from "redux-persist/lib/integration/react";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<ReactReduxProvider store={Store}>
			<PersistGate loading={null} persistor={persistor}>
				<ReactNativePaperProvider>
					<StatusBar />
					<SafeAreaProvider>
						<NavigationContainer>
							<Stack.Navigator>
								<Stack.Screen
									name="SelectList"
									component={SelectListsScreen}
									options={{ headerShown: false }}
								/>
								<Stack.Screen
									name="Todos"
									component={TodoScreen}
									options={{ headerShown: true }}
								/>
								<Stack.Screen
									name="EditList"
									component={EditScreen}
									options={{ headerShown: false }}
								/>
							</Stack.Navigator>
						</NavigationContainer>
					</SafeAreaProvider>
				</ReactNativePaperProvider>
			</PersistGate>
		</ReactReduxProvider>
	);
}
