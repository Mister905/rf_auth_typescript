import { combineReducers } from "redux";
import auth_reducer from "./auth_reducer";

const reducers = combineReducers({
  auth: auth_reducer,
});

export default reducers;
