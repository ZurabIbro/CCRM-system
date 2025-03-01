import { updateToggleTodo, deleteTodo } from '../api/api'
import { Todo } from '../types/todos'
import { DeleteOutlined, FormOutlined } from '@ant-design/icons'
import { Button, Checkbox, Form } from 'antd'


export interface TodoItemProps {
	task: Todo
	editTodo: (id: number) => void
  fetchData: (filter?: 'all' | 'completed' | 'inWork') => Promise<void>
  filter: 'all' | 'completed' | 'inWork'
}

export const TodoItem: React.FC<TodoItemProps> = ({task, fetchData, editTodo, filter}) => {

  const handleDeleteTodo = async () => {
    try{
      await deleteTodo(task.id)
      await fetchData(filter)
    }catch(error){
      console.error('Не удалось удалить todo:', error)
    }
  }

  const handleToggleComplete = async () => {
    try{
      await updateToggleTodo(task.id, !task.isDone)
      await fetchData(filter)
    }catch(error){
      console.log('Ошибка при изменении статуса задачи:', error)
    }  
  }

  const setClassOnIsDone = (isDone: boolean) => `${isDone ? 'completed' : ''}`

  return (
    <Form.Item>
    <div className='Todo'>
      <div className='inpt'>
        <Checkbox checked={task.isDone} onChange={handleToggleComplete}/>
        <p style={{marginLeft: 10}} className={setClassOnIsDone(task.isDone)}>{task.title}</p>
      </div>
      <div>
        
        <Button icon={<FormOutlined />} className='edit' onClick={() => editTodo(task.id)}/>
        <Button icon={<DeleteOutlined />} className='trash' onClick={handleDeleteTodo}/>
      </div>
    </div>
    </Form.Item>
  )
}
