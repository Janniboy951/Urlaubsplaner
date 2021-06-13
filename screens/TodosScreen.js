import React from "react";
import { FlatList, Text, View, StatusBar, Dimensions } from "react-native";
import {
  Button,
  List,
  IconButton,
  ProgressBar,
  Colors,
} from "react-native-paper";
import { getCurrentList } from "../helper/DataManager";
import { CheckBox } from "react-native-elements";

export default React.memo(TodosScreen);
function TodosScreen({ navigation }) {
  const [todosData, setTodosData] = React.useState({});
  const [todosNum, setTodosNum] = React.useState(0);
  const [totalProgress, setTotalProgress] = React.useState(0);
  const [expandedPart, setExpandedPart] = React.useState("");

  function getCheckedState(partNum, itemNum) {
    return todosData.listTodos[partNum].todos[itemNum].checked == true;
  }

  function switchCheckedState(partNum, itemNum) {
    let newState = !getCheckedState(partNum, itemNum);
    todosData.listTodos[partNum].todos[itemNum].checked = newState;
    if (newState) {
      setTotalProgress(totalProgress + 0.1);
    } else {
      setTotalProgress(totalProgress - 0.1);
    }
  }

  //#region Load Current Todolist on focus
  const getTodosData = async () => {
    console.log("Getting Data");
    let todoNum = 0;
    let data = await getCurrentList();
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
        data.listTodos[j].todos[k].id = k;
      }
    }
    setTodosData(data);
    setTodosNum(todoNum);
  };
  React.useEffect(() => {
    const unsubscribe = navigation.addListener("focus", () => {
      getTodosData();
    });
    return unsubscribe;
  }, [navigation]);
  //#endregion Load Current Todolist on focus

  const TodoListItem = ({
    title,
    forceCamera,
    winterOnly,
    itemNum,
    partNum,
  }) => {
    if (winterOnly && todosData.season == "summer") {
      return null;
    }
    console.log("Rendering Item");

    return (
      <List.Item
        title={title}
        right={(props) => (
          <View style={{ flexDirection: "row" }}>
            <IconButton icon="camera" onPress={() => console.log(title)} />
            {forceCamera ? null : (
              <CheckBox
                checked={getCheckedState(partNum, itemNum)}
                onPress={() => switchCheckedState(partNum, itemNum)}
              />
            )}
          </View>
        )}
      />
    );
  };

  const MemodTodoListItem = React.memo(TodoListItem);

  const TodoListPart = ({ todos }) => {
    console.log("Render TodoListParts");
    return (
      <List.Accordion
        title={todos.name}
        left={(props) => (
          <List.Icon {...props} icon="checkbox-blank-circle-outline" /> //check-circle-outline      checkbox-marked-circle-outline
        )}
        onPress={() => {
          if (expandedPart != todos.id) {
            setExpandedPart(todos.id);
          } else {
            setExpandedPart(null);
          }
        }}
        expanded={expandedPart == todos.id}
      >
        {todos.todos.map((todo, i) => (
          <MemodTodoListItem
            title={todo.todoName}
            forceCamera={todo.forceImage}
            winterOnly={todo.winterOnly}
            itemNum={todo.id}
            partNum={todos.id}
            key={todo.id}
          />
        ))}
        {/* <FlatList
        style={{ width: "100%" }}
        data={todos.todos}
        renderItem={({ item }) => (
          <TodoListItem
            title={item.todoName}
            forceCamera={item.forceImage}
            winterOnly={item.winterOnly}
            itemNum={item.id}
            partNum={todos.id}
          />
        )}
        keyExtractor={(item) => item.id}
      /> */}
      </List.Accordion>
    );
  };
  const MemodTodoListPart = React.memo(TodoListPart);

  const SaveTodoListPart = ({ todoSection }) => {
    try {
      return <MemodTodoListPart todos={JSON.parse(todoSection)} />;
    } catch (e) {
      try {
        return <MemodTodoListPart todos={todoSection} />;
      } catch (error) {
        console.log("Coudld not import" + todoSection.toString());
        return null;
      }
    }
  };

  const MemodSaveTodoListPart = React.memo(SaveTodoListPart);

  console.log("Render");
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* <ProgressBar
        progress={totalProgress}
        color="#4afa26"
        style={{
          backgroundColor: "#f48588",
          height: 10,
          width: Dimensions.get("window").width,
        }}
      /> */}
      <StatusBar backgroundColor="#f4f4f4" barStyle="dark-content" />

      <FlatList
        style={{ width: "100%" }}
        data={todosData.listTodos}
        renderItem={({ item }) => <MemodSaveTodoListPart todoSection={item} />}
        keyExtractor={(item) => item.id.toString()}
        initialNumToRender={40}
      />
      <Button
        onPress={() => {
          console.log(todosData);
          console.log(todosNum);
        }}
      >
        Test
      </Button>
    </View>
  );
}
