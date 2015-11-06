import React, { Component } from "react";
import { connect } from "react-redux";
import Echo from "./echo";

class Home extends React.Component {

  changeText() {
    console.log(this);
    this.props.dispatch({ type: "echo", text: this.refs.input.value });
  }

  render() {
    return (
      <div>
        <input type="text" ref="input" onChange={this.changeText.bind(this)} />
        <Echo />
      </div>
    );
  }
}

export default connect()(Home);
