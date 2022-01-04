import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import { withFormik, FormikProps, Form, Field, FormikBag } from "formik";
import { RouteComponentProps } from "react-router-dom";
import {
  get_product,
  update_product,
  clear_product,
} from "../../action_creators/product_actions";
import Preloader from "../preloader/Preloader";

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

interface I_update_product_form_values {
  id?: number;
  name?: string;
  type?: string;
  weight?: string;
  inventory_count?: number;
}

interface I_props extends FormikProps<I_update_product_form_values> {
  history: History;
  get_product: (id: number) => Promise<void>;
  clear_product: () => Promise<void>;
  update_product: (
    form_data: I_update_product_form_values,
    history: History
  ) => Promise<void>;
  product: I_product;
  products: I_products;
}

class Update_Product_Form extends React.Component<I_props, {}> {
  render() {
    const { errors } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col m12 center-align">
            <h1>Update Product</h1>
          </div>
        </div>
        <Form>
          <div className="row">
            <div className="input-field col m4 offset-m4">
              <label htmlFor="name" className="active custom-label">
                Name
              </label>
              <Field
                id="name"
                type="text"
                name="name"
                className={errors.name ? "invalid" : ""}
              />
              {errors.name && (
                <span className="custom-helper-error">{errors.name}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="input-field col m4 offset-m4">
              <label htmlFor="type" className="active custom-label">
                Type
              </label>
              <Field
                id="type"
                type="text"
                name="type"
                className={errors.type ? "invalid" : ""}
              />
              {errors.type && (
                <span className="custom-helper-error">{errors.type}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="input-field col m4 offset-m4">
              <label htmlFor="weight" className="active custom-label">
                Weight
              </label>
              <Field
                id="weight"
                type="text"
                name="weight"
                className={errors.weight ? "invalid" : ""}
              />
              {errors.weight && (
                <span className="custom-helper-error">{errors.weight}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="input-field col m4 offset-m4">
              <label htmlFor="inventory_count" className="active custom-label">
                Inventory Count
              </label>
              <Field
                id="inventory_count"
                type="number"
                name="inventory_count"
                className={errors.inventory_count ? "invalid" : ""}
              />
              {errors.inventory_count && (
                <span className="custom-helper-error">
                  {errors.inventory_count}
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col m4 offset-m4">
              <button type="submit" className="btn right">
                Update
              </button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const Update_Product_HOC = withFormik<I_props, I_update_product_form_values>({
  mapPropsToValues: (props) => {
    return {
      id: props.products.product?.id || undefined,
      name: props.products.product?.name || undefined,
      type: props.products.product?.type || undefined,
      weight: props.products.product?.weight || undefined,
      inventory_count: props.products.product?.inventory_count || undefined,
    };
  },
  handleSubmit: (
    values: I_update_product_form_values,
    formikBag: FormikBag<I_props, I_update_product_form_values>
  ) => {
    let { props } = formikBag;

    values.id = props.products.product?.id;

    props.update_product(values, props.history);
  },
})(Update_Product_Form);

class View_Product extends React.Component<RouteComponentProps<I_props>, {}> {
  componentDidMount() {
    this.props.clear_product();
    this.props.get_product(this.props.match.params.id);
  }

  render() {
    const { loading_product, product } = this.props.products;

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
          <Update_Product_HOC {...this.props} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  products: state.product,
});

export default compose<any>(
  connect(mapStateToProps, { get_product, clear_product, update_product }),
  withRouter
)(View_Product);
