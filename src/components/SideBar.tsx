import { Link } from "react-router-dom"

function SideBar() {
  return (
    <nav>
      <ul>
        <li>
          <Link to='/'>Список задач</Link>
        </li>
        <li>
          <Link to='/profile'>Профиль</Link>
        </li>
      </ul>
    </nav>
  )
}

export default SideBar