import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { Button, Dialog, Portal } from "react-native-paper";

export default React.memo(EditTodo);

function EditTodo({ todo, setData, partData }: any) {
  const [confirmDeleteVisible, setConfirmDeleteVisible] = React.useState(false);

  function deleteItem() {
    let indexToDelete = partData.findIndex((val: any) => val.id == todo.id);
    setConfirmDeleteVisible(false);
    let newData = partData.slice(0);
    newData.splice(indexToDelete, 1);
    setData(newData);
    partData.splice(indexToDelete, 1);
  }
  return (
    <View style={{ width: "100%" }}>
      <View style={styles.row}>
        <View style={{ flexDirection: "row" }}>
          <MaterialCommunityIcons
            name="checkbox-intermediate"
            size={30}
            color="black"
          />
          <Text style={styles.title}>{todo.title}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => setConfirmDeleteVisible(true)}>
            <MaterialCommunityIcons
              name="delete-outline"
              size={30}
              color="#b00"
            />
          </TouchableOpacity>
          <Portal>
            <Dialog
              visible={confirmDeleteVisible}
              onDismiss={() => setConfirmDeleteVisible(false)}
            >
              <Dialog.Title>Wirklich löschen?</Dialog.Title>
              <Dialog.Actions>
                <Button onPress={() => setConfirmDeleteVisible(false)}>
                  Nein
                </Button>
                <Button onPress={deleteItem}>Ja</Button>
              </Dialog.Actions>
            </Dialog>
          </Portal>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    color: "#666666",
    marginLeft: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 56,
    paddingLeft: 50,
    paddingRight: 18,
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
