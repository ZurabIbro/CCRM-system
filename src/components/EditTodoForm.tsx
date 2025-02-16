import React, { useEffect, useState } from "react"
import { Todo } from "../types/todos"
import { updateTodo } from "../api/api"

export interface editTodoProps {
	task: Todo;
	cancelEdit: () => void
  fetchData: () => void
  setEditingTodo: (todo: Todo | null) => void
}

export const EditTodoForm: React.FC<editTodoProps> = ({fetchData, task, cancelEdit, setEditingTodo}) => {
  const [value, setValue] = useState<string>(task.title)
  const [error, setError] = useState<string>("")

  useEffect(() => {
    setValue(task.title)
  }, [task.title])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if(value.length === 0) {
      setError('поле не может быть пустым')
    }else if(value.length < 2) {
      setError('поле не может содержать меньше 2 символов')
    }else if(value.length > 64){
      setError('поле не может содержать больше 64 символов')
    }else {

    try{
      await updateTodo(value, task.id)
      setEditingTodo(null)
      fetchData()
    }catch(error){
      console.error('Ошибка при изменении задачи', error)
    }
  }} 

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