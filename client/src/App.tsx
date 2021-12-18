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
// import Register from "./components/register/Register";
// import Create_Product from "./components/create_product/Create_Product";
// import Update_Product from "./components/update_product/Update_Product";
// import View_Product from "./components/view_product/View_Product";
import PrivateRoute from "./components/routing/PrivateRoute"; 
import PublicRoute from "./components/routing/PublicRoute";
// import { countersActions, countersSelectors } from '../features/counters';
// import { FCCounter } from '../components';


class App extends React.Component<{}, {}> {
  render() {
    return (
      <div className="App">
        <Header />
        {/* {display_modal && <Modal />} */}
        <Switch>
          <PublicRoute exact path="/" component={Landing} />
          <PublicRoute exact path="/login" component={Login} />
          {/* <PublicRoute exact path="/register" component={Register} /> */}
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
});

const dispatchProps = {
  // onIncrement: countersActions.increment,
};

export default connect(mapStateToProps, dispatchProps)(App);
