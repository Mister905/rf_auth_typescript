import React from "react";
import { withFormik, FormikProps, Form, Field, FormikBag } from "formik";
import * as Yup from "yup";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { History } from "history";
import { create_product } from "../../action_creators/product_actions";

interface I_create_product_form_values {
  name: string;
  type?: string;
  weight?: string;
  inventory_count?: number;
}

interface I_props extends FormikProps<I_create_product_form_values> {
  history: History;
  create_product: (
    form_data: I_create_product_form_values,
    history: History
  ) => Promise<void>;
  name: string;
  type?: string;
  weight?: string;
  inventory_count?: number;
}

class Create_Product extends React.Component<I_props, {}> {
  render() {
    const { errors } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col m12 center-align">
            <h1>Create Product</h1>
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
                Create
              </button>
            </div>
          </div>
        </Form>
      </div>
    );
  }
}

const Formik_Form = withFormik<I_props, I_create_product_form_values>({
  mapPropsToValues: ({ name, type, weight, inventory_count }) => {
    return {
      name: name || "",
      type: type || undefined,
      weight: weight || undefined,
      inventory_count: inventory_count || undefined,
    };
  },
  validationSchema: Yup.object().shape({
    name: Yup.string().required("Name field is Required"),
    type: Yup.string().required("Type field is Required"),
    weight: Yup.string().required("Weight field is Required"),
    inventory_count: Yup.string().required("Inventory count field is Required"),
  }),
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: (
    values: I_create_product_form_values,
    formikBag: FormikBag<I_props, I_create_product_form_values>
  ) => {
    let { props } = formikBag;

    props.create_product(values, props.history);
  },
})(Create_Product);

export default compose<any>(
  connect(null, { create_product }),
  withRouter
)(Formik_Form);
