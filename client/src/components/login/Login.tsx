import React from "react";
import { withFormik, FormikProps, Form, Field, FormikBag } from "formik";
import * as Yup from "yup";
import { Link, withRouter } from "react-router-dom";
import { login_user } from "../../action_creators/auth_actions";
import { connect } from "react-redux";
import { compose } from "redux";
import { History } from "history";

interface I_login_form_values {
  email: string;
  password: string;
}

interface I_props extends FormikProps<I_login_form_values> {
  history: History;
  login_user: (
    form_data: I_login_form_values,
    history: History
  ) => Promise<void>;
  email?: string;
  password?: string;
}

class Login extends React.Component<I_props, {}> {
  render() {
    const { errors } = this.props;
    return (
      <div className="container">
        <div className="row">
          <div className="col m12 center-align">
            <h1>Login</h1>
          </div>
        </div>
        <Form>
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
            <div className="col m4 offset-m4">
              <button type="submit" className="btn right">
                Login
              </button>
            </div>
          </div>
        </Form>
        <div className="row registration-row">
          <div className="col m12">
            <div className="center-align">
              New User?
              <Link to={"/register"} className="register-today">
                Register Today
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const Formik_Form = withFormik<I_props, I_login_form_values>({
  mapPropsToValues: ({ email, password }) => ({
    email: email || "",
    password: password || "",
  }),
  validationSchema: Yup.object().shape({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string().required("Password is required"),
  }),
  validateOnBlur: false,
  validateOnChange: false,
  handleSubmit: (
    values: I_login_form_values,
    formikBag: FormikBag<I_props, I_login_form_values>
  ) => {
    let { props } = formikBag;

    props.login_user(values, props.history);
  },
})(Login);

export default compose<any>(
  connect(null, { login_user }),
  withRouter
)(Formik_Form);
