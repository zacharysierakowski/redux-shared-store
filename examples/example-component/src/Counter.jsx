import React, { Component } from "react";
import { connect } from "react-redux";

import { increase, decrease } from "./actions/count";

class Counter extends Component {
  render() {
    const { increase, decrease } = this.props;
    return (
      <div>
        Count: {this.props.count}&nbsp;
        <button onClick={increase}>+</button>&nbsp;
        <button onClick={decrease}>-</button>
      </div>
    );
  }
}

const mapStateToProps = ({ components: { counter } }) => {
  const { count } = counter;
  return {
    count: count.value
  };
};
export default connect(mapStateToProps, {
  increase,
  decrease
})(Counter);
