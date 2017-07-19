import React, { Component } from "react";
import { connect } from "react-redux";

class CountComponent extends Component {
  render() {
    return (
      <div>
        Count: {this.props.count}
      </div>
    );
  }
}

const mapStateToProps = ({ shared: { countComponent } }) => {
  const { count } = countComponent;
  return {
    count: count.value
  };
};
export default connect(mapStateToProps)(CountComponent);
