import { TodoIDs } from "@/Types";

enum CheckTodoListActions {
	SET_CURRENT_TODOLIST,

	CHECK_TODO,
}

export const checkTodo = (id: TodoIDs) => ({ type: CheckTodoListActions.CHECK_TODO, payload: id });

export default CheckTodoListActions;
