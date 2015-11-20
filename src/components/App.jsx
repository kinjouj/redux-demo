/*eslint-disable no-unused-vars*/
import React, { Component } from "react";
/*eslint-enable no-unused-vars*/
import { connect } from "react-redux";
import TodoInput from "./TodoInput";
import TodoList from "./TodoList";
import { fetchData, addTodo } from "../actions";

class App extends Component {

  componentDidMount() {
    this.props.fetchData();
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
    this.props.addTodo(text);
  }
}

function mapStateToProps(state) {
  return { todos: state.todos };
}

export default connect(mapStateToProps, { fetchData, addTodo })(App);
