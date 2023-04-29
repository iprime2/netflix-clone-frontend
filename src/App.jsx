import { useContext } from 'react'
import './app.scss'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Watch from './pages/watch/Watch'
import Logout from './pages/Logout/logout'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  HashRouter,
} from 'react-router-dom'
import { AuthContext } from './context/authContext/AuthContext'

const App = () => {
  const { user } = useContext(AuthContext)
  return (
    <HashRouter>
      <Routes>
        <Route exact path='/' element={user ? <Home /> : <Register />} />
        <Route path='/login' element={user ? <Navigate to='/' /> : <Login />} />
        <Route
          path='/register'
          element={user ? <Navigate to='/' /> : <Register />}
        />
        {user && (
          <>
            <Route path='/movies' element={<Home type='movies' />} />
            <Route path='/series' element={<Home type='series' />} />
            <Route path='/watch' element={<Watch />} />
          </>
        )}
        <Route path='/logout' element={<Logout />} />
      </Routes>
    </HashRouter>
  )
}

export default App
