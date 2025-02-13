import React, { useEffect, useState } from 'react'

export const TodoForm = ({addTodo}) => {
  const [value, setValue] = useState("")
  const [error, setError] = useState("")
  const [todos, setTodos] = useState([])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (value.length === 0) {
      setError('поле не может быть пустым')
    }else if (value.length < 2){
      setError('поле не может содержать меньше 2 символов')
    }else {
      setError('')
      addTodo(value)
      setValue("")
    }
  }

  const fetchData = () => {
    fetch('https://easydev.club/api/v2/todos')
    .then(response => response.json())
    .then(data => setTodos(data.data))
    .catch(error => console.error('Ошибка:', error)); 
  }

  useEffect(() => {
    fetchData()
  }, [])

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
        {/* <ul>
          {todos.map((todo, index) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul> */}
      </div>
    </form>
  )
}
