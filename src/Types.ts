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
