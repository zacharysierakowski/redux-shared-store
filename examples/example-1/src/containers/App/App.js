import React, { Component } from "react";
import { connect } from "react-redux";

import StoreRenderer from "../../components/StoreRenderer";
import SharedComponentRenderer from "../../components/SharedComponentRenderer";
import MessageComponent from "../../../message-component/";
import CountComponent from "../../../count-component/";

class App extends Component {
  render() {
    const { reduxState } = this.props;
    return (
      <div>
        <StoreRenderer reduxState={reduxState} />
        <SharedComponentRenderer>
          <MessageComponent />
        </SharedComponentRenderer>
        <SharedComponentRenderer>
          <CountComponent />
        </SharedComponentRenderer>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    reduxState: state
  };
};
export default connect(mapStateToProps)(App);
