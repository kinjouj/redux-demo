/*eslint-disable no-unused-vars*/
import React, { Component, PropTypes} from "react";
/*eslint-enable no-unused-vars*/
import { connect } from "react-redux";

class TodoItem extends Component {

  static propTypes = {
    todo: PropTypes.object.isRequired
  }

  render() {
    let { todo } = this.props;

    return (
      <div className="todo">
        <span className="todo-body">{todo.body}</span>
        <a onClick={() => this.handleDeleteClick(this)}>削除</a>
      </div>
    );
  }
}

export default connect()(TodoItem);
