import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  CLEAR_PROFILE,
} from './actionTypes'
import axios from 'axios'
import setAuthToken from '../helpers/setAuthToken'

import { setError } from './error'

export const register = (firstName, lastName, email, password) => async (
  dispatch,
) => {
  try {
    const res = await axios.post('http://localhost:5000/api/users/signup', {
      firstName,
      lastName,
      email,
      password,
    })

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.map((error) => {
        return dispatch(setError(error.msg, 'error'))
      })
    }
    dispatch({
      type: REGISTER_FAIL,
    })
  }
}

export const login = (email, password) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/api/users/login', {
      email,
      password,
    })

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    })

    dispatch(loadUser())
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.map((error) => {
        return dispatch(setError(error.msg, 'error'))
      })
    }

    dispatch({
      type: LOGIN_FAIL,
    })
  }
}

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token)
  }

  try {
    const res = await axios.get('http://localhost:5000/api/users/')

    dispatch({
      type: USER_LOADED,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: AUTH_ERROR,
    })
  }
}

export const logout = () => async (dispatch) => {
  dispatch({ type: LOGOUT })
  dispatch({ type: CLEAR_PROFILE })
}
