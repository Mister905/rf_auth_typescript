import React from "react";
// import { FormikProps, FormikValues, useFormik, withFormik } from "formik";
import {
  withFormik,
  FormikProps,
  FormikErrors,
  Form,
  Field,
  FormikBag,
} from "formik";
import * as Yup from "yup";
import { Link, withRouter } from "react-router-dom";
import { login_user, test } from "../../action_creators/auth_actions";
import { Auth_Action } from "../../action_interfaces/auth_interface";
import { Modal_Action } from "../../action_interfaces/modal_interface";
import { Dispatch, bindActionCreators } from "redux";
import { connect } from "react-redux";
import { compose } from "redux";
import { History } from "history";
import { auth_action_creators } from "../../action_creators";


interface FormValues {
  email: string;
  password: string;
}

interface FormProps {
  email: string;
  password: string;
}

interface IProps extends FormikProps<FormValues> {
  history: History;
  // login_user: (
  //   values: FormValues,
  //   history: History
  // ) => Dispatch<Modal_Action | Auth_Action>;
  login_user: (form_data: any) => Promise<void>

  test: () => void;
}

// const {  } = bindActionCreators(auth_action_creators,)

const Login: React.FC<IProps> = (props) => {
  const { handleSubmit, handleBlur, handleChange, handleReset, errors } = props;

  // console.log(props);

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
              // className={errors.email ? "invalid" : ""}
            />
            {/* {errors.email && (
              <span className="custom-helper-error">{errors.email}</span>
            )} */}
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
              // className={errors.password ? "invalid" : ""}
            />
            {/* {errors.password && (
              <span className="custom-helper-error">{errors.password}</span>
            )} */}
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
};

// const LoginView = withFormik<FormProps, FormValues>(){...}

const LoginView = withFormik<IProps, FormValues>({
  mapPropsToValues: (props) => ({ email: "", password: "" }),
  validationSchema: Yup.object({
    email: Yup.string().required(),
  }),
  // handleSubmit: (values) => {
  //   console.log(values);
  // },
  handleSubmit: (
    values: FormValues,
    formikBag: FormikBag<IProps, FormValues>
  ) => {
    // console.log(values);

    let { props } = formikBag;

    console.log(props);

    props.test();

    // formikBag.props.login_user(values, formikBag.props.)

    // props.login_user(values, props.history);
    
    // props.login_user(values);
  },
})(Login);

export default compose<any>(
  connect(null, { login_user, test }),
  withRouter
)(LoginView);
