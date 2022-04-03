import { TodoList } from "@/Types";
// import { ActionTypes } from "@/redux/reducers/TodoListReducer";
import { createSlice } from "@reduxjs/toolkit";

type Season = "SUMMER" | "WINTER";

interface TodoListState {
	todoLists: TodoList[];
	season: Season;
	currentTodoList: TodoList | undefined;
	currentFinishedAmount: number;
}

const initialState: TodoListState = {
	todoLists: [],
	season: "WINTER",
	currentTodoList: undefined,
	currentFinishedAmount: 0,
};

const currentTodoListSlice = createSlice({
	name: "todoList",
	initialState: initialState,
	reducers: {
		setCurrentTodoList(state, action) {
			const newTodoList = state.todoLists.filter((v: any) => v.listID == action.payload)[0];
			state.currentTodoList = JSON.parse(JSON.stringify(newTodoList));
		},
		alterCurrentTodoList(state, action) {
			state.currentTodoList = JSON.parse(JSON.stringify(action.payload));
		},
		setSeason(state, action) {
			state.season = action.payload;
		},
		addTodoList(state, action) {
			state.todoLists.push(action.payload);
		},
		changeFinishedAmount(state, action) {
			state.currentFinishedAmount += action.payload;
		},
		resetFinishedAmount(state) {
			state.currentFinishedAmount = 0;
		},
		deleteTodoList(state, action) {
			const pos = state.todoLists.findIndex((v: any) => v.listID == action.payload);
			state.todoLists.splice(pos, 1);
		},
		saveCurrentTodoList(state, action) {
			const pos = state.todoLists.findIndex((v: any) => v.listID == action.payload.listID);
			state.todoLists.splice(pos, 1, action.payload);
		},
	},
});

/* function todoListReducer(state = initialState, action: { type: any; payload: any }) {
	switch (action.type) {
		case ActionTypes.SET_CURRENT_TODOLIST:
			const newTodoList = state.todoLists.filter((v: any) => v.listID == action.payload)[0];
			return {
				...state,
				currentTodoList: JSON.parse(JSON.stringify(newTodoList)),
			};
		case ActionTypes.ALTER_CURRENT_TODOLIST:
			return {
				...state,
				currentTodoList: JSON.parse(JSON.stringify(action.payload)),
			};
		case ActionTypes.SAVE_CURRENT_TODOLIST:
			// console.log({ ...state, todoLists: [ ...state.todoLists, [0]: action.payload ] });
			let pos = state.todoLists.findIndex((v: any) => v.listID == action.payload.listID);
			// state.todoLists[pos]=action.payload
			// let newTodoLists: any = [...state.todoLists];
			// newTodoLists.splice(pos, 1, action.payload);
			console.log({
				...state,
				todoLists: [
					...state.todoLists.slice(0, pos),
					action.payload,
					...state.todoLists.slice(pos + 1),
				],
			});
			return {
				...state,
				todoLists: [
					...state.todoLists.slice(0, pos),
					action.payload,
					...state.todoLists.slice(pos + 1),
				],
			};

		case ActionTypes.SET_SEASON:
			return { ...state, season: action.payload };

		case ActionTypes.ADD_TODOLIST:
			return { ...state, todoLists: [...state.todoLists, action.payload] };
		case ActionTypes.CHANGE_FINISHED_AMOUNT: {
			return {
				...state,
				currentFinishedAmount: state.currentFinishedAmount + action.payload,
			};
		}
		case ActionTypes.RESET_FINISHED_AMOUNT:
			return {
				...state,
				currentFinishedAmount: 0,
			};
		case ActionTypes.DELETE_TODOLIST:
			pos = state.todoLists.findIndex((v: any) => v.listID == action.payload);
			let newTodoLists = state.todoLists.slice(0);
			newTodoLists.splice(pos, 1);
			return {
				...state,
				todoLists: newTodoLists,
			};
		default:
			return state;
	}
}*/

export const {
	addTodoList,
	alterCurrentTodoList,
	changeFinishedAmount,
	deleteTodoList,
	resetFinishedAmount,
	saveCurrentTodoList,
	setCurrentTodoList,
	setSeason,
} = currentTodoListSlice.actions;

export default currentTodoListSlice.reducer;
