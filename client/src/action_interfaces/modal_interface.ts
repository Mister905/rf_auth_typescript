import { Action_Type } from "../action_types";


interface I_display_modal_payload {
  modal_title: string;
  modal_body: string;
  modal_confirmation: string;
  modal_decline?: string;
}

interface I_display_modal {
  type: Action_Type.DISPLAY_MODAL;
  payload: I_display_modal_payload;
}

interface I_close_modal {
  type: Action_Type.CLOSE_MODAL;
}

export type Modal_Action = I_display_modal | I_close_modal;
