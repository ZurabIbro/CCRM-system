import React, { useState } from "react"
import { Todo } from "../types/todos"
import { updateTodo } from "../api/api"
import { Button, Form, Input } from "antd";

export interface editTodoProps {
	cancelEdit: () => void
  fetchData: () => void
  editingTodo: Todo
}

export const EditTodoForm: React.FC<editTodoProps> = ({fetchData, cancelEdit, editingTodo}) => {
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (values: {title: string}) => {
    setLoading(true)
    try{

      await updateTodo(values.title, editingTodo.id)
      await fetchData()
      cancelEdit()
    }catch(error){
      console.error('Ошибка при изменении задачи', error)
    }finally{
      setLoading(false)
    }
  }

  return (
      <Form className='Todo' onFinish={handleSubmit} initialValues={{title: editingTodo.title}}>
        <Form.Item
          name="title"
          rules={[
            {required: true, message: 'поле не может быть пустым'},
            {min: 2, message: 'поле не может содержать меньше 2 символов'},
            {max: 64, message: 'поле не может содержать больше 64 символов'}
          ]}
          >
          <Input  
            className='inptEdit'
            placeholder='Update'
          />
        </Form.Item>

        <Form.Item>
          <Button  htmlType="submit" className='edit' loading={loading}>save</Button>
          <Button onClick={cancelEdit} className='edit'>cancel</Button>
        </Form.Item>
        
      </Form>
  )
}