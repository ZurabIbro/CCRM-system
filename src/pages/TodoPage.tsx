import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { TodoForm } from '../components/TodoForm'
import { Todo as TodoTs, TodoInfo, MetaResponse } from "../types/todos"
import { getTodos } from '../api/api'
import { TodoFilter } from '../components/TodoFilter'
import { TodoList } from '../components/TodoList'


export const TodoWrapper: React.FC = () => {
    const defaultInfo = useMemo(() => ({all: 0, completed: 0, inWork: 0}), [])

    const [todos, setTodos] = useState<TodoTs[]>([])
    const [editingTodo, setEditingTodo] = useState<TodoTs | null>(null)
    const [filter, setFilter] = useState<'all' | 'completed' | 'inWork'>('all')
    const [todoInfo, setTodoInfo] = useState<TodoInfo>(defaultInfo)
    
    const fetchData = useCallback(async (filter: 'all' | 'completed' | 'inWork' = 'all') => {
        try{
            const data: MetaResponse<TodoTs, TodoInfo> = await getTodos(filter)
            setTodos(data.data || [])
            setTodoInfo(data.info || defaultInfo)
        }catch(error){
            console.error('Ошибка при загрузке данных:', error)
        }
    }, [defaultInfo])

    useEffect(()=> {
        fetchData(filter)
    }, [fetchData, filter])

    const editTodo = (id: number) => {
        const todoToEdit = todos.find((todo) => todo.id === id)
        if (!todoToEdit) return
    
        setEditingTodo(todoToEdit)
    }

    const cancelEdit = () => {
        setEditingTodo(null)
    }
    
  return (
    <div>
        <TodoForm fetchData={fetchData}/>
        <TodoFilter setFilter={setFilter} todoInfo={todoInfo}/>
        <TodoList 
        todos={todos}
        editingTodo={editingTodo}
        setEditingTodo={setEditingTodo}
        fetchData={fetchData}
        cancelEdit={cancelEdit}
        editTodo={editTodo}
        />
    </div>
  )
}
