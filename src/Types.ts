export interface TodoList {
	listName: string;
	listID: string;
	todos: TodoPart[];
}

export interface TodoPart {
	id: string;
	title: string;
	todos: Todo[];
}
export interface Todo {
	title: string;
	finished?: boolean;
	finishedAt?: string;
	pictureNeeded?: boolean;
}

export interface PerformantTodoList {
	listName: string;
	listID: string;
	todos: { [id: string]: PerformantTodoPart };
}
export interface PerformantTodoPart {
	id: string;
	title: string;
	todos: { [id: string]: Todo };
}
export interface PerformantTodo {
	id: string;
	title: string;
	finished?: boolean;
	finishedAt?: string;
	pictureNeeded?: boolean;
}

export interface TodoIDs {
	listID: string;
	partID: string;
	todoID: string;
}
