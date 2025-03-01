import { Segmented } from "antd"
import { TodoInfo } from "../types/todos"

interface todoFilterProps {
    
    setFilter: (filter: 'all' | 'completed' | 'inWork') => void
    todoInfo: TodoInfo
}


export const TodoFilter: React.FC<todoFilterProps> = ({ setFilter, todoInfo}) => {
  return (
    <Segmented
      className="filteredTodos"
      options={[
        {label: `Все (${todoInfo.all})`, value: 'all'},
        {label: `В работе (${todoInfo.inWork})`, value: 'inWork'},
        {label: `Сделано (${todoInfo.completed})`, value: 'completed'}
      ]}
      block
      onChange={(value) => setFilter(value as 'all' | 'completed' | 'inWork')}
    />
  )
}
