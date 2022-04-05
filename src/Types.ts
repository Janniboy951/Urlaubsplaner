import { v4 as uuidv4 } from "uuid";

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

export function convertToPerformant(todoList: TodoList): PerformantTodoList {
	const newTodoList: PerformantTodoList = {
		...todoList,
		totalTodoAmount: 0,
		finishedTodoAmount: 0,
		todos: {},
	};
	let newTotalTodos = 0;

	todoList.todos.forEach((todoPart) => {
		const newTodoPart: PerformantTodoPart = {
			...todoPart,
			todos: {},
			checkedAmount: 0,
			checked: false,
			todoAmount: todoPart.todos.length,
		};
		todoPart.todos.forEach((todo) => {
			const newUUID = uuidv4();
			newTotalTodos++;
			newTodoPart.todos[newUUID] = { ...todo, id: newUUID };
		});
		newTodoList.todos[todoPart.id] = newTodoPart;
	});
	newTodoList.totalTodoAmount = newTotalTodos;
	return newTodoList;
}
