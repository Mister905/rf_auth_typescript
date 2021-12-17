import { combineReducers } from "redux";
import auth_reducer from "./auth_reducer";
import modal_reducer from "./modal_reducer";
import product_reducer from "./product_reducer";

const reducers = combineReducers({
  auth: auth_reducer,
  modal: modal_reducer,
  product: product_reducer
});

export default reducers;
