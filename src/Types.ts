export interface TodoList {
	listName: string;
	listID: string;
	todos: TodoParts[];
}

export interface TodoParts {
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
