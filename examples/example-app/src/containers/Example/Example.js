import React, { Component } from "react";
import { connect } from "react-redux";

import Counter from "shared-redux-store-example-component";
import StoreRenderer from "../../components/StoreRenderer";

class Example extends Component {
  render() {
    const { reduxState } = this.props;
    return (
      <div>
        <StoreRenderer reduxState={reduxState} />
        <Counter />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reduxState: state
  };
};
export default connect(mapStateToProps)(Example);
