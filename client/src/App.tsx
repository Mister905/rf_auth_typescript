import * as React from "react";
import { connect } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { RootState } from "./store";
// Components
import Landing from "./components/landing/Landing";
// import Modal from "./components/modal/Modal";
import Header from "./components/header/Header";
import Products from "./components/products/Products";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
// import Create_Product from "./components/create_product/Create_Product";
// import Update_Product from "./components/update_product/Update_Product";
// import View_Product from "./components/view_product/View_Product";
import PrivateRoute from "./components/routing/PrivateRoute";
import PublicRoute from "./components/routing/PublicRoute";
import { load_active_user } from "./action_creators/auth_actions";
import { Auth_Action } from "./action_interfaces/auth_interface";
import { Dispatch } from "redux";
import { compose } from "redux";

interface I_auth {
  access_token: null;
  is_authenticated: false;
  loading_user: true;
  user: null;
}

interface I_modal {
  display_modal: false;
  modal_title: "";
  modal_body: "";
  modal_confirmation: "";
  modal_decline: "";
}

interface I_props {
  auth: I_auth;
  modal: I_modal;
  load_active_user: () => Dispatch<Auth_Action>;
}

class App extends React.Component<I_props, {}> {
  componentDidMount = () => {
    this.props.load_active_user();
  };

  componentDidUpdate = (prevProps: I_props) => {
    if (this.props.auth.is_authenticated !== prevProps.auth.is_authenticated) {
      if (this.props.auth.is_authenticated) this.props.load_active_user();
    }
  };

  render() {
    return (
      <div className="App">
        <Header />
        {/* {display_modal && <Modal />} */}
        <Switch>
          <PublicRoute exact path="/" component={Landing} />
          <PublicRoute exact path="/login" component={Login} />
          <PublicRoute exact path="/register" component={Register} />
          <PrivateRoute exact path="/products" component={Products} />
          {/* <PrivateRoute
            exact
            path="/create_product"
            component={Create_Product}
          /> */}
          {/* <PrivateRoute
            exact
            path="/view_product/:id"
            component={View_Product}
          /> */}
          {/* <PrivateRoute
            exact
            path="/update_product/:id"
            component={Update_Product}
          /> */}
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
  modal: state.modal,
});

export default compose<any>(connect(mapStateToProps, { load_active_user }))(
  App
);
