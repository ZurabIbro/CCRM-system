import React from 'react'
import { EditTodoForm } from './EditTodoForm'
import { TodoItem } from './TodoItem'
import { Todo } from '../types/todos'

interface TodoListProps {
  todos: Todo[]
  editingTodo: Todo | null
  cancelEdit: () => void
  editTodo: (id: number) => void
  fetchData: (filter?: 'all' | 'completed' | 'inWork') => Promise<void>
  setEditingTodo: (todo: Todo | null) => void
  filter: 'all' | 'completed' | 'inWork'
}


export const TodoList : React.FC<TodoListProps>= ({todos, editingTodo, cancelEdit, editTodo, fetchData, setEditingTodo, filter}) => {
  return (
    <div>
        {todos.map((todo) => (
            editingTodo?.id === todo.id ? (
                <EditTodoForm key={todo.id} task={editingTodo} cancelEdit={cancelEdit} fetchData={fetchData} setEditingTodo={setEditingTodo}/>
            ) : (
                <TodoItem 
                filter={filter}
                task={todo} 
                key={todo.id} 
                fetchData={fetchData}
                editTodo={editTodo}/> 
            )
        ))}
    </div>
  )
}
