export enum ActionTypes {
	SET_CURRENT_TODOLIST = "SET_CURRENT_TODOLIST",
	SET_SEASON = "SET_SEASON",
	ADD_TODOLIST = "ADD_TODOLIST",
	SAVE_CURRENT_TODOLIST = "SAVE_CURRENT_TODOLIST",
	CHANGE_FINISHED_AMOUNT = "CHANGE_FINISHED_AMOUNT",
	RESET_FINISHED_AMOUNT = "RESET_FINISHED_AMOUNT",
	ALTER_CURRENT_TODOLIST = "ALTER_CURRENT_TODOLIST",
	DELETE_TODOLIST = "DELETE_TODOLIST",
}

export const saveCurrentTodoList = (todoList: any) => ({
	type: ActionTypes.SAVE_CURRENT_TODOLIST,
	payload: todoList,
});

export const alterCurrentTodoList = (todoList: any) => ({
	type: ActionTypes.ALTER_CURRENT_TODOLIST,
	payload: todoList,
});

export const setCurrentTodoList = (id: string) => ({
	type: ActionTypes.SET_CURRENT_TODOLIST,
	payload: id,
});

export const addTodoList = (todoList: any) => ({
	type: ActionTypes.ADD_TODOLIST,
	payload: todoList,
});

export const setSeason = (season: "WINTER" | "SUMMER") => ({
	type: ActionTypes.SET_SEASON,
	payload: season,
});

export const changeFinishedAmount = (amount: 1 | -1) => ({
	type: ActionTypes.CHANGE_FINISHED_AMOUNT,
	payload: amount,
});
export const resetFinishedAmount = () => ({
	type: ActionTypes.RESET_FINISHED_AMOUNT,
});

export const deleteTodoList = (id: string) => ({
	type: ActionTypes.DELETE_TODOLIST,
	payload: id,
});
