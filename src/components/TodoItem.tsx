import React, { useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { updateToggleTodo, deleteTodo } from '../api/api'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { Todo } from '../types/todos'


export interface TodoItemProps {
	task: Todo
	editTodo: (id: number) => void
  fetchData: (filter?: 'all' | 'completed' | 'inWork') => Promise<void>
  filter: 'all' | 'completed' | 'inWork'
}

export const TodoItem: React.FC<TodoItemProps> = ({task, fetchData, editTodo, filter}) => {

  const handleDeleteTodo = useCallback(async () => {
    try{
      await deleteTodo(task.id)
      fetchData()
    }catch(error){
      console.error('Не удалось удалить todo:', error)
    }
  }, [task.id, fetchData])

  const handleToggleComplete = useCallback(async () => {
    try{
      await updateToggleTodo(task.id, !task.isDone)
      fetchData(filter)
    }catch(error){
      console.log('Ошибка при изменении статуса задачи:', error)
    }  
  }, [task.id, task.isDone, fetchData, filter])

  const setClassOnIsDone = (isDone: boolean) => `${isDone ? 'completed' : ''}`

  return (
    <div className='Todo'>
      <div className='inpt'>
        <input type='checkbox' checked={task.isDone} className={setClassOnIsDone(task.isDone)} onChange={handleToggleComplete}/>
        <p className={setClassOnIsDone(task.isDone)}>{task.title}</p>
      </div>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} className='edit' onClick={() => editTodo(task.id)}/>
        <FontAwesomeIcon icon={faTrash} className='trash' onClick={handleDeleteTodo}/>
      </div>
    </div>
  )
}
