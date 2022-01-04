import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { close_modal } from "../../action_creators/modal_actions";
import { compose, Dispatch } from "redux";
import M from "materialize-css";
import { Modal_Action } from "../../action_interfaces/modal_interface";


interface I_modal {
  display_modal: boolean;
  modal_title: string;
  modal_body: string;
  modal_confirmation: string;
  modal_decline: string;
}

interface I_props {
  modal: I_modal;
  close_modal: () => Dispatch<Modal_Action>;
}

class Modal extends React.Component<I_props, {}> {
  componentDidMount() {
    const options = {
      onCloseEnd: () => {
        instance.close();
        instance.destroy();
        this.props.close_modal();
      },
      inDuration: 250,
      outDuration: 250,
      opacity: 0.5,
      dismissible: false,
      startingTop: "4%",
      endingTop: "10%",
    };

    M.Modal.init(document.querySelector("#test")!, options);

    let instance = M.Modal.getInstance(document.querySelector("#test")!);

    instance.open();
  }

  render() {
    const { modal_title, modal_body, modal_confirmation, modal_decline } =
      this.props.modal;
    return (
      <div>
        <div
          id="test"
          className="modal"
        >
          <div className="modal-content">
            <h4>{modal_title}</h4>
            <p>{modal_body}</p>
          </div>
          <div className="modal-footer">
            {modal_decline && (
              <a className="modal-close waves-effect waves-red btn-flat">
                {modal_decline}
              </a>
            )}
            <a className="modal-close waves-effect waves-green btn-flat">
              {modal_confirmation}
            </a>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  modal: state.modal,
});

export default compose<any>(connect(mapStateToProps, { close_modal }))(Modal);
