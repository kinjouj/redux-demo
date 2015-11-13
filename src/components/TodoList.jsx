import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import TodoItem from "./TodoItem";

class TodoList extends Component {

  static propTypes = {
    todos: PropTypes.array.isRequired
  }

  render() {
    let { todos } = this.props;

    return (
      <div>
        {todos.map((todo) =>
        <TodoItem key={todo.id} todo={todo} />
        )}
      </div>
    );
  }
}

export default connect()(TodoList);
