import React, { Component } from "react";
import { connect } from "react-redux";

class TodoList extends Component {

  render() {
    return (
      <div>
        {this.props.todos.map((todo,) =>
        <div className="todo" key={todo.id} ref="todo" >
          <span className="todo-text">{todo.body}</span>
          <a onClick={(e) => this.handleDeleteClick(this)}>削除</a>
        </div>
        )}
      </div>
    );
  }

  handleDeleteClick(e) {
    console.dir(e);
  }
}

export default connect()(TodoList);
