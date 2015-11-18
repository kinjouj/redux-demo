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
      let { "todos": addStateTodos = [] } = state;
      let { "todos": addActionTodos = [] } = action;
      const addedTodos = [ ...addStateTodos, ...addActionTodos ];

      return Object.assign({}, state, { isFetching: false, todos: addedTodos });

    case ACTION_FETCH:
      return Object.assign({}, state, { isFetching: true });

    case ACTION_RECV:
      let { "todos": recvActionTodos = [] } = action;
      let { "todos": recvStateTodos = [] } = state;
      const recvTodos = [ ...recvStateTodos, ...recvActionTodos ];

      return Object.assign({}, state, { isFetching: false, todos: recvTodos });

    default:
      return state;
  }
}

export default rootReducer;
