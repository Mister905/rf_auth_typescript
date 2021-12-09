import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";


const mapStateToProps = (state: RootState) => ({
  
});

const dispatchProps = {
  
};

class Create_Product extends React.Component<{}, {}> {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect(mapStateToProps, dispatchProps)(Create_Product);
