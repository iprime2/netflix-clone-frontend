import './app.scss'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Register from './pages/register/Register'
import Watch from './pages/watch/Watch'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom'

const App = () => {
  const user = true
  return (
    <Router>
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
      </Routes>
    </Router>
  )
}

export default App
