import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { logout_user } from "../../action_creators/auth_actions";
import { RootState } from "../../store";
import { History } from "history";
import { Auth_Action } from "../../action_interfaces/auth_interface";
import { Dispatch } from "redux";


interface I_user {
  first_name: string;
  last_name: string;
  email: string;
}

interface I_auth {
  access_token: string | null;
  is_authenticated: boolean;
  loading_user: boolean;
  user: I_user | null;
}

interface I_props {
  auth: I_auth;
  history: History;
  logout_user: (history: History) => Dispatch<Auth_Action>;
}

class Header extends React.Component<I_props, {}> {
  handle_logout = () => {
    this.props.logout_user(this.props.history);
  };

  render() {
    const { is_authenticated } = this.props.auth;
    return (
      <nav>
        <div className="nav-wrapper">
          <Link to={"/"} className="brand-logo">
            React Flask App
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li>
              {is_authenticated ? (
                <a onClick={this.handle_logout}>Logout</a>
              ) : (
                <Link to={"/login"}>Login</Link>
              )}
            </li>
          </ul>
        </div>
      </nav>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  auth: state.auth,
});

export default compose<any>(
  connect(mapStateToProps, { logout_user }),
  withRouter
)(Header);
