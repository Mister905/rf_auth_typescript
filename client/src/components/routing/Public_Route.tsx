import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const Public_Route = ({ component: Component, ...rest }: any) => {
  const is_authenticated = useAppSelector(
    (state) => state.auth.is_authenticated
  );

  return (
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
};

export default Public_Route;
