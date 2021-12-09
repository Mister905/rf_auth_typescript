import * as React from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";


const mapStateToProps = (state: RootState) => ({
  
});

const dispatchProps = {
  
};

class Header extends React.Component<{}, {}> {
  render() {
    return (
      <div>
      </div>
    );
  }
}

export default connect(mapStateToProps, dispatchProps)(Header);
