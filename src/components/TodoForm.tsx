import React, { useState } from 'react'
import { addTodo } from '../api/api'


export interface TodoFormProps {
  fetchData: () => void 
}

export const TodoForm: React.FC<TodoFormProps> = ({fetchData}) => {
  const [value, setValue] = useState<string>("")
  const [error, setError] = useState<string>("")

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(value.length === 0) {
      setError('поле не может быть пустым')
    }else if(value.length < 2) {
      setError('поле не может содержать меньше 2 символов')
    }else if(value.length > 64){
      setError('поле не может содержать больше 64 символов')
    }else {
      setError('')

      try{
        await addTodo(value)
        setValue("")
        fetchData()
        }catch(error){
        console.error('Возникла ошибка при добавлении todo:', error)
      }

    }
  }

  return (
    <form className='ToDoForm' onSubmit={handleSubmit}>
      <input type='text' 
        className='todo-input' 
        placeholder='Task To Be Done...'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button type='submit' className='todo-button'>Add</button>
      <div className='error'>
        {error}
      </div>
    </form>
  )
}
