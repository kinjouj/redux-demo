import React, { Component, PropTypes } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import EchoInput from "./EchoInput";
import Echo from "./Echo";
import * as EchoActions from "../actions";

class App extends Component {

  static propTypes = {
    echo: PropTypes.object.isRequired,
    reducers: PropTypes.array.isRequired,
    actions: PropTypes.object.isRequired
  };

  render() {
    let { echo, reducers } = this.props;
    console.log("reducers", reducers);

    return (
      <div className="page-content">
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

    return { echo, reducers };
  },
  (dispatch) => {
    return {
      actions: bindActionCreators(EchoActions, dispatch)
    }
  }
)(App);
