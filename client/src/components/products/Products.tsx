import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";


const mapStateToProps = (state: RootState) => ({
  
});

const dispatchProps = {
  
};

class Products extends React.Component<{}, {}> {
  render() {
    return (
      <div>
        Products
      </div>
    );
  }
}

export default connect(mapStateToProps, dispatchProps)(Products);
