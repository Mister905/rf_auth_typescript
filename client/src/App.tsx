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
import Private_Route from "./components/routing/Private_Route";
import Public_Route from "./components/routing/Public_Route";
import { load_active_user } from "./action_creators/auth_actions";
import { useAppSelector } from "./store/hooks";
import { useDispatch } from "react-redux";


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
        <Public_Route exact path="/" component={Landing} />
        <Public_Route exact path="/login" component={Login} />
        <Public_Route exact path="/register" component={Register} />
        <Private_Route exact path="/products" component={Products} />
        <Private_Route exact path="/create_product" component={Create_Product} />
        <Private_Route exact path="/view_product/:id" component={View_Product} />
        <Private_Route
          exact
          path="/update_product/:id"
          component={Update_Product}
        />
      </Switch>
    </div>
  );
};

export default App;
