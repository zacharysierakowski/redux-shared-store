import React, { Component } from "react";
import { connect } from "react-redux";

class MessageComponent extends Component {
  render() {
    return (
      <div>
        Message: {this.props.message}
      </div>
    );
  }
}

const mapStateToProps = ({ shared: { messageComponent } }) => {
  const { message } = messageComponent;
  return {
    message: message.value
  };
};
export default connect(mapStateToProps)(MessageComponent);
