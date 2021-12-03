import { Dispatch } from "redux";
import { Product_Action } from "../action_interfaces/products_interface";
import { Modal_Action } from "../action_interfaces/modal_interface";
import { Action_Type } from "../action_types";
import { History } from "history";
import instance from "../utils/axios";

export const get_products = () => async () => {
  try {
    const res = await instance.get("/products");

    return (dispatch: Dispatch<Product_Action>) => {
      dispatch({
        type: Action_Type.GET_PRODUCTS,
        payload: res.data,
      });
    };
  } catch (error) {
    return (dispatch: Dispatch<Modal_Action>) => {
      dispatch({
        type: Action_Type.DISPLAY_MODAL,
        payload: {
          modal_title: "Error",
          modal_body: "Unable to fetch products",
          modal_confirmation: "Close",
        },
      });
    };
  }
};

export const display_modal =
  (
    modal_title: string,
    modal_body: string,
    modal_confirmation: string,
    modal_decline: string
  ) =>
  async () => {
    try {
      return (dispatch: Dispatch<Modal_Action>) => {
        dispatch({
          type: Action_Type.DISPLAY_MODAL,
          payload: {
            modal_title,
            modal_body,
            modal_confirmation,
            modal_decline,
          },
        });
      };
    } catch (error) {
      console.log(error);
    }
  };

export const close_modal = () => async () => {
  try {
    return (dispatch: Dispatch<Modal_Action>) => {
      dispatch({
        type: Action_Type.CLOSE_MODAL,
      });
    };
  } catch (error) {
    console.log(error);
  }
};
