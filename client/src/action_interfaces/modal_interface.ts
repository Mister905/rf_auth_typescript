import { Action_Type } from "../action_types";

interface I_display_modal {
  type: Action_Type.DISPLAY_MODAL;
  payload: object;
}

interface I_close_modal {
  type: Action_Type.CLOSE_MODAL;
}

export type Action = I_display_modal | I_close_modal;
