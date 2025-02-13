import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

export const Todo = ({task, toggleComplete, deleteTodo, editTodo}) => {
  return (
    <div className='Todo'>
      <div className='inpt'>
        <input type='checkbox' checked={task.isDone} className={`${task.isDone ? 'completed' : "" }`} onClick={() => toggleComplete(task.id)}/>
        <p className={`${task.isDone ? 'completed' : "" }`}>{task.title}</p>
      </div>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} className='edit' onClick={() => editTodo(task.id)}/>
        <FontAwesomeIcon icon={faTrash} className='trash' onClick={() => deleteTodo(task.id)}/>
      </div>
    </div>
  )
}
