import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { close_modal } from "../../action_creators/modal_actions";
import { compose } from "redux";
import M from "materialize-css";



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

    let instance = M.Modal.init(document.querySelectorAll("#test"), options);

    // let instance = M.Modal.getInstance();

    instance.open();

    // var elems = document.querySelectorAll('.modal');
    // var instances = M.Modal.init(elems, options);
  }
  
  render() {
    return (
      <div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  modal: state.modal
});

export default compose<any>(
  connect(mapStateToProps, { close_modal })
)(Modal);
