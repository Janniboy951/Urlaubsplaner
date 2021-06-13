import React from "react";
import {
  Text,
  StatusBar,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import {
  FAB,
  Portal,
  Dialog,
  Paragraph,
  Button,
  RadioButton,
} from "react-native-paper";
import styles from "../styles/ListsStyles";
import AddListScreen from "../screens/AddListScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { getLists, setCurrentList } from "../helper/DataManager";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const ListsStack = createStackNavigator();

export default function ListsStackScreen() {
  return (
    <ListsStack.Navigator>
      <ListsStack.Screen
        name="lists"
        component={ListsScreen}
        options={{
          headerShown: false,
          title: "Übersicht",
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

function ListsScreen({ navigation, props }) {
  const [listsData, setListsData] = React.useState({});
  const [visibleMenu, setvisibleMenu] = React.useState("");
  const [visibleDialog, setVisibleDialog] = React.useState("");
  const [selectedSeason, setSelectedSeason] = React.useState("summer");

  //#region SelectListDialog
  const SelectListDialog = ({ title }) => (
    <Portal>
      <Dialog
        visible={visibleDialog == title}
        onDismiss={() => {
          setVisibleDialog("");
        }}
      >
        <Dialog.Title style={styles.centeredDialog}>
          Todoliste benutzen
        </Dialog.Title>
        <Dialog.Content style={styles.centeredDialog}>
          <Paragraph>Hier kannst du deine Todoliste</Paragraph>
          <Paragraph>"{title}"</Paragraph>
          <Paragraph>zum Abhaken freischalten.</Paragraph>
        </Dialog.Content>
        <Dialog.Actions style={styles.centeredDialog}>
          <View>
            <RadioButton.Group
              onValueChange={(newValue) => setSelectedSeason(newValue)}
              value={selectedSeason}
            >
              <View>
                <View
                  style={{
                    flexDirection: "row",
                    alignContent: "center",
                    justifyContent: "space-around",
                  }}
                >
                  <RadioButton.Item
                    position="leading"
                    label="Sommer"
                    value="summer"
                  />
                  <RadioButton.Item
                    position="leading"
                    label="Winter"
                    value="winter"
                  />
                </View>
              </View>
            </RadioButton.Group>
            <Button
              onPress={() => {
                setVisibleDialog("");
                setCurrentList(title, selectedSeason);
              }}
              style={{ width: "100%", marginVertical: "3%" }}
            >
              Starten
            </Button>
          </View>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
  //#endregion SelectListDialog

  //#region Reload list when sceen is focused
  const getListsData = async () => {
    let data = await getLists();
    setListsData(data);
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getListsData();
    });
    return unsubscribe;
  }, [navigation]);
  //#endregion

  //#region ListsItem
  const Item = ({ title, description, image }) => (
    <TouchableOpacity
      style={styles.item}
      onPress={() => setVisibleDialog(title)}
    >
      <SelectListDialog title={title} />
      <Image
        resizeMode="cover"
        style={styles.listItemImage}
        source={{ uri: image }}
      />
      <View style={{ flexDirection: "column", marginStart: "3%" }}>
        <Text style={styles.listItemTitle}>{title}</Text>
        <Text>{description}</Text>
      </View>

      <TouchableOpacity
        style={styles.listItemEditButton}
        onPress={() => console.log(1)}
      >
        <Icon name="playlist-edit" color="#777" size={40} />
      </TouchableOpacity>
    </TouchableOpacity>
  );
  //#endregion ListsItem

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar backgroundColor="#f4f4f4" barStyle="dark-content" />
      <FAB
        style={styles.fab}
        icon="plus"
        onPress={() => navigation.navigate("addList")}
      />
      <FlatList
        style={{ width: "100%" }}
        data={listsData}
        renderItem={({ item }) => (
          <Item
            title={item.listName}
            description={item.listDescription}
            image={item.listImage}
          />
        )}
        keyExtractor={(item) => item.listName}
      />
    </View>
  );
}
