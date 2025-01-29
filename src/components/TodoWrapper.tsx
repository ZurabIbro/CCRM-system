import React, { useEffect, useState } from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'
import { EditTodoForm } from './EditTodoForm'

interface TodoRequest { 
	title?: string;
 	isDone: boolean;  // изменение статуса задачи происходит через этот флаг
 } 

interface Todo { 
	id: number;
	title: string;
	created: string; // ISO date string 
	isDone: boolean; 
    edit?: boolean; 
}

interface TodoInfo { 
	all: number
	completed: number
	inWork: number
}

interface MetaResponse<T, N> {
	data?: T[]
	info?: N
	meta?: {
		totalAmount: number
	}
}

export const TodoWrapper: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([])
    const [, setEditingTodo] = useState<Todo | null>(null)
    const [filter, setFilter] = useState<'all' | 'completed' | 'inWork'>('all')
    const [todoInfo, setTodoInfo] = useState<TodoInfo>({all: 0, completed: 0, inWork: 0})

    const updateTodoInfo = (todos: Todo[]) => {
        setTodoInfo({
          all: todos.length,
          completed: todos.filter((t) => t.isDone).length,
          inWork: todos.filter((t) => !t.isDone).length,
        })
      }

    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('https://easydev.club/api/v2/todos')
                const data: MetaResponse<Todo, TodoInfo> = await response.json()
                setTodos(data.data || [])
                if (data.info) {
                    setTodoInfo(data.info)
                    updateTodoInfo(data.data || [])
                  }
            }catch(error){
                console.error('Ошибка при загрузке данных:', error)
            }
          }

        fetchData()
    }, [])
    
    const addTodo = async (title: string) => {
        try{
             const response = await fetch('https://easydev.club/api/v2/todos', {
                method: 'POST',
                body: JSON.stringify({
                    title,
                    isDone: false
                } as TodoRequest),
                headers: {
                    "Content-type": "application/json"
                }
            })

            const result: Todo = await response.json()
            setTodos([...todos, {...result, isDone: false}])
            updateTodoInfo([...todos, {...result, isDone: false}])
            console.log(result)
            
        }catch(error){
            console.error('Возникла ошибка при добавлении todo:', error)
        }
        
    }

    const deleteTodo = async (id: number) => {
        try{
            const response = await fetch(`https://easydev.club/api/v2/todos/${id}`, {
                method: 'DELETE'
            })
            if(response.ok){
                setTodos(todos.filter(todo => todo.id !== id))
                updateTodoInfo(todos.filter(todo => todo.id !== id))
            }else{
                console.error(`Ошибка при удалении задачи ${id}`)
            }  
        }catch(error){
            console.error('Не удалось удалить todo:', error)
        }
    }
      

    const editTask = async (task: string,id: number) => {
        try{
            const response = await fetch(`https://easydev.club/api/v2/todos/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    title: task
                } as TodoRequest),
                headers: {
                    "Content-type": "application/json"	
                  }
            })

            if(response.ok){
                setTodos(todos.map((todo) => todo.id === id ? {...todo, title: task, edit: false} : todo))
                setEditingTodo(null)
            }else{
                console.error(`Ошибка при изменении задачи ${id}`)
            }
        }catch(error){
            console.error('Ошибка при изменении задачи', error)
        }
    }

    const editTodo = async (id: number) => {
        try{
            const todoToEdit = todos.find((todo) => todo.id === id)
            if (!todoToEdit) {
                console.error(`Задача ${id} не найдена`)
                return
            }
            setEditingTodo({ ...todoToEdit } )
            setTodos(todos.map((todo) => todo.id === id ? {...todo, edit: true} : todo))
        }catch(error){
            console.log(error)
        }
        
    }

    const toggleComplete = async (id: number) => {
        try{
            const todoIdSame = todos.find((todo) => todo.id === id)
            if (!todoIdSame) {
                console.error(`Задача ${id} не найдена`)
                return;
              }
            const response = await fetch(`https://easydev.club/api/v2/todos/${id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    ...todoIdSame,
                    isDone: !todoIdSame.isDone
                } as TodoRequest), 
                headers: {
                    "Content-type": "application/json"
                }
            })

            if(response.ok) {
                setTodos(todos.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone} : todo))
                updateTodoInfo(todos.map((todo) => todo.id === id ? {...todo, isDone: !todo.isDone} : todo))
            }else{
                console.error(`Ошибка при изменении статуса задачи ${id}`)
            }
        }catch(error){
            console.log('Ошибка при изменении статуса задачи:', error)
        }
        
    }

    const cancelEdit = (id: number) => {
        setTodos(todos.map((todo) =>
            todo.id === id ? { ...todo, edit: false } : todo
        ))
        setEditingTodo(null)
    };

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'all') return true
        if (filter === 'completed') return todo.isDone
        if (filter === 'inWork') return !todo.isDone
        return false
    })
    
  return (
    <div>
        <TodoForm addTodo={addTodo}/>
        <div className='filteredTodos'> 
            <button onClick={() => setFilter('all')}>Все({todoInfo.all})</button>
            <button onClick={() => setFilter('inWork')}>В работе({todoInfo.inWork})</button>
            <button onClick={() => setFilter('completed')}>Сделано({todoInfo.completed})</button>
        </div>

        {filteredTodos.map((todo) => (
            todo.edit ? (
                <EditTodoForm key={todo.id} editTodo={editTask} task={todo} cancelEdit={() => cancelEdit(todo.id)}/>
            ) : (
                <Todo 
                task={todo} 
                key={todo.id} 
                toggleComplete={toggleComplete} 
                deleteTodo={deleteTodo} 
                editTodo={editTodo}/> 
            )
        ))}
    </div>
  )
}
