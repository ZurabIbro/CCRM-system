import axios from "axios"

const API = 'https://easydev.club/api/v2/todos'

export const getTodos = async (filter: 'all' | 'completed' | 'inWork' = 'all') => {
    try{
        const response = await axios.get(`${API}?filter=${filter}`)
        return await response.data
    }catch(error){
        console.error('Ошибка при загрузке данных:', error)
    }
}

export const addTodo = async (title: string) => {
    try{
        const response = await axios.post(API, {
            title,
            isDone: false,
        headers: {
            "Content-type": "application/json"
        }
        })
        return await response.data 
    } catch(error){
        console.error('Возникла ошибка при добавлении todo:', error)
    }
}

export const deleteTodo = async (id: number) => {
    try{
        await axios.delete(`${API}/${id}`)
    }catch(error){
        console.error('Не удалось удалить todo:', error)
    }
}

export const updateTodo = async (task: string, id: number) => {
    try{
        const response = await axios.put(`${API}/${id}`, {
            title: task,
            headers: {
                "Content-type": "application/json"	
              }
        })
        return await response.data
    }catch(error){
        console.error('Ошибка при изменении задачи', error)
    }
}

export const updateToggleTodo = async (id: number, isDone: boolean) => {
    try{
        const response = await axios.put(`${API}/${id}`, {
                isDone,
            headers: {
                "Content-type": "application/json"	
              }
        })
        return await response.data
    }catch(error){
        console.error('Ошибка при изменении задачи', error)
    }
}