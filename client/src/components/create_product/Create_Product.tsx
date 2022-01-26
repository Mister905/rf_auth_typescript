import React from "react";
import { FormikProps } from "formik";
import { RouteComponentProps } from "react-router-dom";
import { create_product } from "../../action_creators/product_actions";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

interface I_product {
  id: number;
  name: string;
  type: string;
  weight: string;
  inventory_count: number;
}

interface I_create_product_form_values {
  name: string;
  type: string;
  weight: string;
  inventory_count: number;
}

interface I_props extends FormikProps<I_create_product_form_values> {
  history: History;
  get_product: (id: number) => Promise<void>;
  create_product: (
    form_data: I_create_product_form_values,
    history: History
  ) => Promise<void>;
}

const Create_Product: React.FC<I_props & RouteComponentProps> = (props) => {
  return (
    <div className="container">
      <div className="row mt-50">
        <div className="col m4 offset-m4 center-align">
          <h1>Create Product</h1>
        </div>
      </div>
      <Create_Product_Form />
    </div>
  );
};

const Create_Product_Form: React.FC<{}> = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      name: "",
      type: "",
      weight: "",
      inventory_count: undefined,
    },
    onSubmit: (values) => {
      dispatch(create_product(values, history));
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <div className="row mt-50">
        <div className="input-field col m4 offset-m4">
          <label htmlFor="name" className="active custom-label">
            Name
          </label>
          <input id="name" type="text" {...getFieldProps("name")} />
        </div>
      </div>
      <div className="row mt-50">
        <div className="input-field col m4 offset-m4">
          <label htmlFor="type" className="active custom-label">
            Type
          </label>
          <input id="type" type="text" {...getFieldProps("type")} />
        </div>
      </div>
      <div className="row mt-50">
        <div className="input-field col m4 offset-m4">
          <label htmlFor="weight" className="active custom-label">
            Weight
          </label>
          <input id="weight" type="text" {...getFieldProps("weight")} />
        </div>
      </div>
      <div className="row mt-50">
        <div className="input-field col m4 offset-m4">
          <label htmlFor="inventory_count" className="active custom-label">
            Inventory Count
          </label>
          <input
            id="inventory_count"
            type="number"
            {...getFieldProps("inventory_count")}
          />
        </div>
      </div>
      <div className="row">
        <div className="col m4 offset-m4">
          <button type="submit" className="btn right">
            Create
          </button>
        </div>
      </div>
    </form>
  );
};

export default Create_Product;
