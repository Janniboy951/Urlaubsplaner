import { getCurrentDateTimeSting } from "@/helper/Date";
import { objectWithoutKey } from "@/helper/Helper";
import { PerformantTodoList } from "@/Types";
import { PayloadAction } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

interface CurrentTodoListState {
	currentListName: string;
	currentList?: PerformantTodoList;
	todoLists: { [key: string]: PerformantTodoList };
}

// Define the initial state using that type
const initialState: CurrentTodoListState = {
	currentListName: "",
	currentList: undefined,
	todoLists: {},
};

const CurrentTodoListSlice = createSlice({
	name: "checkTodoList",
	initialState: initialState,
	reducers: {
		addTodoList(state, action: PayloadAction<PerformantTodoList>) {
			state.todoLists[action.payload.listID] = action.payload;
		},
		removeTodoList(state, action: PayloadAction<string>) {
			state.todoLists = objectWithoutKey(state.todoLists, action.payload);
		},
		selectTodoList(state, action: PayloadAction<string>) {
			state.currentListName = action.payload;
			state.currentList = state.todoLists[action.payload];
		},
		checkTodo(state, action: PayloadAction<{ partID: string; todoID: string }>) {
			const { partID, todoID } = action.payload;
			const currentTodo = state.currentList!.todos[partID].todos[todoID];
			if (currentTodo.finished) {
				currentTodo.finished = false;
				currentTodo.finishedAt = undefined;
				state.currentList!.todos[partID].checkedAmount--;
				state.currentList!.finishedTodoAmount--;
			} else {
				currentTodo.finished = true;
				currentTodo.finishedAt = getCurrentDateTimeSting();
				state.currentList!.todos[partID].checkedAmount++;
				state.currentList!.finishedTodoAmount++;
			}

			state.currentList!.todos[partID].checked =
				state.currentList!.todos[partID].checkedAmount ==
				state.currentList!.todos[partID].todoAmount;
			state.todoLists[state.currentListName] = state.currentList!;
		},
	},
});

// Extract the action creators object and the reducer
const { actions, reducer } = CurrentTodoListSlice;
// Extract and export each action creator by name
export const { addTodoList, removeTodoList, selectTodoList, checkTodo } = actions;
// Export the reducer, either as a default or named export
export default reducer;
