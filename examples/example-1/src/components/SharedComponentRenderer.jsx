import React, { Component } from "react";

class SharedComponentRenderer extends Component {
  render() {
    return (
      <div>
        This is from a shared component:
        {this.props.children}
      </div>
    );
  }
}

export default SharedComponentRenderer;
