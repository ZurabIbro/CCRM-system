import React from 'react'
import { addTodo } from '../api/api'
import { Button, Form, Input } from 'antd'

export interface TodoFormProps {
  fetchData: () => void 
}

export const TodoForm: React.FC<TodoFormProps> = ({fetchData}) => {

  const [form] = Form.useForm();

  const handleSubmit = async (values: {title: string}) => {
      try{
        await addTodo(values.title)
        await fetchData()
        form.resetFields()
        }catch(error){
        console.error('Возникла ошибка при добавлении todo:', error)
      }
    }
  
  return (
    <Form form={form} className='ToDoForm' onFinish={handleSubmit}>
      <Form.Item
      name='title'
      rules={[
        {required: true, message: 'поле не может быть пустым'},
        {min: 2, message: 'поле не может содержать меньше 2 символов'},
        {max: 64, message: 'поле не может содержать больше 64 символов'}
      ]}>
        <Input
          className='todo-input' 
          placeholder='Task To Be Done...'
          variant='underlined'
        />
      </Form.Item>
      <Button type='primary' className='todo-button' htmlType='submit'>Add</Button>
    </Form>
  )
}
