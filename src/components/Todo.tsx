import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrash } from '@fortawesome/free-solid-svg-icons'

interface Todo { 
	id: number;
	title: string;
	created: string; // ISO date string 
	isDone?: boolean; 
}

interface TodoProps {
  task: Todo;
  toggleComplete: (id: number) => void;
  deleteTodo: (id: number) => void;
  editTodo: (id: number) => void;
}

export const Todo: React.FC<TodoProps> = ({task, toggleComplete, deleteTodo, editTodo}) => {
  return (
    <div className='Todo'>
      <div className='inpt'>
        <input type='checkbox' checked={task.isDone} className={`${task.isDone ? 'completed' : "" }`} onChange={() => toggleComplete(task.id)}/>
        <p className={`${task.isDone ? 'completed' : "" }`}>{task.title}</p>
      </div>
      <div>
        <FontAwesomeIcon icon={faPenToSquare} className='edit' onClick={() => editTodo(task.id)}/>
        <FontAwesomeIcon icon={faTrash} className='trash' onClick={() => deleteTodo(task.id)}/>
      </div>
    </div>
  )
}
