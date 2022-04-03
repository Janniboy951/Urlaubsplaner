import { objectWithoutKey } from "@/helper/Helper";
import { PerformantTodoList, TodoList } from "@/Types";
// import { ActionTypes } from "@/redux/reducers/TodoListReducer";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

type Season = "SUMMER" | "WINTER";

interface TodoListState {
	season: Season;
	todoLists: { [key: string]: PerformantTodoList };
	currentTodoList: PerformantTodoList;
	currentTodoListName: string;
}

const emptyTodoList: PerformantTodoList = {
	listID: "_" + uuidv4(),
	listName: "",
	totalTodoAmount: 0,
	finishedTodoAmount: 0,
	todos: {},
};

const initialState: TodoListState = {
	season: "WINTER",
	todoLists: {},
	currentTodoList: emptyTodoList,
	currentTodoListName: "",
};

const currentTodoListSlice = createSlice({
	name: "todoList",
	initialState: initialState,
	reducers: {
		createTodoList(state, action: PayloadAction<string>) {
			const newUUID = uuidv4();
			state.todoLists[newUUID] = {
				listID: newUUID,
				listName: action.payload,
				totalTodoAmount: 0,
				finishedTodoAmount: 0,
				todos: {},
			};
		},
		removeTodoList(state, action: PayloadAction<string>) {
			state.todoLists = objectWithoutKey(state.todoLists, action.payload);
		},
		selectTodoList(state, action: PayloadAction<string>) {
			state.currentTodoListName = action.payload;
			state.currentTodoList = state.todoLists[action.payload];
		},
		addTodoGroup(state, action: PayloadAction<string>) {
			const newUUID = uuidv4();
			state.currentTodoList.todos[newUUID] = {
				id: newUUID,
				title: action.payload,
				todoAmount: 0,
				checkedAmount: 0,
				checked: false,
				todos: {},
			};
			state.todoLists[state.currentTodoListName] = state.currentTodoList;
		},
		removeTodoGroup(state, action: PayloadAction<string>) {
			state.currentTodoList.totalTodoAmount -=
				state.currentTodoList.todos[action.payload].todoAmount;
			state.currentTodoList.todos = objectWithoutKey(
				state.currentTodoList.todos,
				action.payload
			);
			state.todoLists[state.currentTodoListName] = state.currentTodoList;
		},
		addTodo(state, action: PayloadAction<{ name: string; partID: string }>) {
			const newUUID = uuidv4();
			state.currentTodoList.todos[action.payload.partID].todos[newUUID] = {
				id: newUUID,
				title: action.payload.name,
			};
			state.currentTodoList.todos[action.payload.partID].todoAmount++;
			state.currentTodoList.totalTodoAmount++;
			console.log(state.currentTodoList);
			state.todoLists[state.currentTodoListName] = state.currentTodoList;
		},
		removeTodo(state, action: PayloadAction<{ partID: string; todoID: string }>) {
			state.currentTodoList.todos[action.payload.partID].todos = objectWithoutKey(
				state.currentTodoList.todos[action.payload.partID].todos,
				action.payload.todoID
			);
			state.currentTodoList.todos[action.payload.partID].todoAmount--;
			state.currentTodoList.totalTodoAmount--;
			state.todoLists[state.currentTodoListName] = state.currentTodoList;
		},

		setSeason(state, action) {
			state.season = action.payload;
		},
	},
});

export const {
	setSeason,
	addTodo,
	addTodoGroup,
	createTodoList,
	removeTodo,
	removeTodoGroup,
	removeTodoList,
	selectTodoList,
} = currentTodoListSlice.actions;

export default currentTodoListSlice.reducer;
