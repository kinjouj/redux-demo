/*eslint-disable no-unused-vars*/
import React, { Component, PropTypes} from "react";
/*eslint-enable no-unused-vars*/
import { connect } from "react-redux";

class TodoItem extends Component {

  static propTypes = {
    todo: PropTypes.shape({
      id: PropTypes.number.isRequired,
      body: PropTypes.string.isRequired
    })
  }

  render() {
    let { todo } = this.props;

    return (
      <div className="todo">
        <span className="todo-body">{todo.body}</span>
      </div>
    );
  }
}

export default connect()(TodoItem);
