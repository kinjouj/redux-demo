import React, { Component } from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as TodoActions from "../actions";

class App extends Component {

  componentDidMount() {
    this.props.dispatch(TodoActions.fetchData());
  }

  render() {
    let { todos } = this.props;

    return (
      <div>
        {todos.map((todo, i) => 
          <div key={i}>{todo}</div>
        )}
      </div>
    );
  }

}

export default connect(
  (state) => {
    return state;
  }
)(App);
