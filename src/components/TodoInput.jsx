/*eslint-disable no-unused-vars*/
import React, { Component, PropTypes } from "react";
/*eslint-enable no-unsed-vars*/
import LinkedStateMixin from "react-addons-linked-state-mixin";
import { connect } from "react-redux";

class TodoInput extends Component {

  static propTypes = {
    onAddTodo: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {};
    this.linkState = LinkedStateMixin.linkState;
  }

  render() {
    return (
      <div>
        <input type="text" valueLink={this.linkState("text")} />
        <button onClick={(e) => this.handleClick(e)}>add</button>
      </div>
    );
  }

  handleClick(e) {
    this.props.onAddTodo(this.state.text);
  }
}

export default connect(
  state => {
    return {};
  },
  null,
  null,
  { withRef: true }
)(TodoInput);
