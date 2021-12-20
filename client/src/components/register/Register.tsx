import React from "react";
import { withFormik, FormikProps, Form, Field, FormikBag } from "formik";
import * as Yup from "yup";
import { Link, withRouter } from "react-router-dom";
import { register_user } from "../../action_creators/auth_actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { History } from "history";
import { fireEvent } from "@testing-library/react";

interface I_register_form_values {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  confirm_password: string;
}

interface I_props extends FormikProps<I_register_form_values> {
  history: History;
  register_user: (
    form_data: I_register_form_values,
    history: History
  ) => Promise<void>;
  first_name?: string;
  last_name?: string;
  email?: string;
  password?: string;
  confirm_password?: string;
}

class Register extends React.Component<I_props, {}> {
  render() {
    const { errors } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col m12 center-align">
            <h1>Register</h1>
          </div>
        </div>
        <Form>
          <div className="row">
            <div className="input-field col m4 offset-m4">
              <label htmlFor="first_name" className="active custom-label">
                First Name
              </label>
              <Field
                type="text"
                id="first_name"
                name="first_name"
                className={errors.first_name ? "invalid" : ""}
              />
              {errors.first_name && (
                <span className="custom-helper-error">{errors.first_name}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="input-field col m4 offset-m4">
              <label htmlFor="last_name" className="active custom-label">
                Last Name
              </label>
              <Field
                type="text"
                id="last_name"
                name="last_name"
                className={errors.last_name ? "invalid" : ""}
              />
              {errors.last_name && (
                <span className="custom-helper-error">{errors.last_name}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="input-field col m4 offset-m4">
              <label htmlFor="email" className="active custom-label">
                Email
              </label>
              <Field
                type="email"
                id="email"
                name="email"
                className={errors.email ? "invalid" : ""}
              />
              {errors.email && (
                <span className="custom-helper-error">{errors.email}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="input-field col m4 offset-m4">
              <label htmlFor="password" className="active custom-label">
                Password
              </label>
              <Field
                type="password"
                id="password"
                name="password"
                className={errors.password ? "invalid" : ""}
              />
              {errors.password && (
                <span className="custom-helper-error">{errors.password}</span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="input-field col m4 offset-m4">
              <label htmlFor="confirm_password" className="active custom-label">
                Confirm Password
              </label>
              <Field
                type="password"
                id="confirm_password"
                name="confirm_password"
                className={errors.confirm_password ? "invalid" : ""}
              />
              {errors.confirm_password && (
                <span className="custom-helper-error">
                  {errors.confirm_password}
                </span>
              )}
            </div>
          </div>
          <div className="row">
            <div className="col m4 offset-m4">
              <button type="submit" className="btn right">
                Register
              </button>
            </div>
          </div>
        </Form>
        <div className="row registration-row">
          <div className="col m12">
            <div className="center-align">
              Already registered?
              <Link to={"/login"} className="register-today">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Formik_Form = withFormik<I_props, I_register_form_values>({
  mapPropsToValues: ({
    first_name,
    last_name,
    email,
    password,
    confirm_password,
  }) => ({
    first_name: first_name || "",
    last_name: last_name || "",
    email: email || "",
    password: password || "",
    confirm_password: confirm_password || "",
  }),
  validationSchema: Yup.object({
    first_name: Yup.string().required("First Name is required"),
    last_name: Yup.string().required("Last Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
    confirm_password: Yup.string().oneOf(
      [Yup.ref("password"), null],
      "Passwords must match"
    ),
  }),
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: (
    values: I_register_form_values,
    formikBag: FormikBag<I_props, I_register_form_values>
  ) => {
    let { props } = formikBag;

    props.register_user(values, props.history);
  },
})(Register);

export default compose<any>(
  connect(null, { register_user }),
  withRouter
)(Formik_Form);
