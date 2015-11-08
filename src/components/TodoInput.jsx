import React, { Component } from "react";
import { connect } from "react-redux";

class TodoInput extends Component {

  render() {
    return (
      <div>
        <input type="text" ref="input" />
        <button onClick={(e) => this.handleClick(e)}>add</button>
      </div>
    )
  }

  handleClick(e) {
    this.props.onAddTodo(this.refs.input.value);
  }
}

export default connect()(TodoInput);