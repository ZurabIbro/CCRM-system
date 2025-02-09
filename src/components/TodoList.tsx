import React from 'react'
import { EditTodoForm } from './EditTodoForm'
import { TodoItem } from './TodoItem'
import { Todo } from '../types/todos'

interface TodoListProps {
  todos: Todo[]
  editingTodo: Todo | null
  cancelEdit: () => void
  editTodo: (id: number) => void
  fetchData: () => void
  setEditingTodo: (todo: Todo | null) => void
}


export const TodoList : React.FC<TodoListProps>= ({todos, editingTodo, cancelEdit, editTodo, fetchData, setEditingTodo}) => {
  return (
    <div>
        {todos.map((todo) => (
            editingTodo?.id === todo.id ? (
                <EditTodoForm key={todo.id} task={editingTodo} cancelEdit={cancelEdit} fetchData={fetchData} setEditingTodo={setEditingTodo}/>
            ) : (
                <TodoItem 
                task={todo} 
                key={todo.id} 
                fetchData={fetchData}
                editTodo={editTodo}/> 
            )
        ))}
    </div>
  )
}
