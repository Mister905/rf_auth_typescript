import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { compose } from "redux";
import { Link, withRouter } from "react-router-dom";
import { withFormik, FormikProps, Form, Field, FormikBag } from "formik";
import { RouteComponentProps } from "react-router-dom";
import {
  get_product,
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

class View_Product_Form extends React.Component<I_props, {}> {
  render() {
    const { errors } = this.props;
    return (
      <Form>
        <div className="row mt-50">
          <div className="input-field col m4 offset-m4">
            <label htmlFor="name" className="active custom-label">
              Name
            </label>
            <Field
              id="name"
              type="text"
              name="name"
              className={errors.name ? "invalid" : ""}
              disabled
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
              disabled
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
              disabled
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
              disabled
            />
            {errors.inventory_count && (
              <span className="custom-helper-error">
                {errors.inventory_count}
              </span>
            )}
          </div>
        </div>
      </Form>
    );
  }
}

const View_Product_HOC = withFormik<I_props, I_view_product_form_values>({
  mapPropsToValues: (props) => {
    return {
      name: props.products.product?.name || undefined,
      type: props.products.product?.type || undefined,
      weight: props.products.product?.weight || undefined,
      inventory_count: props.products.product?.inventory_count || undefined,
    };
  },
  handleSubmit: (
    values: I_view_product_form_values,
    formikBag: FormikBag<I_props, I_view_product_form_values>
  ) => {},
})(View_Product_Form);

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
          <div className="row mt-50">
            <div className="col m4 offset-m8">
              <Link to={`/update_product/${product.id}`} className="btn">
                Update
              </Link>
            </div>
          </div>
          <View_Product_HOC {...this.props} />
        </div>
      );
    }
  }
}

const mapStateToProps = (state: RootState) => ({
  products: state.product,
});

export default compose<any>(
  connect(mapStateToProps, { get_product, clear_product }),
  withRouter
)(View_Product);
