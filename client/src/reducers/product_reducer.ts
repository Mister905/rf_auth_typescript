// import {
//     GET_PRODUCT,
//     GET_PRODUCTS,
//     CLEAR_PRODUCTS,
//     CLEAR_PRODUCT,
//     DELETE_PRODUCT,
//   } from "../actions/types";

//   const initial_state = {
//     product_list: null,
//     loading_products: true,
//     loading_product: true,
//     product: null,
//   };

//   // Use the initial_state as a default value
//   export default function (state = initial_state, action) {
//     const { type, payload } = action;
//     switch (action.type) {
//       case GET_PRODUCTS:
//         return {
//           ...state,
//           product_list: payload.product_list,
//           loading_products: false,
//         };
//       case GET_PRODUCT:
//         return {
//           ...state,
//           product: payload.product,
//           loading_product: false,
//         };
//       case CLEAR_PRODUCTS:
//         return {
//           ...state,
//           product_list: null,
//           loading_products: true,
//         };
//       case CLEAR_PRODUCT:
//         return {
//           ...state,
//           product: null,
//           loading_product: true,
//         };
//       case DELETE_PRODUCT:
//         return {
//           ...state,
//           product_list: null,
//           loading_products: true,
//         };
//       default:
//         return state;
//     }
//   }

import { Product_Action } from "../action_interfaces/products_interface";
import { Action_Type } from "../action_types";

interface I_product {
  id: number;
  name: string;
  type: string;
  weight: string;
  inventory_count: number;
}

interface I_initial_state {
  product_list: I_product[] | null;
  loading_products: boolean;
  loading_product: boolean;
  product: I_product | null;
}

const initial_state: I_initial_state = {
  product_list: null,
  loading_products: true,
  loading_product: true,
  product: null,
};

export default function (
  state: I_initial_state = initial_state,
  action: Product_Action
) {
  switch (action.type) {
    case Action_Type.GET_PRODUCTS:
      return {
        ...state,
        product_list: action.payload.product_list,
        loading_products: false,
      };

    case Action_Type.GET_PRODUCT:
      return {
        ...state,
        product: action.payload.product,
        loading_product: false,
      };

    case Action_Type.CLEAR_PRODUCTS:
      return {
        ...state,
        product_list: null,
        loading_products: true,
      };
    case Action_Type.CLEAR_PRODUCT:
      return {
        ...state,
        product: null,
        loading_product: true,
      };
    case Action_Type.DELETE_PRODUCT:
      return {
        ...state,
        product_list: null,
        loading_products: true,
      };
    default:
      return state;
  }
}
