import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import Echo from "./Echo";
import * as EchoAction from "../actions";

class App extends Component {

  render() {
    return (
      <div>
        <input type="text" ref="input" onChange={(e) => this.changeText(e)} />
        <Echo />
      </div>
    );
  }

  changeText() {
    this.props.actions.changeEcho(this.refs.input.value);
  }

}

export default connect(
  (state) => {
    return {};
  },
  (dispatch) => {
    return {
      actions: bindActionCreators(EchoAction, dispatch)
    }
  }
)(App);
