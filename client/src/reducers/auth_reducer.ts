import { Auth_Action } from "../action_interfaces/auth_interface";
import { Action_Type } from "../action_types";

interface I_user {
  first_name: string;
  last_name: string;
  email: string;
}

interface I_initial_state {
  access_token: string | null;
  is_authenticated: boolean;
  loading_user: boolean;
  user: I_user | null;
}

const initial_state: I_initial_state = {
  access_token: localStorage.getItem("token"),
  is_authenticated: false,
  loading_user: true,
  user: null,
};

export default function (
  state: I_initial_state = initial_state,
  action: Auth_Action
): I_initial_state {
  switch (action.type) {
    case Action_Type.USER_LOADED:
      return {
        ...state,
        is_authenticated: true,
        loading_user: false,
        user: action.payload.user,
      };
    case Action_Type.LOGIN_SUCCESS:
      localStorage.setItem("token", action.payload.access_token);
      return {
        ...state,
        access_token: action.payload.access_token,
        is_authenticated: true,
        loading_user: false,
        user: action.payload.user,
      };
    case Action_Type.LOGIN_FAIL:
    case Action_Type.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        access_token: null,
        is_authenticated: false,
        user: null,
        loading_user: true,
      };
    default:
      return state;
  }
}
