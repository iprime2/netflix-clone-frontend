import { useContext, useRef } from 'react'
import { useState } from 'react'
import './register.scss'
import { Link, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/authContext/AuthContext'
import CircularProgress from '@mui/material/CircularProgress'
import { register } from '../../context/authContext/apicalls'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [flag, setFlag] = useState(false)
  const { isFetching, dispatch, error, success } = useContext(AuthContext)

  console.log(success)

  const history = useNavigate()

  const emailRef = useRef()
  const passwordRef = useRef()
  const usernameRef = useRef()

  const handleStart = () => {
    setFlag(true)
  }

  const handleFinish = async (e) => {
    e.preventDefault()

    try {
      register(
        {
          email,
          password,
          username,
        },
        dispatch
      )
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='register'>
      <div className='top'>
        <div className='wrapper'>
          <img
            className='logo'
            src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/2560px-Netflix_2015_logo.svg.png'
            alt=''
          />
          <Link to='/login' style={{ textDecoration: 'none' }}>
            <span className='loginButton'>Sign In</span>
          </Link>
        </div>
      </div>
      <div className='container'>
        <h1>Unlimited movies, TV shows, and more.</h1>
        <h2>Watch anywhere. Cancel anytime.</h2>
        <p>
          Ready to watch? Enter your email to create or restart your membership.
        </p>
        {!flag ? (
          <div className='input'>
            <input
              type='email'
              placeholder='email address'
              ref={emailRef}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
            <button className='registerButton' onClick={handleStart}>
              Get Started
            </button>
          </div>
        ) : (
          <form className='input'>
            <input
              type='password'
              placeholder='password'
              ref={passwordRef}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
            <input
              type='username'
              placeholder='username'
              ref={usernameRef}
              onChange={(e) => {
                setUsername(e.target.value)
              }}
            />
            <button className='registerButton' onClick={handleFinish}>
              {isFetching ? (
                <CircularProgress
                  color='inherit'
                  style={{ fontSize: '12px' }}
                />
              ) : (
                'Start'
              )}
            </button>
          </form>
        )}
        <br />
        {error && (
          <span style={{ color: 'red', fontWeight: 'bold', fontSize: '22px' }}>
            Something Went Wrong
          </span>
        )}
        {success && (
          <span
            style={{ color: 'green', fontWeight: 'bold', fontSize: '22px' }}
          >
            Account Created
          </span>
        )}
      </div>
    </div>
  )
}
