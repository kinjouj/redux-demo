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
    return new Promise(resolve => {
      ServiceDB.addTodo(text).then(entries => {
        setTimeout(() => {
          resolve(dispatch({ type: ACTION_ADD_TODO_COMPLETE, todos: entries }));
        }, 3000);
      }).catch(error => {
        console.error(error);
        resolve(dispatch({ type: ACTION_ADD_TODO_COMPLETE, todos: [] }));
      });
    });
  };
}

function getTodos() {
  return (dispatch) => {
    dispatch({ type: ACTION_FETCH });
    return new Promise(resolve => {
      ServiceDB.findAll().then(entries => {
        resolve(dispatch({ type: ACTION_RECV, todos: entries }));
      });
    });
  };
}

export function addTodo(text) {
  return (dispatch, getState) => {
    let state = getState() || {};

    if (!state.isFetching) {
      return dispatch(createTodo(text));
    }
  };
}

export function fetchData() {
  return (dispatch, getState) => {
    let state = getState() || {};

    if (!state.isFetching) {
      return dispatch(getTodos());
    }
  };
}
