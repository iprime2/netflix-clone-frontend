import { useRef } from 'react'
import { useState } from 'react'
import './register.scss'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [username, setUsername] = useState('')
  const [flag, setFlag] = useState(false)

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
      await axios.post(process.env.REACT_APP_API_URL + 'auth/register', {
        email,
        password,
        username,
      })
      history('/login')
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
          <button className='loginButton'>Sign In</button>
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
              Start
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
