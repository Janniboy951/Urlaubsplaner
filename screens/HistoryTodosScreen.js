import React from "react";
import { View, StatusBar, FlatList } from "react-native";
import { Text } from "react-native-paper";
import { List, IconButton } from "react-native-paper";
import { CheckBox, Image } from "react-native-elements";
import { Button, Dialog, Portal } from "react-native-paper";
import styles from "../styles/TodoListItem";

const nullToFalse = (value) => {
  if (value == undefined) {
    return false;
  } else {
    return value;
  }
};

export default function AddListScreen({ route, navigation }) {
  const { todoData } = route.params;

  const ListItem = ({ title, imageUri, state }) => {
    const [dialogVisible, setDialogVisible] = React.useState(false);
    const hideDialog = () => setDialogVisible(false);
    return (
      <List.Item
        title={title}
        right={(props) => (
          <View style={{ flexDirection: "row" }}>
            <Portal>
              <Dialog visible={dialogVisible} onDismiss={hideDialog}>
                <Dialog.Title style={styles.centeredDialog}>
                  {title}
                </Dialog.Title>
                <Dialog.Content style={styles.centeredDialog}>
                  <Image
                    resizeMode="contain"
                    source={{ uri: imageUri }}
                    style={{
                      width: "90%",
                      // height: undefined,
                      aspectRatio: 16 / 16,
                      //height: 500,
                    }}
                  />
                </Dialog.Content>
                <Dialog.Actions>
                  <Button onPress={hideDialog}>Schließen</Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>

            {imageUri != undefined ? (
              <IconButton
                icon={"image-outline"}
                onPress={() => {
                  setDialogVisible(true);
                }}
              />
            ) : (
              <CheckBox checked={state} disabled={true} />
            )}
          </View>
        )}
      />
    );
  };

  const ListPart = ({ todos, title }) => {
    const [expanded, setExpanded] = React.useState();
    return (
      <List.Accordion
        title={title}
        left={(props) => (
          <List.Icon
            {...props}
            icon="checkbox-marked-circle-outline"
            color="green"
          />
        )}
        onPress={() => setExpanded(!expanded)}
        expanded={expanded}
      >
        {todos.map((todo, i) => (
          <ListItem
            title={todo.todoName}
            key={todo.id}
            state={nullToFalse(todos[i].state)}
            imageUri={todos[i].imgUri}
          />
        ))}
      </List.Accordion>
    );
  };


  return (
    <View
      style={{
        flexDirection: "column",
        justifyContent: "space-evenly",
        alignItems: "center",
        height: "100%",
        width: "100%",
        flex: 1,
      }}
    >
      <StatusBar backgroundColor="#f4f4f4" barStyle="dark-content" />
      <FlatList
        style={{ width: "100%" }}
        data={todoData}
        renderItem={({ item }) => (
          <ListPart todos={item.todos} title={item.name} />
        )}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={40}
      />
    </View>
  );
}
