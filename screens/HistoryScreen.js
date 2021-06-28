import React from "react";
import {
  Text,
  StatusBar,
  View,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { getHistory } from "../helper/DataManager";
import styles from "../styles/ListsStyles";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

import HistoryTodosScreen from "../screens/HistoryTodosScreen";
import { createStackNavigator } from "@react-navigation/stack";

const HistoryStack = createStackNavigator();

export default function HistoryStackScreen() {
  return (
    <HistoryStack.Navigator>
      <HistoryStack.Screen
        name="history"
        component={HistoryScreen}
        options={{
          headerShown: false,
          title: "Übersicht",
        }}
      />
      <HistoryStack.Screen
        name="historyTodos"
        component={HistoryTodosScreen}
        options={{
          headerShown: false,
          title: "Neue Liste erstellen",
        }}
      />
    </HistoryStack.Navigator>
  );
}

function HistoryScreen({ navigation }) {
  const [historyData, setHistoryData] = React.useState({});
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setHistoryData(await getHistory());
    });

    return unsubscribe;
  }, [navigation]);

  const Item = ({ title, date, todoData }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() =>
        navigation.navigate("historyTodos", { todoData: todoData })
      }
    >
      <View style={{ flexDirection: "column", marginStart: "3%" }}>
        <Text style={styles.listItemTitle}>{title}</Text>
        <Text>{date}</Text>
      </View>

      <TouchableOpacity
        style={styles.listItemEditButton}
        onPress={() => console.log(1)}
      >
        <Icon name="delete" color="#777" size={40} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  console.log(historyData);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar backgroundColor="#f4f4f4" barStyle="dark-content" />
      <FlatList
        style={{ width: "100%" }}
        data={historyData}
        renderItem={({ item }) => (
          <Item
            title={item.name}
            date={item.completedTime}
            todoData={item.todolist}
          />
        )}
        keyExtractor={(item) => item.completedTime}
      />
    </View>
  );
}
