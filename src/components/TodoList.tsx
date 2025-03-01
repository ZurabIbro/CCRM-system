import React, { useEffect } from 'react'
import { EditTodoForm } from './EditTodoForm'
import { TodoItem } from './TodoItem'
import { Todo } from '../types/todos'
import { List } from 'antd'
import { useLocation } from 'react-router-dom'

interface TodoListProps {
  todos: Todo[]
  editingTodo: Todo | null
  cancelEdit: () => void
  editTodo: (id: number) => void
  fetchData: (filter?: 'all' | 'completed' | 'inWork') => Promise<void>
  filter: 'all' | 'completed' | 'inWork'
}


export const TodoList : React.FC<TodoListProps>= ({todos, editingTodo, cancelEdit, editTodo, fetchData, filter}) => {
  const location = useLocation()

  useEffect(() => {
    if(location.pathname !== '/') return

    const interval: ReturnType<typeof setInterval> = window.setInterval(() => {
      fetchData(filter)
      .catch(console.error)
    }, 5000)

    return () => {clearInterval(interval)}
  }, [filter, fetchData, location.pathname])

  return (
    <List
      className='todoList'
      dataSource={todos}
      renderItem={(todo) => (
        <List.Item>
          {editingTodo?.id === todo.id ? (
            <EditTodoForm key={todo.id} editingTodo={editingTodo} cancelEdit={cancelEdit} fetchData={fetchData} />
          ) : (
            <TodoItem 
              filter={filter}
              task={todo} 
              key={todo.id} 
              fetchData={fetchData}
              editTodo={editTodo}/>
          )}
        </List.Item>
      )}
    />
  )
}


    // <div>
    //     {todos.map((todo) => (
    //         editingTodo?.id === todo.id ? (
    //             <EditTodoForm key={todo.id} editingTodo={editingTodo} cancelEdit={cancelEdit} fetchData={fetchData} />
    //         ) : (
    //             <TodoItem 
    //             filter={filter}
    //             task={todo} 
    //             key={todo.id} 
    //             fetchData={fetchData}
    //             editTodo={editTodo}/> 
    //         )
    //     ))}
    // </div>

