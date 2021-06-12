import React from "react";
import { Text, View, StyleSheet, FlatList } from "react-native";
import { FAB } from "react-native-paper";
import styles from "../styles/ListsStyles";
import AddListScreen from "../screens/AddListScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { getLists } from "../helper/DataManager";

const ListsStack = createStackNavigator();

export default function ListsStackScreen() {
  return (
    <ListsStack.Navigator>
      <ListsStack.Screen
        name="lists"
        component={ListsScreen}
        options={{
          headerShown: false,
        }}
      />
      <ListsStack.Screen
        name="addList"
        component={AddListScreen}
        options={{
          title: "Neue Liste erstellen",
        }}
      />
    </ListsStack.Navigator>
  );
}
function ListsScreen({ navigation }) {
  const [listsData, setListsData] = React.useState({});

  const getListsData = async () => {
    let data = await getLists();
    console.log(data);
    setListsData(data);
  };

  React.useEffect(() => {
    getListsData();
  }, []);

  const Item = ({ title }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
  const renderItem = ({ item }) => <Item title={item.listName} />;

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("addList")}
      />
      <FlatList
        data={listsData}
        renderItem={renderItem}
        keyExtractor={(item) => item.listName}
      />
    </View>
  );
}
