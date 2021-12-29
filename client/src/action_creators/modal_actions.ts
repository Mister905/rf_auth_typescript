import { Dispatch } from "redux";
import { Modal_Action } from "../action_interfaces/modal_interface";
import { Action_Type } from "../action_types";


export const display_modal =
  (
    modal_title: string,
    modal_body: string,
    modal_confirmation: string,
    modal_decline: string
  ) =>
  async (dispatch: Dispatch<Modal_Action>) => {
    try {
      dispatch({
        type: Action_Type.DISPLAY_MODAL,
        payload: {
          modal_title,
          modal_body,
          modal_confirmation,
          modal_decline,
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

export const close_modal = () => async (dispatch: Dispatch<Modal_Action>) => {
  try {
    dispatch({
      type: Action_Type.CLOSE_MODAL,
    });
  } catch (error) {
    console.log(error);
  }
};
