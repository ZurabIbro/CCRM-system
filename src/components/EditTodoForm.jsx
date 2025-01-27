import React, { useState } from 'react'

export const EditTodoForm = ({editTodo, task, cancelEdit}) => {
  const [value, setValue] = useState(task.title)
  const [error, setError] = useState("")

  const handleSubmit = (e) => {
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