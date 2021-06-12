class TodoSection {
  constructor(name) {
    this.name = name;
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push({
      todoName: todo[1],
      forceImage:
        todo[2] != undefined && todo[2].replace(" ", "").toLowerCase() == "x",
      winterOnly:
        todo[3] != undefined && todo[3].replace(" ", "").toLowerCase() == "x",
    });
  }
}

export function convertCsvToJson(csvData) {
  let splittedData = csvData.replace(/[\r]/g, "").split("\n");
  splittedData.shift();
  let todoData = [];
  let currentTodo = new TodoSection("dummy");
  splittedData.forEach((line) => {
    try {
      let parts = line.split(";");
      if (parts.length >= 3 && (parts[0] != "" || parts[1] != 0)) {
        if (parts[0] != "") {
          todoData.push(JSON.stringify(currentTodo));
          currentTodo = new TodoSection(parts[0]);
        }
        if (parts[0] == "" && parts[1] != "") {
          currentTodo.addTodo(parts);
        }
      }
    } catch (e) {
      console.warn(e);
    }
  });
  todoData.push(currentTodo);
  todoData.shift();
  return todoData;
}
