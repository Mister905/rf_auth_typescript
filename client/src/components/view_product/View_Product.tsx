import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";


const mapStateToProps = (state: RootState) => ({
  
});

const dispatchProps = {
  
};

class View_Products extends React.Component<{}, {}> {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect(mapStateToProps, dispatchProps)(View_Products);
