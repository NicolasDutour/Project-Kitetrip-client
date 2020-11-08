import {
  GET_TRIPS,
  TRIPS_ERROR,
  GET_TRIP,
  CREATE_TRIP,
  CREATE_COMMENT,
  REMOVE_COMMENT,
  ADD_PASSENGER,
  GET_SEARCH,
} from './actionTypes'
import axios from 'axios'

import { setError } from './error'

export const getTrips = () => async (dispatch) => {
  try {
    const res = await axios.get('http://localhost:5000/api/trips/all')

    dispatch({
      type: GET_TRIPS,
      payload: res.data,
    })
  } catch (err) {
    dispatch({
      type: TRIPS_ERROR,
    })
  }
}

export const getTrip = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`http://localhost:5000/api/trips/${id}`)

    dispatch({
      type: GET_TRIP,
      payload: res.data,
    })
  } catch (err) {
    console.log('erreur: ', err)
    dispatch({
      type: TRIPS_ERROR,
    })
  }
}

export const createTrip = (formData, history) => async (dispatch) => {
  try {
    const res = await axios.post('http://localhost:5000/api/trips/new', formData)

    dispatch({
      type: CREATE_TRIP,
      payload: res.data,
    })

    history.push('/trips')
  } catch (err) {
    const errors = err.response.data.errors

    if (errors) {
      errors.map((error) => {
        return dispatch(setError(error.msg, 'error'))
      })
    }

    dispatch({
      type: TRIPS_ERROR,
    })
  }
}

export const addPassenger = (tripId) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/trips/passenger/${tripId}`)

    dispatch({
      type: ADD_PASSENGER,
      payload: res.data,
    })
  } catch (err) {
    console.log('erreur: ', err.response)
  }
}

export const createComment = (tripId, text) => async (dispatch) => {
  try {
    const res = await axios.post(`http://localhost:5000/api/trips/comment/${tripId}`, text)

    dispatch({
      type: CREATE_COMMENT,
      payload: res.data,
    })
  } catch (err) {
    console.log('erreur: ', err.response)
  }
}

export const deleteComment = (tripId, commentId) => async (dispatch) => {
  try {
    await axios.delete(`http://localhost:5000/api/trips/comment/${tripId}/${commentId}`)

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId,
    })
  } catch (err) {
    console.log('erreur: ', err.response)
  }
}

export const searchTrip = (formData) => async (dispatch) => {
  try {
    const res = await axios.get(
      `http://localhost:5000/api/trips/search/${formData.departureDate}/${formData.departureCity}`,
    )

    dispatch({
      type: GET_SEARCH,
      payload: res.data,
    })
  } catch (err) {
    console.log(err)
  }
}
