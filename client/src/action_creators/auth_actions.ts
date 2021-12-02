import { Dispatch } from "redux";
import { Action } from "../action_interfaces/auth_interface";
import { Action_Type } from "../action_types";

import instance from "../utils/axios";

export const deposit_money = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: Action_Type.DEPOSIT,
      payload: amount,
    });
  };
};

export const withdraw_money = (amount: number) => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: Action_Type.WITHDRAW,
      payload: amount,
    });
  };
};

export const bankrupt = () => {
  return (dispatch: Dispatch<Action>) => {
    dispatch({
      type: Action_Type.BANKRUPT,
    });
  };
};

// import {
//     DISPLAY_MODAL,
//     LOGIN_SUCCESS,
//     USER_LOADED,
//     AUTH_ERROR,
//     LOGOUT,
//   } from "./types";

//   export const load_active_user = () => async (dispatch) => {
//     try {
//       const res = await instance.get("/auth/load_active_user");

//       dispatch({
//         type: USER_LOADED,
//         payload: res.data,
//       });
//     } catch (error) {
//       console.log(error);
//       dispatch({
//         type: AUTH_ERROR,
//       });
//     }
//   };

//   export const login_user = (form_data, history) => async (dispatch) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     let request_body = JSON.stringify(form_data);

//     try {
//       const res = await instance.post("/auth/login", request_body, config);

//       if (res.data.error) {
//         dispatch({
//           type: DISPLAY_MODAL,
//           payload: {
//             modal_title: "Error",
//             modal_body: "Unable to login",
//             modal_confirmation: "Ok",
//           },
//         });
//       } else {
//         dispatch({
//           type: LOGIN_SUCCESS,
//           payload: res.data,
//         });

//         history.push("/products");
//       }
//     } catch (error) {
//       dispatch({
//         type: DISPLAY_MODAL,
//         payload: {
//           modal_title: "Error",
//           modal_body: "Unable to login",
//           modal_confirmation: "Ok",
//         },
//       });
//     }
//   };

//   export const register_user = (form_data, history) => async (dispatch) => {
//     const config = {
//       headers: {
//         "Content-Type": "application/json",
//       },
//     };

//     let request_body = JSON.stringify(form_data);

//     try {
//       const res = await instance.post("/auth/register", request_body, config);

//       if (res.data.error) {
//         dispatch({
//           type: DISPLAY_MODAL,
//           payload: {
//             modal_title: "Error",
//             modal_body: res.data.message,
//             modal_confirmation: "Ok",
//           },
//         });
//       } else {
//         history.push("/login");
//         dispatch({
//           type: DISPLAY_MODAL,
//           payload: {
//             modal_title: "Success",
//             modal_body: res.data.message,
//             modal_confirmation: "Ok",
//           },
//         });
//       }
//     } catch (error) {
//       dispatch({
//         type: DISPLAY_MODAL,
//         payload: {
//           modal_title: "Error",
//           modal_body: "Unable to complete registration",
//           modal_confirmation: "Ok",
//         },
//       });
//     }
//   };

//   export const logout_user = (history) => async (dispatch) => {
//     dispatch({ type: LOGOUT });
//     history.push("/");
//   };
