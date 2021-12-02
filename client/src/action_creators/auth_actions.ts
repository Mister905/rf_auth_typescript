import { Dispatch } from "redux";
import { Auth_Action } from "../action_interfaces/auth_interface";
import { Modal_Action } from "../action_interfaces/modal_interface";
import { Action_Type } from "../action_types";
import { History } from "history";
import instance from "../utils/axios";

export const load_active_user = async () => {
  try {
    const res = await instance.get("/auth/load_active_user");

    return (dispatch: Dispatch<Auth_Action>) => {
      dispatch({
        type: Action_Type.USER_LOADED,
        payload: res.data,
      });
    };
  } catch (error) {
    return (dispatch: Dispatch<Auth_Action>) => {
      dispatch({
        type: Action_Type.AUTH_ERROR,
      });
    };
  }
};

export const login_user = async (form_data: any, history: History) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await instance.post("/auth/login", request_body, config);

    if (res.data.error) {
      return (dispatch: Dispatch<Modal_Action>) => {
        dispatch({
          type: Action_Type.DISPLAY_MODAL,
          payload: {
            modal_title: "Error",
            modal_body: "Unable to login",
            modal_confirmation: "Ok",
          },
        });
      };
    } else {
      return (dispatch: Dispatch<Auth_Action>) => {
        dispatch({
          type: Action_Type.LOGIN_SUCCESS,
          payload: res.data,
        });

        history.push("/products");
      };
    }
  } catch (error) {
    return (dispatch: Dispatch<Auth_Action>) => {
      dispatch({
        type: Action_Type.AUTH_ERROR,
      });
    };
  }
};

export const register_user = async (form_data: any, history: History) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  let request_body = JSON.stringify(form_data);

  try {
    const res = await instance.post("/auth/register", request_body, config);

    if (res.data.error) {
      return (dispatch: Dispatch<Modal_Action>) => {
        dispatch({
          type: Action_Type.DISPLAY_MODAL,
          payload: {
            modal_title: "Error",
            modal_body: res.data.message,
            modal_confirmation: "Ok",
          },
        });
      };
    } else {
      history.push("/login");

      return (dispatch: Dispatch<Modal_Action>) => {
        dispatch({
          type: Action_Type.DISPLAY_MODAL,
          payload: {
            modal_title: "Success",
            modal_body: res.data.message,
            modal_confirmation: "Ok",
          },
        });
      };
    }
  } catch (error) {
    return (dispatch: Dispatch<Modal_Action>) => {
      dispatch({
        type: Action_Type.DISPLAY_MODAL,
        payload: {
          modal_title: "Error",
          modal_body: "Unable to complete registration",
          modal_confirmation: "Ok",
        },
      });
    };
  }
};

export const logout_user = async (history: History) => {
  return (dispatch: Dispatch<Auth_Action>) => {
    dispatch({
      type: Action_Type.LOGOUT,
    });

    history.push("/");
  };
};
