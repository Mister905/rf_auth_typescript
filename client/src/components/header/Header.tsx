import React from "react";
import { Link } from "react-router-dom";
import { logout_user } from "../../action_creators/auth_actions";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Header: React.FC<{}> = () => {
  const history = useHistory();

  const dispatch = useDispatch();

  const is_authenticated = useAppSelector(
    (state) => state.auth.is_authenticated
  );

  function handle_logout() {
    dispatch(logout_user(history));
  }

  return (
    <div>
      <nav>
        <div className="nav-wrapper">
          <Link to={"/"} className="brand-logo">
            React Flask App
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              {is_authenticated ? (
                <a onClick={handle_logout}>Logout</a>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Header;
