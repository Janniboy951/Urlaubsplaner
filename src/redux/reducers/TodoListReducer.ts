import { TodoList } from "@/Types";
import { ActionTypes } from "@/redux/actions/Actions";

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

function todoListReducer(state = initialState, action: { type: any; payload: any }) {
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
			let pos = state.todoLists.findIndex((v: any) => v.listID == action.payload.listID);
			let newTodoLists: any = state.todoLists.slice(0);
			newTodoLists.splice(pos, 1, action.payload);
			return { ...state, todoLists: newTodoLists };

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
			newTodoLists = state.todoLists.slice(0);
			newTodoLists.splice(pos, 1);
			return {
				...state,
				todoLists: newTodoLists,
			};
		default:
			return state;
	}
}

export default todoListReducer;
