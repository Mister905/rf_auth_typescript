import { Modal_Action } from "../action_interfaces/modal_interface";
import { Action_Type } from "../action_types";

interface I_initial_state {
  display_modal: boolean;
  modal_title: string;
  modal_body: string;
  modal_confirmation: string;
  modal_decline: string;
}

const initial_state: I_initial_state = {
  display_modal: false,
  modal_title: "",
  modal_body: "",
  modal_confirmation: "",
  modal_decline: "",
};

export default function (
  state: I_initial_state = initial_state,
  action: Modal_Action
) {
  console.log("DERP");
  console.log(action.type);
  switch (action.type) {
    case Action_Type.DISPLAY_MODAL:
      return {
        ...state,
        display_modal: true,
        modal_title: action.payload.modal_title,
        modal_body: action.payload.modal_body,
        modal_confirmation: action.payload.modal_confirmation,
        modal_decline: action.payload.modal_decline,
      };
    case Action_Type.CLOSE_MODAL:
      return {
        ...state,
        display_modal: false,
        modal_title: "",
        modal_body: "",
        modal_confirmation: "",
        modal_decline: "",
      };
    default:
      return state;
  }
}
