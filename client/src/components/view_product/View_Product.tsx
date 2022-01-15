import React, { useEffect } from "react";
import { withFormik, FormikProps, Form, Field, FormikBag } from "formik";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { get_product } from "../../action_creators/product_actions";
import Preloader from "../preloader/Preloader";
import { useAppSelector } from "../../store/hooks";
import { RouteComponentProps } from "react-router-dom";


interface I_product {
  id: number;
  name?: string;
  type?: string;
  weight?: string;
  inventory_count?: number;
}

interface I_products {
  product_list: I_product[];
  loading_products: boolean;
  loading_product: boolean;
  product: I_product | null;
}

interface I_view_product_form_values {
  name?: string;
  type?: string;
  weight?: string;
  inventory_count?: number;
}

interface I_props extends FormikProps<I_view_product_form_values> {
  history: History;
  get_product: (id: number) => Promise<void>;
  clear_product: () => Promise<void>;
  product: I_product;
  products: I_products;
}


const View_Product: React.FC<RouteComponentProps> = (props) => {

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
          <div className="col m4 offset-m8">
            <Link to={`/update_product/${product.id}`} className="btn">
              Update
            </Link>
          </div>
        </div>
        <View_Product_Form props={product} />
      </div>
    );
  }
};

const View_Product_Form = (props) => {
  const { name, type, weight, inventory_count } = props.props;

  const { handleSubmit, getFieldProps } = useFormik({
    initialValues: {
      name: name || "",
      type: type || "",
      weight: weight || "",
      inventory_count: inventory_count || "",
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <div className="row mt-50">
        <div className="input-field col m4 offset-m4">
          <label htmlFor="name" className="active custom-label">
            Name
          </label>
          <input
            id="name"
            type="text"
            name="name"
            disabled
            {...getFieldProps("name")}
          />
        </div>
      </div>
      <div className="row mt-50">
        <div className="input-field col m4 offset-m4">
          <label htmlFor="type" className="active custom-label">
            Type
          </label>
          <input
            id="type"
            type="text"
            name="type"
            disabled
            {...getFieldProps("type")}
          />
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
            name="weight"
            disabled
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
            name="inventory_count"
            disabled
            {...getFieldProps("inventory_count")}
          />
        </div>
      </div>
    </form>
  );
};

export default View_Product;
