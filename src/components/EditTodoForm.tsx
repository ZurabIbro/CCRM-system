import React, { useEffect, useState } from "react";
import { editTodoProps } from "../types/Types";

export const EditTodoForm: React.FC<editTodoProps> = ({editTodo, task, cancelEdit}) => {
  const [value, setValue] = useState<string>(task.title)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    setValue(task.title)
  }, [task.title])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(value.length === 0) {
      setError('поле не может быть пустым')
    }else if(value.length < 2) {
      setError('поле не может содержать меньше 2 символов')
    }else if(value.length > 64){
      setError('поле не может содержать больше 64 символов')
    }else {
      editTodo(value, task.id)
      setError('')
    }
  } 

  const handleCancel = () => {
    setValue(task.title)
    cancelEdit()
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
        <button type="submit" className='edit'>save</button>
        <button onClick={handleCancel} className='edit'>cancel</button>
        
      </form>
      <span className='error'>{error}</span>
    </div>
  )
}