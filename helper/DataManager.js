import AsyncStorage from "@react-native-async-storage/async-storage";

const storeData = async (key, value) => {
  try {
    const jsonValue = JSON.stringify(value);

    await AsyncStorage.setItem("@Urlaubsplaner_Jan_" + key, jsonValue);
  } catch (e) {
    console.warn("Saving Error");
  }
};

const getData = async (key) => {
  try {
    const jsonValue = await AsyncStorage.getItem("@Urlaubsplaner_Jan_" + key);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.warn("Reading Error");
    return null;
  }
};

export async function saveList(todoList) {
  let savedTodolists = await getData("todoLists");
  if (savedTodolists == undefined) {
    savedTodolists = [];
  }
  savedTodolists.push(todoList);
  await storeData("todoLists", savedTodolists);
  //await AsyncStorage.removeItem("@Urlaubsplaner_Jan_todoLists");
  return true;
}

export async function getList(todoList) {
  try {
    var savedTodolists = await getData("todoLists");
    let n = 0;
    while (
      n < savedTodolists.length &&
      savedTodolists[n].listName != todoList
    ) {
      n++;
    }
    return savedTodolists[n];
  } catch (e) {
    return undefined;
  }
}

export async function getLists() {
  return await getData("todoLists");
}

export async function setCurrentList(todoListName, season) {
  let todoList = await getList(todoListName);
  todoList.season = season;
  if (todoList != undefined) {
    await storeData("currentTodoList", todoList);
  }
}
export async function getCurrentList() {
  return await getData("currentTodoList");
}
