import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import TodoInput from "./TodoInput.jsx";
import TodoList from "./TodoList.jsx";
import * as TodoActions from "../actions";

class App extends Component {

  componentDidMount() {
    this.props.dispatch(TodoActions.fetchData());
  }

  render() {
    return (
      <div>
        <TodoInput onAddTodo={(text) => this.addTodo(text)} />
        <TodoList todos={this.props.todos} />
      </div>
    );
  }

  addTodo(text) {
    this.props.dispatch(TodoActions.addTodo(text));
  }
}

export default connect(
  (state) => {
    return state;
  }
)(App);
