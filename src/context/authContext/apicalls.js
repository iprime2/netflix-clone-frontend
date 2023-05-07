import axios from 'axios'
import {
  loginFailure,
  loginStart,
  loginSuccess,
  registerFailure,
  registerStart,
  registerSuccess,
} from './AuthActions'
import { useNavigate } from 'react-router-dom'

export const login = async (user, dispatch) => {
  dispatch(loginStart())
  try {
    const res = await axios.post(
      process.env.REACT_APP_API_URL + 'auth/login',
      user
    )
    dispatch(loginSuccess(res.data))
  } catch (error) {
    dispatch(loginFailure())
  }
}

export const register = async (user, dispatch) => {
  dispatch(registerStart())
  try {
    const res = await axios.post(
      process.env.REACT_APP_API_URL + 'auth/register',
      user
    )
    console.log(res)
    dispatch(registerSuccess(res.data))
  } catch (error) {
    dispatch(registerFailure())
  }
}
