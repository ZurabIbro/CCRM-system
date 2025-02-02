import React, { useEffect, useState } from 'react'
import { TodoForm } from './TodoForm'
import { Todo } from './Todo'
import { EditTodoForm } from './EditTodoForm'
import { Todo as TodoTs, TodoInfo, MetaResponse } from "../types/todoTypes"
import { getTodos, addTodo, deleteTodo, updateTodo, updateToggleTodo } from '../api/api'


export const TodoWrapper: React.FC = () => {
    const [todos, setTodos] = useState<TodoTs[]>([])
    const [editingTodo, setEditingTodo] = useState<TodoTs | null>(null)
    const [filter, setFilter] = useState<'all' | 'completed' | 'inWork'>('all')
    const [todoInfo, setTodoInfo] = useState<TodoInfo>({all: 0, completed: 0, inWork: 0})

    
    const fetchData = async () => {
        try{
            const data: MetaResponse<TodoTs, TodoInfo> = await getTodos()
            setTodos(data.data || [])
            setTodoInfo(data.info || {all: 0, completed: 0, inWork: 0})
        }catch(error){
            console.error('Ошибка при загрузке данных:', error)
        }
    }

    useEffect(()=> {
        fetchData()
    }, [])

    const handleAddTodo = async (title: string) => {
        try{
            await addTodo(title)
            fetchData()
        }catch(error){
            console.error('Возникла ошибка при добавлении todo:', error)
        }
        
    }

    const handleDeleteTodo = async (id: number) => {
        try{
            await deleteTodo(id)
            fetchData()
        }catch(error){
            console.error('Не удалось удалить todo:', error)
        }
    }
      

    const hanldeUpdateTodo = async (task: string, id: number) => {
        try{
            await updateTodo(task, id)
            setEditingTodo(null)
            fetchData()
        }catch(error){
            console.error('Ошибка при изменении задачи', error)
        }
    }

    const editTodo = (id: number) => {
        const todoToEdit = todos.find((t) => t.id === id)
        if (!todoToEdit) return;
    
        setEditingTodo(todoToEdit)
      };

    const toggleComplete = async (id: number) => {
        try{
            const todoIdSame = todos.find((todo) => todo.id === id)
            if (!todoIdSame) {
                console.error(`Задача ${id} не найдена`)
                return;
              }
            setTodos(todos.map((todo) =>
                todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
            ))

            await updateToggleTodo(id, !todoIdSame.isDone)
            fetchData()
        }catch(error){
            console.log('Ошибка при изменении статуса задачи:', error)
        }
        
    }

    const cancelEdit = () => {
        setEditingTodo(null)
    }

    const filteredTodos = todos.filter((todo) => {
        if (filter === 'all') return true
        if (filter === 'completed') return todo.isDone
        if (filter === 'inWork') return !todo.isDone
        return false
    })
    
  return (
    <div>
        <TodoForm addTodo={handleAddTodo}/>
        <div className='filteredTodos'> 
            <button onClick={() => setFilter('all')}>Все({todoInfo.all})</button>
            <button onClick={() => setFilter('inWork')}>В работе({todoInfo.inWork})</button>
            <button onClick={() => setFilter('completed')}>Сделано({todoInfo.completed})</button>
        </div>

        {filteredTodos.map((todo) => (
            editingTodo?.id === todo.id ? (
                <EditTodoForm key={todo.id} editTodo={hanldeUpdateTodo} task={editingTodo} cancelEdit={cancelEdit}/>
            ) : (
                <Todo 
                task={todo} 
                key={todo.id} 
                toggleComplete={toggleComplete} 
                deleteTodo={handleDeleteTodo} 
                editTodo={editTodo}/> 
            )
        ))}
    </div>
  )
}
