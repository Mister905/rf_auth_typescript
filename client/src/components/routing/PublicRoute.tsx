import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { RootState } from "../../store";

/* PrivateRoute accepts a component argument that, one of them is component, 
when we pass "component" as an argument to route it has the lower case c, 
but when we render the component it has to be "Component" to let JSX know 
that we want to render a component */
const PrivateRoute = ({
  component: Component,
  auth: { is_authenticated, loading_user },
  ...rest
}: any) => (
  <Route
    {...rest}
    render={function (props: any) {
      if (is_authenticated) {
        return <Redirect to="/products" />;
      } else {
        return <Component {...props} />;
      }
    }}
  />
);

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(PrivateRoute);
