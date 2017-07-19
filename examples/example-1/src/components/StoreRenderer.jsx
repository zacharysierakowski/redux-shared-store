import React, { Component } from "react";

class StoreRenderer extends Component {
  render() {
    return (
      <div>
        This is the current state of the redux store:
        <pre>{JSON.stringify(this.props.reduxState, null, 2)}</pre>
      </div>
    );
  }
}

export default StoreRenderer;
