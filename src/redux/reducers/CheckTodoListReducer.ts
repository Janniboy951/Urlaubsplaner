import { getCurrentDateTimeSting } from "@/helper/Date";
import { PerformantTodoList } from "@/Types";
import { createSlice } from "@reduxjs/toolkit/dist/createSlice";

interface CurrentTodoListState {
	currentList: string;
	todoLists: { [key: string]: PerformantTodoList };
}

const objectWithoutKey = (object: any, key: string) => {
	const { [key]: deletedKey, ...otherKeys } = object;
	return otherKeys;
};

// Define the initial state using that type
const initialState: CurrentTodoListState = {
	currentList: "",
	todoLists: {},
};

const CurrentTodoListSlice = createSlice({
	name: "checkTodoList",
	initialState: initialState,
	reducers: {
		addTodoList(state, action) {
			state.todoLists[action.payload.id] = action.payload;
		},
		removeTodoList(state, action) {
			state.todoLists = objectWithoutKey(state.todoLists, action.payload);
		},
		selectTodoList(state, action) {
			state.currentList = action.payload;
		},
		checkTodo(state, action) {
			const { partID, listID } = action.payload;
			if (state.todoLists[state.currentList].todos[partID].todos[listID].finished) {
				state.todoLists[state.currentList].todos[partID].todos[listID].finished = false;
				state.todoLists[state.currentList].todos[partID].todos[listID].finishedAt =
					undefined;
			} else {
				state.todoLists[state.currentList].todos[partID].todos[listID].finished = true;
				state.todoLists[state.currentList].todos[partID].todos[listID].finishedAt =
					getCurrentDateTimeSting();
			}
		},
	},
});

// Extract the action creators object and the reducer
const { actions, reducer } = CurrentTodoListSlice;
// Extract and export each action creator by name
export const { addTodoList, removeTodoList, selectTodoList, checkTodo } = actions;
// Export the reducer, either as a default or named export
export default reducer;
