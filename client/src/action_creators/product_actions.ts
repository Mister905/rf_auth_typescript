import { Dispatch } from "redux";
import { Product_Action } from "../action_interfaces/products_interface";
import { Modal_Action } from "../action_interfaces/modal_interface";
import { Action_Type } from "../action_types";
import { History } from "history";
import instance from "../utils/axios";


interface I_product_form_values {
  id?: number;
  name: string;
  type: string;
  weight: string;
  inventory_count?: number;
}

export const get_products =
  () => async (dispatch: Dispatch<Product_Action | Modal_Action>) => {
    try {
      const res = await instance.get("/products");

      dispatch({
        type: Action_Type.GET_PRODUCTS,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: Action_Type.DISPLAY_MODAL,
        payload: {
          modal_title: "Error",
          modal_body: "Unable to fetch products",
          modal_confirmation: "Close",
        },
      });
    }
  };

export const get_product =
  (id: number) => async (dispatch: Dispatch<Product_Action | Modal_Action>) => {
    try {
      const res = await instance.get(`/products/${id}`);

      dispatch({
        type: Action_Type.GET_PRODUCT,
        payload: res.data,
      });
    } catch (error) {
      dispatch({
        type: Action_Type.DISPLAY_MODAL,
        payload: {
          modal_title: "Error",
          modal_body: "Unable to fetch product",
          modal_confirmation: "Close",
        },
      });
    }
  };

export const clear_products =
  () => async (dispatch: Dispatch<Product_Action>) => {
    try {
      dispatch({
        type: Action_Type.CLEAR_PRODUCTS,
      });
    } catch (error) {
      console.log(error);
    }
  };


  export const clear_product =
  () => async (dispatch: Dispatch<Product_Action>) => {
    try {
      dispatch({
        type: Action_Type.CLEAR_PRODUCT,
      });
    } catch (error) {
      console.log(error);
    }
  };

export const create_product =
  (form_data: I_product_form_values, history: History) =>
  async (dispatch: Dispatch<Modal_Action>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let request_body = JSON.stringify(form_data);
    try {
      const res = await instance.post("/products", request_body, config);
      if (res.data.error) {
        dispatch({
          type: Action_Type.DISPLAY_MODAL,
          payload: {
            modal_title: "Product Creation Error",
            modal_body: res.data.message,
            modal_confirmation: "Ok",
          },
        });
      } else {
        dispatch({
          type: Action_Type.DISPLAY_MODAL,
          payload: {
            modal_title: "Success",
            modal_body: "Product created",
            modal_confirmation: "Ok",
          },
        });
        history.push("/products");
      }
    } catch (error) {
      dispatch({
        type: Action_Type.DISPLAY_MODAL,
        payload: {
          modal_title: "Error",
          modal_body: "Unable to create product",
          modal_confirmation: "Ok",
        },
      });
    }
  };

export const update_product =
  (form_data: I_product_form_values, history: History) =>
  async (dispatch: Dispatch<Modal_Action>) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    let request_body = JSON.stringify(form_data);
    try {
      const res = await instance.put("/products", request_body, config);
      if (res.data.error) {
        dispatch({
          type: Action_Type.DISPLAY_MODAL,
          payload: {
            modal_title: "Error",
            modal_body: "Unable to update product",
            modal_confirmation: "Ok",
          },
        });
      } else {
        dispatch({
          type: Action_Type.DISPLAY_MODAL,
          payload: {
            modal_title: "Success",
            modal_body: "Product updated",
            modal_confirmation: "Ok",
          },
        });
        history.push("/products");
      }
    } catch (error) {
      dispatch({
        type: Action_Type.DISPLAY_MODAL,
        payload: {
          modal_title: "Error",
          modal_body: "Unable to update product",
          modal_confirmation: "Ok",
        },
      });
    }
  };

export const delete_product =
  (product_id: number) =>
  async (dispatch: Dispatch<Modal_Action | Product_Action>) => {
    try {
      const res = await instance.delete(`/products/${product_id}`);

      dispatch({
        type: Action_Type.DELETE_PRODUCT,
      });

      dispatch({
        type: Action_Type.DISPLAY_MODAL,
        payload: {
          modal_title: "Success",
          modal_body: "Product successfuly deleted",
          modal_confirmation: "OK",
        },
      });
    } catch (error) {
      dispatch({
        type: Action_Type.DISPLAY_MODAL,
        payload: {
          modal_title: "Error",
          modal_body: "Unable to delete product",
          modal_confirmation: "Ok",
        },
      });
    }
  };
