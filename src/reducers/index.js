function rootReducer(state = { isFetching: false, todos: [] }, action) {
  console.log(action);

  switch (action.type) {
    case "fetch":
      return Object.assign({}, state, { isFetching: true });

    case "recv":
      return Object.assign({}, state, { isFetching: false, todos: action.todos });

    default:
      return state;

  }
}

export default rootReducer;
