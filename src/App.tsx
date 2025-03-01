import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';
import {TodoWrapper} from './pages/TodoPage'
import NotFound from './pages/NotFound';
import SideBar from './components/SideBar';
import Profile from './pages/Profile';

function App() {
  return (
    <Router>
      <SideBar/>
      <Routes>
        <Route path='/' element={<TodoWrapper/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;