import { SET_ERROR, REMOVE_ERROR } from "../actions/actionTypes";

const initialState = [];

const error = (state = initialState, action) => {
  switch (action.type) {
    case SET_ERROR:
      return [...state, action.payload];
    case REMOVE_ERROR:
      return state.filter(error => error.id !== action.payload);
    default:
      return state;
  }
};

export default error;
