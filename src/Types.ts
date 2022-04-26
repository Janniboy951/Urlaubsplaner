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
	totalTodoAmount: number;
	finishedTodoAmount: number;
	finished?: boolean;
	todos: { [id: string]: PerformantTodoPart };
}
export interface PerformantTodoPart {
	id: string;
	title: string;
	todoAmount: number;
	checkedAmount: number;
	checked: boolean;
	todos: { [id: string]: PerformantTodo };
}
export interface PerformantTodo {
	id: string;
	title: string;
	finished?: boolean;
	finishedAt?: string;
	pictureNeeded?: boolean;
	pictureUri?: string;
}

export interface TodoIDs {
	listID: string;
	partID: string;
	todoID: string;
}
export type IO_TodoList = {
	title: string;
	todos: {
		title: string;
		pictureNeeded: boolean;
	}[];
}[];
