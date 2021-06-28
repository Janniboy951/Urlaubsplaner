import React from "react";
import { List } from "react-native-paper";

import { TodoListItem } from "./TodoListItem";
const MemodTodoListItem = React.memo(TodoListItem);

export const TodoListPart = ({ todos, season, dataHandler }) => {
  const [expanded, setExpanded] = React.useState();
  const [listPartIcon, setListPartIcon] = React.useState(
    "checkbox-blank-circle-outline"
  );
  const [listPartIconColor, setListPartIconColor] = React.useState("black");

  const [partData, setPartData] = React.useState([...todos.todos]);

  const setListPartSymbol = (value) => {
    if (value) {
      setListPartIcon("checkbox-marked-circle-outline");
      setListPartIconColor("green");
    } else {
      setListPartIcon("checkbox-blank-circle-outline");
      setListPartIconColor("black");
    }
  };

  const nullToFalse = (value) => {
    if (value == undefined) {
      return false;
    } else {
      return value;
    }
  };

  const handleDataChange = async () => {
    let checkedNum = 0;
    partData.forEach((partChildData) => {
      if (partChildData.state) {
        checkedNum++;
      }
    });
    await dataHandler({
      partName: todos.name,
      partNum: todos.id,
      progress: checkedNum,
      partData: partData,
    });
  };

  const handleChildDataChange = async (data) => {
    partData[data.itemNum].state = data.state;
    partData[data.itemNum].imgUri = data.imgUri;
    // console.log(data);
    //console.log(partData);
    let checkedNum = 0;
    partData.forEach((partChildData) => {
      if (partChildData.state) {
        checkedNum++;
      }
    });
    if (checkedNum == partData.length) {
      setListPartSymbol(true);
    } else {
      setListPartSymbol(false);
    }
    await handleDataChange();
  };
  return (
    <List.Accordion
      title={todos.name}
      left={(props) => (
        <List.Icon {...props} icon={listPartIcon} color={listPartIconColor} /> //check-circle-outline
      )}
      onPress={() => setExpanded(!expanded)}
      expanded={expanded}
    >
      {todos.todos.map((todo, i) => (
        <MemodTodoListItem
          title={todo.todoName}
          forceCamera={todo.forceImage}
          winterOnly={todo.winterOnly}
          itemNum={todo.id}
          partNum={todos.id}
          key={todo.id}
          itemState={nullToFalse(partData[i].state)}
          itemImgUri={partData[i].imgUri}
          season={season}
          onDataChange={handleChildDataChange}
        />
      ))}
    </List.Accordion>
  );
};
