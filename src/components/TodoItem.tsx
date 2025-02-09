import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateToggleTodo, deleteTodo } from '../api/api'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Todo } from '../types/todos'

export interface TodoItemProps {
	task: Todo
	editTodo: (id: number) => void
  fetchData: () => void
}

export const TodoItem: React.FC<TodoItemProps> = ({task, fetchData, editTodo}) => {

  const handleDeleteTodo = async () => {
    try{
      await deleteTodo(task.id)
      fetchData()
    }catch(error){
      console.error('Не удалось удалить todo:', error)
    }
  }

  const handleToggleComplete = async () => {
    try{
      await updateToggleTodo(task.id, !task.isDone)
      fetchData()
    }catch(error){
      console.log('Ошибка при изменении статуса задачи:', error)
    }  
  }

  return (
    <div className='Todo'>
      <div className='inpt'>
        <input type='checkbox' checked={task.isDone} className={`${task.isDone ? 'completed' : "" }`} onChange={handleToggleComplete}/>
        <p className={`${task.isDone ? 'completed' : "" }`}>{task.title}</p>
      </div>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} className='edit' onClick={() => editTodo(task.id)}/>
        <FontAwesomeIcon icon={faTrash} className='trash' onClick={handleDeleteTodo}/>
      </div>
    </div>
  )
}
