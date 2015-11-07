import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import EchoInput from "./EchoInput";
import Echo from "./Echo";
import * as EchoAction from "../actions";

class App extends Component {

  static propTypes = {
    echo: PropTypes.object.isRequired
  };

  render() {
    let { echo, reducers } = this.props;
    console.log("reducers", reducers);

    return (
      <div>
        <EchoInput onChange={(text) => this.changeText(text)} />
        <Echo text={echo.text} />
      </div>
    );
  }

  changeText(text) {
    this.props.actions.changeEcho(text);
  }

}

export default connect(
  (state) => {
    let reducers = state.rootReducer;
    let echo = reducers[0] || {};

    return {
      reducers,
      echo
    };
  },
  (dispatch) => {
    return {
      actions: bindActionCreators(EchoAction, dispatch)
    }
  }
)(App);
