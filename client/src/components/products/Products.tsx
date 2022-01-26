import { useEffect } from "react";
import M from "materialize-css";
import { useAppSelector } from "../../store/hooks";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {
  get_products,
  delete_product,
} from "../../action_creators/product_actions";
import { display_modal } from "../../action_creators/modal_actions";
import Preloader from "../preloader/Preloader";

const Products: React.FC<{}> = () => {
  const dispatch = useDispatch();

  const product_list = useAppSelector((state) => state.product.product_list);

  const loading_products = useAppSelector(
    (state) => state.product.loading_products
  );

  useEffect(() => {
    dispatch(get_products());
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

    console.log(elems);

    M.Modal.init(elems, options);
  }, [loading_products]);

  function handle_display_modal() {
    dispatch(display_modal("Test Title", "Test Body", "Confirm", "Cancel"));
  }

  function handle_delete_product(product_id: number) {
    console.log("handle_delete_product");
    dispatch(delete_product(product_id));
  }

  function output_products() {
    return (
      <ul className="collection">
        {product_list?.map(function (product) {
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
                            onClick={() => handle_delete_product(product.id)}
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
        })}
      </ul>
    );
  }

  return (
    <div className="container mt-50">
      <div className="row">
        <div className="col m4 offset-m8">
          <div className="row">
            <div className="col m6">
              <button onClick={handle_display_modal} className="btn">
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
          {loading_products ? <Preloader /> : output_products()}
        </div>
      </div>
    </div>
  );
};

export default Products;
