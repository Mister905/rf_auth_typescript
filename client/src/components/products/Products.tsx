import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import {
  get_products,
  clear_products,
  delete_product,
} from "../../action_creators/product_actions";
import { Auth_Action } from "../../action_interfaces/auth_interface";
import { Dispatch } from "redux";
import { compose } from "redux";

class Products extends React.Component<{}, {}> {
  render() {
    return <div>Products</div>;
  }
}

const mapStateToProps = (state: RootState) => ({
  product: state.product,
});

export default compose<any>(
  connect(mapStateToProps, { get_products, clear_products, delete_product })
)(Products);
