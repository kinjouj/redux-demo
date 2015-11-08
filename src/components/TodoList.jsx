import React, { Comopnent } from "react";
import { connect } from "react-redux";

class TodoList extends Component {
  render() {
    let { todos } = this.props;
    
    return (
      <div>
        {todos.map((todo, i) =>
        <div key={i}>{todo.body}</div>
        )}
      </div>
    );
  }
}

export default connect()(TodoList);