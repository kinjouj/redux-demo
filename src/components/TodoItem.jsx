import React, { Component, PropTypes} from "react";
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
        <a onClick={(e) => this.handleDeleteClick(this)}>削除</a>
      </div>
    );
  }
}

export default connect()(TodoItem);
