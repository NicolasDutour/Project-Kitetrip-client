import { SET_ERROR, REMOVE_ERROR } from "./actionTypes";

const uuidv4 = require("uuid/v4");

export const setError = (msg, errorType) => async dispatch => {
  const id = uuidv4();
  dispatch({
    type: SET_ERROR,
    payload: {
      id,
      msg,
      errorType
    }
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ERROR,
        payload: id
      }),
    4000
  );
};
