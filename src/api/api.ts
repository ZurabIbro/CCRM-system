
const API = 'https://easydev.club/api/v2/todos'

export const getTodos = async () => {
    try{
        const response = await fetch(API)
        if (!response.ok) throw new Error('Не удалось загрузить данные')
        return await response.json()
    }catch(error){
        console.error('Ошибка при загрузке данных:', error)
    }
}

export const addTodo = async (title: string) => {
    try{
        const response = await fetch(API, {
        method: 'POST',
        body: JSON.stringify({
            title,
            isDone: false
        }),
        headers: {
            "Content-type": "application/json"
        }
        })
        if (!response.ok) throw new Error('Не удалось добавить задачу')
        return await response.json() 
    } catch(error){
        console.error('Возникла ошибка при добавлении todo:', error)
    }
}

export const deleteTodo = async (id: number) => {
    try{
        const response = await fetch(`${API}/${id}`, {
            method: 'DELETE'
        })
        if(!response.ok) throw new Error('Не удалось удалить todo')
    }catch(error){
        console.error('Не удалось удалить todo:', error)
    }
}

export const updateTodo = async (task: string, id: number) => {
    try{
        const response = await fetch(`${API}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                title: task
            } ),
            headers: {
                "Content-type": "application/json"	
              }
        })

        if(!response.ok) throw new Error(`Ошибка при изменении задачи ${id}`)
        return await response.json() 
    }catch(error){
        console.error('Ошибка при изменении задачи', error)
    }
}

export const updateToggleTodo = async (id: number, isDone: boolean) => {
    try{
        const response = await fetch(`${API}/${id}`, {
            method: 'PUT',
            body: JSON.stringify({
                isDone
            } ),
            headers: {
                "Content-type": "application/json"	
              }
        })

        if(!response.ok) throw new Error(`Ошибка при изменении задачи ${id}`)
        return await response.json() 
    }catch(error){
        console.error('Ошибка при изменении задачи', error)
    }
}