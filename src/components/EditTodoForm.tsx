import React, { useState } from "react";

interface Todo { 
  id: number;
  title: string;
  created: string; // ISO date string 
  isDone: boolean; 
}

interface TodoProps {
  task: Todo;
  cancelEdit: () => void;
  editTodo: (title: string, id: number) => void;
}

export const EditTodoForm: React.FC<TodoProps> = ({editTodo, task, cancelEdit}) => {
  const [value, setValue] = useState<string>(task.title)
  const [error, setError] = useState<string>("")

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (value.length === 0) {
      setError('поле не может быть пустым')
    }else if (value.length < 2){
      setError('поле не может содержать меньше 2 символов')
    }else {
      editTodo(value, task.id)
      setError('')
    }
  } 
  return (
    <div>
      <form className='Todo' onSubmit={handleSubmit}>
        <div className='inpt'>
          <input type='text'  
          placeholder='Update'
          value={value}
          onChange={(e) => setValue(e.target.value)}
          />
          </div>
        <button onClick={handleSubmit} className='edit'>save</button>
        <button onClick={cancelEdit} className='edit'>cancel</button>
        
      </form>
      <span className='error'>{error}</span>
    </div>
  )
}