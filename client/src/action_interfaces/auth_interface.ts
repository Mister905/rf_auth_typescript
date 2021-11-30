import { Action_Type } from "../action_types";

interface I_load_active_user {
  type: Action_Type.USER_LOADED;
  payload: object;
}

interface I_login_success {
  type: Action_Type.LOGIN_SUCCESS;
  payload: object;
}

interface I_login_fail {
  type: Action_Type.LOGIN_FAIL;
  payload: object;
}

interface I_logout {
  type: Action_Type.LOGOUT;
  payload: object;
}

interface I_user_loaded {
  type: Action_Type.USER_LOADED;
  payload: object;
}

interface I_auth_error {
  type: Action_Type.AUTH_ERROR;
  payload: object;
}

export type Action =
  | I_load_active_user
  | I_login_success
  | I_login_fail
  | I_logout
  | I_user_loaded
  | I_auth_error;
