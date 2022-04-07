import { getCurrentDateTimeSting } from "@/helper/Date";
import { objectWithoutKey } from "@/helper/Helper";
import { PerformantTodoList } from "@/Types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const safeJsonCopy = <T>(inp: T): T => JSON.parse(JSON.stringify(inp));

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
			if (!(action.payload.listID in state.todoLists)) {
				state.todoLists[action.payload.listID] = action.payload;
			} else {
				const newTodoList: PerformantTodoList = safeJsonCopy(
					state.todoLists[action.payload.listID]
				);
				Object.values(action.payload.todos).forEach((part) => {
					if (!(part.id in newTodoList.todos)) {
						newTodoList.todos[part.id] = part;
						newTodoList.totalTodoAmount += Object.keys(part.todos).length;
					} else {
						Object.values(part.todos).forEach((todo) => {
							if (!(todo.id in newTodoList.todos[part.id].todos)) {
								newTodoList.todos[part.id].todos[todo.id] = todo;
								newTodoList.totalTodoAmount++;
								newTodoList.todos[part.id].todoAmount++;
							}
						});
					}
				});
				newTodoList.finishedTodoAmount =
					state.todoLists[action.payload.listID].finishedTodoAmount;
				state.todoLists[action.payload.listID] = safeJsonCopy(newTodoList);
			}
		},
		removeTodoList(state, action: PayloadAction<string>) {
			state.todoLists = objectWithoutKey(state.todoLists, action.payload);
			console.log(state.todoLists);
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
		tookPhoto(
			state,
			action: PayloadAction<{ partID: string; todoID: string; pictureUri?: string }>
		) {
			if (action.payload.pictureUri) {
				const { partID, todoID } = action.payload;
				const currentTodo = state.currentList!.todos[partID].todos[todoID];
				currentTodo.pictureUri = action.payload.pictureUri;
			}
		},
	},
});

// Extract the action creators object and the reducer
const { actions, reducer } = CurrentTodoListSlice;
// Extract and export each action creator by name
export const { addTodoList, removeTodoList, selectTodoList, checkTodo, tookPhoto } = actions;
// Export the reducer, either as a default or named export
export default reducer;
