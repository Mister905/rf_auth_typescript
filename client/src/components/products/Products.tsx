import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { Modal_Action } from "../../action_interfaces/modal_interface";
import { Product_Action } from "../../action_interfaces/products_interface";
import { compose, Dispatch } from "redux";
import M from "materialize-css";
import "materialize-css/dist/css/materialize.min.css";
import { Link } from "react-router-dom";
import Preloader from "../preloader/Preloader";
import {
  get_products,
  clear_products,
  delete_product,
} from "../../action_creators/product_actions";
import { display_modal } from "../../action_creators/modal_actions";

interface I_modal {
  display_modal: boolean;
  modal_title: string;
  modal_body: string;
  modal_confirmation: string;
  modal_decline: string;
}

interface I_product {
  id: number;
  name: string;
  type: string;
  weight: string;
  inventory_count: number;
}

interface I_products {
  product_list: I_product[];
  loading_products: boolean;
  loading_product: boolean;
  product: I_product | null;
}

interface I_props {
  modal: I_modal;
  products: I_products;
  display_modal: (
    modal_title: string,
    modal_body: string,
    modal_confirmation: string,
    modal_decline: string
  ) => Dispatch<Modal_Action>;

  get_products: () => Dispatch<Product_Action>;

  clear_products: () => Dispatch<Product_Action>;

  delete_product: (product_id: number) => Dispatch<Product_Action>;
}

class Products extends React.Component<I_props, {}> {
  componentDidMount() {
    this.props.clear_products();

    // Simulate Async
    setTimeout(this.props.get_products, 5000);

    this.props.get_products();
  }

  componentDidUpdate(prevProps: I_props) {
    if (this.props.products.product_list !== prevProps.products.product_list) {
      const options = {
        onOpenStart: () => {
          console.log("Open Start");
        },
        onOpenEnd: () => {
          console.log("Open End");
        },
        onCloseStart: () => {
          console.log("Close Start");
        },
        onCloseEnd: () => {
          console.log("Close End");
        },
        inDuration: 250,
        outDuration: 250,
        opacity: 0.5,
        dismissible: false,
        startingTop: "4%",
        endingTop: "10%",
      };

      var elems = document.querySelectorAll(".modal");

      M.Modal.init(elems, options);
    }

    if (
      this.props.products.loading_products !==
      prevProps.products.loading_products
    ) {
      this.props.get_products();
    }
  }

  display_modal = () => {
    this.props.display_modal("Test Title", "Test Body", "Confirm", "Cancel");
  };

  handle_delete_product = (product_id: number) => {
    this.props.delete_product(product_id);
  };

  output_products = () => {
    
    const { product_list } = this.props.products;

    return (
      <ul className="collection">
        {product_list.map((product) => {
          return (
            <li className="collection-item" key={product.id}>
              <div className="row">
                <div className="col m6">{product.name}</div>
                <div className="col m6">
                  <div className="row">
                    <div className="col m6">
                      <Link to={`/view_product/${product.id}`} className="btn">
                        View
                      </Link>
                    </div>
                    <div className="col m6">
                      <a
                        className="waves-effect waves-light btn modal-trigger"
                        data-target={`modal_${product.id}`}
                      >
                        Delete
                      </a>

                      <div id={`modal_${product.id}`} className="modal">
                        <div className="modal-content">
                          <h4>Delete Product</h4>
                          <p>
                            Are you sure you want to delete product:{" "}
                            {product.name}
                          </p>
                        </div>
                        <div className="modal-footer">
                          <a className="modal-close waves-effect waves-red btn-flat">
                            Cancel
                          </a>
                          <a
                            onClick={() =>
                              this.handle_delete_product(product.id)
                            }
                            className="modal-close waves-effect waves-green btn-flat"
                          >
                            Delete
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        }, this)}
      </ul>
    );
  };

  render() {
    const { loading_products } = this.props.products;
    return (
      <div className="container mt-50">
        <div className="row">
          <div className="col m4 offset-m8">
            <div className="row">
              <div className="col m6">
                <button onClick={this.display_modal} className="btn">
                  Display Modal
                </button>
              </div>
              <div className="col m6">
                <Link to={"/create_product"} className="btn">
                  Create Product
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col m6 offset-m3 align-center">
            {loading_products ? <Preloader /> : this.output_products()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  modal: state.modal,
  products: state.product,
});

export default compose<any>(
  connect(mapStateToProps, {
    display_modal,
    get_products,
    clear_products,
    delete_product,
  })
)(Products);
