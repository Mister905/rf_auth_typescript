import { Action_Type } from "../action_types";

interface I_product {
  id: number;
  name: string;
  type: string;
  weight: string;
  inventory_count: number;
}

interface I_get_products_payload {
  product_list: I_product[];
  loading_products: boolean;
}

interface I_get_products {
  type: Action_Type.GET_PRODUCTS;
  payload: I_get_products_payload;
}

interface I_get_product_payload {
  product: I_product;
  loading_product: boolean;
}

interface I_get_product {
  type: Action_Type.GET_PRODUCT;
  payload: I_get_product_payload;
}

interface I_create_success {
  type: Action_Type.CREATE_SUCCESS;
  payload: object;
}

interface I_create_error {
  type: Action_Type.CREATE_ERROR;
  payload: object;
}

interface I_clear_products {
  type: Action_Type.CLEAR_PRODUCTS;
}

interface I_clear_product {
  type: Action_Type.CLEAR_PRODUCT;
  payload: object;
}

interface I_delete_product {
  type: Action_Type.DELETE_PRODUCT;
}

export type Product_Action =
  | I_get_products
  | I_get_product
  | I_create_success
  | I_create_error
  | I_clear_products
  | I_clear_product
  | I_delete_product;
