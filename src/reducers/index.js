import { combineReducers } from "redux";
import auth from "./auth";
import profile from "./profile";
import trip from "./trip";
import error from "./error";

export default combineReducers({
  auth,
  profile,
  trip,
  error
});
