import {
  ACTION_ADD_TODO,
  ACTION_ADD_TODO_COMPLETE,
  ACTION_FETCH,
  ACTION_RECV
} from "../constants";

function rootReducer(state = { isFetching: false, todos: [] }, action) {
  switch (action.type) {
    case ACTION_ADD_TODO:
      return Object.assign({}, state, { isFetching: true });

    case ACTION_ADD_TODO_COMPLETE:
      let { "todos": stateTodos = [] } = state;
      let { "todos": actionTodos = [] } = action;

      return Object.assign(
        {},
        state,
        {
          isFetching: false,
          todos: [ ...stateTodos, ...actionTodos ]
        }
      );

    case ACTION_FETCH:
      return Object.assign({}, state, { isFetching: true });

    case ACTION_RECV:
      let { todos = [] } = action;
      return Object.assign({}, state, { isFetching: false, todos: todos });

    default:
      return state;
  }
}

export default rootReducer;
