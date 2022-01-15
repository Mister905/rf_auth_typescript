import { Route, Redirect } from "react-router-dom";
import { useAppSelector } from "../../store/hooks";

const Private_Route = ({ component: Component, ...rest }: any) => {
  const is_authenticated = useAppSelector(
    (state) => state.auth.is_authenticated
  );

  const loading_user = useAppSelector((state) => state.auth.loading_user);

  return (
    <Route
      {...rest}
      render={function (props: any) {
        if (loading_user || !is_authenticated) {
          return <Redirect to="/login" />;
        } else {
          return <Component {...props} />;
        }
      }}
    />
  );
};

export default Private_Route;
