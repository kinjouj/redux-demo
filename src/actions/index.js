require("babel-polyfill");

import {
  ACTION_ADD_TODO,
  ACTION_ADD_TODO_COMPLETE,
  ACTION_FETCH,
  ACTION_RECV
} from "../constants";

import ServiceDB from "../service/servicedb";

function createTodo(text) {
  if (!text) {
    throw new Error("invalid parameter: text is empty");
  }

  return (dispatch) => {
    dispatch({ type: ACTION_ADD_TODO });
    return new Promise((resolve) => {
      ServiceDB.openDB().then((server) => {
        server.todo.add({ body: text }).then((entries) => {
          resolve(dispatch({ type: ACTION_ADD_TODO_COMPLETE, todos: entries }));
        });
      });
    });
  };
}

function getTodos() {
  return (dispatch) => {
    dispatch({ type: ACTION_FETCH });
    return new Promise(() => {
      ServiceDB.openDB().then((server) => {
        server.todo.query().all().execute().then((entries) => {
          setTimeout(() => {
            dispatch({ type: ACTION_RECV, todos: entries });
          }, 2000);
        });
      });
    });
  };
}

export function addTodo(text) {
  return (dispatch, getState) => {
    if (!getState().isFetching) {
      return dispatch(createTodo(text));
    }
  };
}

export function fetchData() {
  return (dispatch, getState) => {
    if (!getState().isFetching) {
      return dispatch(getTodos());
    }
  };
}
