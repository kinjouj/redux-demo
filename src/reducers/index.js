import {
  ACTION_ADD_TODO,
  ACTION_ADD_TODO_COMPLETE,
  ACTION_FETCH,
  ACTION_RECV
} from "../actions";

function rootReducer(state = { isFetching: false, todos: [] }, action) {  
  switch (action.type) {
    case ACTION_ADD_TODO:
      return Object.assign({}, state, { isFetching: true });

    case ACTION_ADD_TODO_COMPLETE:
      let todos = [...state.todos, ...action.todos];
      return Object.assign({}, state, { todos: todos });

    case ACTION_FETCH:
      return Object.assign({}, state, { isFetching: true });

    case ACTION_RECV:
      return Object.assign({}, state, { isFetching: false, todos: action.todos });

    default:
      return state;
  }
}

export default rootReducer;
