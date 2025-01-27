import React, { useEffect, useState } from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'
import { EditTodoForm } from './EditTodoForm'

interface TodoRequest { 
	title?: string;
 	isDone?: boolean;  // изменение статуса задачи происходит через этот флаг
 } 

interface Todo { 
	id?: number;
	title?: string;
	created?: string; // ISO date string 
	isDone?: boolean; 
}

interface TodoInfo { 
	all?: number
	completed?: number
	inWork?: number
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
    const [editingTodo, setEditingTodo] = useState<Todo | null>(null)
    const [filter, setFilter] = useState<'all' | 'completed' | 'inWork'>('all')
    const [todoInfo, setTodoInfo] = useState<TodoInfo | null>(null)
    
    const addTodo = async (todo: string) => {
        try{
             const response = await fetch('https://easydev.club/api/v2/todos', {
                method: 'POST',
                body: JSON.stringify({
                    title: todo,
                    isDone: false
                } as TodoRequest),
                headers: {
                    "Content-type": "application/json"
                }
            })

            const result: Todo = await response.json()
            setTodos([...todos, result])
            console.log(result);
            
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
            }else{
                console.error(`Ошибка при удалении задачи ${id}`);
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
            setEditingTodo({ ...todoToEdit } )
            setTodos(todos.map((todo) => todo.id === id ? {...todo, edit: true} : todo))
        }catch(error){
            console.log(error)
        }
        
    }

    const toggleComplete = async (id: number) => {
        try{
            const todoIdSame = todos.find((todo) => todo.id === id)
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
            }else{
                console.error(`Ошибка при изменении статуса задачи ${id}`)
            }
        }catch(error){
            console.log('Ошибка при изменении статуса задачи:', error)
        }
        
    }

    const cancelEdit = (id: number) => {
        setTodos(todos.map((todo) => todo.id === id ? { ...editingTodo, edit: false } : todo)); 
        setEditingTodo(null);
    };
    
    useEffect(() => {
        const fetchData = async () => {
            try{
                const response = await fetch('https://easydev.club/api/v2/todos')
                const data: MetaResponse<Todo, TodoInfo> = await response.json()
                setTodos(data.data)
                if (data.info) {
                    setTodoInfo(data.info);
                  }
            }catch(error){
                console.error('Ошибка при загрузке данных:', error);
            }
          }

        fetchData()
    }, [])

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'all') return true
        if (filter === 'completed') return todo.isDone
        if (filter === 'inWork') return !todo.isDone
    })
    
  return (
    <div>
        <TodoForm addTodo={addTodo}/>
        <div className='filteredTodos'> 
            <button onClick={() => setFilter('all')}>Все({todoInfo?.all})</button>
            <button onClick={() => setFilter('inWork')}>В работе({todoInfo?.inWork})</button>
            <button onClick={() => setFilter('completed')}>Сделано({todoInfo?.completed})</button>
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
