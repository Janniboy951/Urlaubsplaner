import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import TodosScreen from "./screens/TodosScreen";
import ListsScreen from "./screens/ListsScreen";
import HistoryScreen from "./screens/HistoryScreen";
import Icon from "react-native-vector-icons/FontAwesome5";
import { styles } from "./styles/BaseStyle";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{
          //activeTintColor: "blue",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen
          name="Todos"
          component={TodosScreen}
          options={{
            tabBarLabel: "Todos",
            tabBarIcon: ({ focused, horizontal, color }) => (
              <Icon
                focused={focused}
                name="clipboard-check"
                size={horizontal ? 20 : 25}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Lists"
          component={ListsScreen}
          options={{
            tabBarLabel: "Listen",
            tabBarIcon: ({ focused, horizontal, color }) => (
              <Icon
                name="list"
                focused={focused}
                size={horizontal ? 20 : 25}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="history"
          component={HistoryScreen}
          options={{
            tabBarLabel: "Chronik",
            tabBarIcon: ({ focused, horizontal, color }) => (
              <Icon
                name="history"
                focused={focused}
                size={horizontal ? 20 : 25}
                color={color}
              />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
