import axios from 'axios'
import { GET_PROFILE, PROFILE_ERROR, LOGOUT } from './actionTypes'
import { setError } from './error'

export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/profile/me')

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })
  } catch (err) {
    console.log('erreur: ', err.response.data)

    dispatch({
      type: PROFILE_ERROR,
    })
  }
}

export const createProfile = (formData, history, edit = false) => async (
  dispatch,
) => {
  try {
    const res = await axios.post('http://localhost:5000/api/profile/new', formData)

    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    })

    if (!edit) {
      history.push('/profile')
    }
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.map((error) => {
        return dispatch(setError(error.msg, 'error'))
      })
    }
    console.log('erreur create profile: ', err.response.data)

    dispatch({
      type: PROFILE_ERROR,
    })
  }
}

export const deleteAccount = () => async (dispatch) => {
  try {
    await axios.delete('http://localhost:5000/api/profile/')
    dispatch({ type: LOGOUT })
  } catch (err) {
    console.log(err)
  }
}
