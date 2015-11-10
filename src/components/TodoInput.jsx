import React, { Component, PropTypes } from "react";
import LinkedStateMixin from "react-addons-linked-state-mixin";
import { connect } from "react-redux";

class TodoInput extends Component {

  static propTypes = {
    onAddTodo: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.linkState = LinkedStateMixin.linkState;
    this.state = {};
  }

  render() {
    var inputLink = {
      value: this.state.text,
      requestChange: (text) => {
        this.setState({ text: text });
      }
    };

    return (
      <div>
        <input type="text" ref="input" valueLink={inputLink} />
        <button onClick={(e) => this.handleClick(e)}>add</button>
      </div>
    );
  }

  handleClick(e) {
    this.props.onAddTodo(this.state.text);
  }
}

export default connect()(TodoInput);
