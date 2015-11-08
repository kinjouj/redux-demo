function rootReducer(state = { isFetching: false, todos: [] }, action) {  
  switch (action.type) {
    case "add_todo_complete":
      let todos = [...state.todos, ...action.todos];
      console.log('added todo', todos);
      return Object.assign({}, state, { todos: todos });

    case "fetch":
      return Object.assign({}, state, { isFetching: true });

    case "recv":
      console.log("recv todos", action);
      return Object.assign({}, state, { isFetching: false, todos: action.todos });

    default:
      return state;
  }
}

export default rootReducer;
