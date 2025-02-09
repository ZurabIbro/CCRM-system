import { TodoInfo } from "../types/todos"

interface todoFilterProps {
    
    setFilter: (filter: 'all' | 'completed' | 'inWork') => void
    todoInfo: TodoInfo
}


export const TodoFilter: React.FC<todoFilterProps> = ({ setFilter, todoInfo}) => {
  return (
    <div>
        <div className='filteredTodos'> 
            <button onClick={() => setFilter('all')}>Все({todoInfo.all})</button>
            <button onClick={() => setFilter('inWork')}>В работе({todoInfo.inWork})</button>
            <button onClick={() => setFilter('completed')}>Сделано({todoInfo.completed})</button>
        </div>
    </div>
  )
}
