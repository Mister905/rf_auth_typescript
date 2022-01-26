import React, { useEffect } from "react";
import { FormikProps } from "formik";
import { RouteComponentProps } from "react-router-dom";
import {
  get_product,
  update_product,
} from "../../action_creators/product_actions";
import Preloader from "../preloader/Preloader";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { useAppSelector } from "../../store/hooks";
import { useHistory } from "react-router-dom";

interface I_product {
  id: number;
  name: string;
  type: string;
  weight: string;
  inventory_count: number;
}

interface I_update_product_form_values {
  id: number;
  name: string;
  type: string;
  weight: string;
  inventory_count: number;
}

interface I_props extends FormikProps<I_update_product_form_values> {
  history: History;
  get_product: (id: number) => Promise<void>;
  update_product: (
    form_data: I_update_product_form_values,
    history: History
  ) => Promise<void>;
}

const Update_Product: React.FC<I_props & RouteComponentProps> = (props) => {
  const dispatch = useDispatch();

  const loading_product = useAppSelector(
    (state) => state.product.loading_product
  );

  const product = useAppSelector((state) => state.product.product);

  useEffect(() => {
    dispatch(get_product(props.match.params.id));
  }, [loading_product]);

  if (loading_product) {
    return (
      <div className="container mt-100">
        <div className="row">
          <div className="col m12 center-align">
            <Preloader />
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div className="container">
        <div className="row mt-50">
          <div className="col m4 offset-m4 center-align">
            <h1>Update Product</h1>
          </div>
        </div>
        <Update_Product_Form {...product!} />
      </div>
    );
  }
};

const Update_Product_Form: React.FC<I_product> = (product: I_product) => {
  const history = useHistory();

  const dispatch = useDispatch();

  const { id, name, type, weight, inventory_count } = product;

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      id: id,
      name: name || "",
      type: type || "",
      weight: weight || "",
      inventory_count: inventory_count,
    },
    onSubmit: (values) => {
      values.id = id;
      dispatch(update_product(values, history));
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
          <input
            id="weight"
            type="text"
            {...getFieldProps("weight")}
          />
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
            Update
          </button>
        </div>
      </div>
    </form>
  );
};

export default Update_Product;
