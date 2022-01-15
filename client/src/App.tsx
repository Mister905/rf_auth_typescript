import { useEffect } from "react";
import { Switch } from "react-router-dom";
// Components
import Landing from "./components/landing/Landing";
import Modal from "./components/modal/Modal";
import Header from "./components/header/Header";
import Products from "./components/products/Products";
import Login from "./components/login/Login";
import Register from "./components/register/Register";
import Create_Product from "./components/create_product/Create_Product";
import Update_Product from "./components/update_product/Update_Product";
import View_Product from "./components/view_product/View_Product";
import PrivateRoute from "./components/routing/PrivateRoute";
import PublicRoute from "./components/routing/PublicRoute";
import { load_active_user } from "./action_creators/auth_actions";
import { Auth_Action } from "./action_interfaces/auth_interface";
import { Dispatch } from "redux";
import { useAppSelector } from "./store/hooks";
import { useDispatch } from "react-redux";

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

const App: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const is_authenticated = useAppSelector(
    (state) => state.auth.is_authenticated
  );

  const display_modal = useAppSelector((state) => state.modal.display_modal);

  useEffect(() => {
    dispatch(load_active_user());
  }, [is_authenticated]);

  return (
    <div className="App">
      <Header />
      {display_modal && <Modal />}
      <Switch>
        <PublicRoute exact path="/" component={Landing} />
        <PublicRoute exact path="/login" component={Login} />
        <PublicRoute exact path="/register" component={Register} />
        <PrivateRoute exact path="/products" component={Products} />
        <PrivateRoute exact path="/create_product" component={Create_Product} />
        <PrivateRoute exact path="/view_product/:id" component={View_Product} />
        <PrivateRoute
          exact
          path="/update_product/:id"
          component={Update_Product}
        />
      </Switch>
    </div>
  );
};

export default App;
