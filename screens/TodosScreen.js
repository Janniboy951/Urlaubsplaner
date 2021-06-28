import React from "react";
import { FlatList, View, StatusBar, AppState, Text } from "react-native";
import {
  getCurrentList,
  setCurrentListState,
  clearCurrentList,
  getCurrentListState,
  addListToHistory,
} from "../helper/DataManager";
import { Button, Dialog, Portal } from "react-native-paper";
import { TodoListPart } from "./components/TodoListPart";
import styles from "../styles/TodosStyle";
import { Image } from "react-native-elements";

export default React.memo(TodosScreen);
function TodosScreen({ navigation }) {
  const [todosData, setTodosData] = React.useState({});
  const [todosNum, setTodosNum] = React.useState(0);
  const [finishedDialog, showFinishedDialog] = React.useState(false);
  const hideFinishedDialog = () => showFinishedDialog(false);
  const partProgress = {};
  let globalState = [];
  let [todosAvailable, setTodosAvailable] = React.useState(true);

  //#region Load Current Todolist on focus
  const getTodosData = async () => {
    let todoNum = 0;
    let data = await getCurrentList();
    if (data == null) {
      setTodosAvailable(false);
      return;
    } else {
      setTodosAvailable(true);
    }
    let savedData = await getCurrentListState();
    for (let i = 0; i < data.listTodos.length; i++) {
      if (typeof data.listTodos[i] == "string") {
        data.listTodos[i] = JSON.parse(data.listTodos[i]);
      }
      data.listTodos[i].id = i;
    }
    data.listTodos.forEach((todoSection) => {
      if (typeof todoSection == "string") {
        todoSection = JSON.parse(todoSection);
      }
    });

    for (let j = 0; j < data.listTodos.length; j++) {
      todoNum += data.listTodos[j].todos.length;
      for (let k = 0; k < data.listTodos[j].todos.length; k++) {
        if (savedData[j] != null && savedData[j][k] != null) {
          data.listTodos[j].todos[k] = savedData[j][k];
        }
        data.listTodos[j].todos[k].id = k;
      }
    }
    setTodosData(data);
    setTodosNum(todoNum);
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      await getTodosData();
    });
    navigation.addListener("blur", () => {
      saveCurrentData();
    });

    return unsubscribe;
  }, [navigation]);

  const saveCurrentData = () => {
    setCurrentListState(globalState);
  };

  AppState.addEventListener("change", (nextAppState) => {
    if (nextAppState == "background") {
      saveCurrentData();
    }
  });
  //#endregion Load Current Todolist on focus

  const handleChildDataChange = async (data) => {
    partProgress[data.partNum] = 0 + data.progress;
    let progressSum = 0;
    for (let x in partProgress) {
      progressSum += partProgress[x];
    }
    globalState[data.partNum] = {
      name: data.partName,
      id: data.partNum,
      todos: data.partData,
    };
    if (progressSum == todosNum) {
      setTodosAvailable(false);
      console.log("Falsed");
      showFinishedDialog(true);
      globalState[data.partNum] = {
        name: data.partName,
        id: data.partNum,
        todos: data.partData,
      };
      await addListToHistory(globalState, todosData.listName);
      await clearCurrentList();
    }
  };

  const MemodTodoListPart = React.memo(TodoListPart);

  const SaveTodoListPart = ({ todoSection }) => {
    try {
      return (
        <MemodTodoListPart
          todos={JSON.parse(todoSection)}
          dataHandler={handleChildDataChange}
        />
      );
    } catch (e) {
      try {
        return (
          <MemodTodoListPart
            todos={todoSection}
            dataHandler={handleChildDataChange}
          />
        );
      } catch (error) {
        console.log("Coudld not import" + todoSection.toString());
        return null;
      }
    }
  };

  const MemodSaveTodoListPart = React.memo(SaveTodoListPart);
  console.log("render");
  console.log(todosAvailable);

  if (todosAvailable == false) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Portal>
          <Dialog visible={finishedDialog} onDismiss={hideFinishedDialog}>
            <Dialog.Title style={styles.centeredDialog}>
              Abgeschlossen!
            </Dialog.Title>
            <Dialog.Content style={styles.centeredDialog}>
              <Image
                resizeMode="contain"
                source={require("../assets/happy_smiley.png")}
                style={{
                  width: "90%",
                  // height: undefined,
                  aspectRatio: 1,
                  //height: 500,
                }}
              />
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={hideFinishedDialog}>Schließen</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
        <Text>Bitte aktiviere eine Liste in der Rubrik "Listen"</Text>
      </View>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <StatusBar backgroundColor="#f4f4f4" barStyle="dark-content" />
      <FlatList
        style={{ width: "100%" }}
        data={todosData.listTodos}
        renderItem={({ item }) => (
          <MemodSaveTodoListPart todoSection={item} season={todosData.season} />
        )}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={40}
      />
    </View>
  );
}
