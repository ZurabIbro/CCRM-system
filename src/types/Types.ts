

export interface Todo { 
	id: number
	title: string
	created: string // ISO date string 
	isDone: boolean
    edit?: boolean
}

export interface TodoInfo { 
	all: number
	completed: number
	inWork: number
}

export interface MetaResponse<T, N> {
	data?: T[]
	info?: N
	meta?: {
		totalAmount: number
	}
}

export interface editTodoProps {
	task: Todo;
	cancelEdit: () => void;
	editTodo: (title: string, id: number) => void;
  }

export interface TodoProps {
	task: Todo;
	toggleComplete: (id: number) => void;
	deleteTodo: (id: number) => void;
	editTodo: (id: number) => void;
  }

export interface TodoFormProps {
	addTodo: (title: string) => void
  }