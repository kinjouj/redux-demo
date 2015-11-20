require("isomorphic-fetch");

import {
  ACTION_ADD_TODO,
  ACTION_ADD_TODO_COMPLETE,
  ACTION_FETCH,
  ACTION_RECV
} from "../constants";

export class Actions {

  static addTodo(text) {
    if (!text) {
      throw new Error("invalid parameter: text is empty");
    }

    return dispatch => {
      dispatch({ type: ACTION_ADD_TODO });
      return new Promise(resolve => {
        fetch(
          `https://kinjouj-test.appspot.com/_ah/api/todo/v1/push?body=${text}`,
          { method: "post" }
        ).then(res => res.json()).then(json => {
          var entry = { id: Number(json.key.id), body: json.properties.body };
          resolve(dispatch({ type: ACTION_ADD_TODO_COMPLETE, todos: [entry] }));
        }).catch((error) => {
          resolve(dispatch({ type: ACTION_ADD_TODO_COMPLETE, todos: [] }));
        });
      });
    }
  }

  static getTodos() {
    return dispatch => {
      dispatch({ type: ACTION_FETCH });
      return new Promise(resolve => {
        fetch("https://kinjouj-test.appspot.com/_ah/api/todo/v1/fetch")
          .then(res => res.json())
          .then(json => {
            var entries = [];

            if ("items" in json) {
              json.items.forEach((entry) => {
                entries.push({
                  id: Number(entry.key.id),
                  body: entry.properties.body
                });
              });
            }

            resolve(dispatch({ type: ACTION_RECV, todos: entries }));
          })
          .catch((error) => {
            resolve(dispatch({ type: ACTION_RECV, todos: [] }));
          });
      });
    };
  }
}

export function addTodo(text) {
  return (dispatch, getState) => {
    let state = getState() || {};

    if (!state.isFetching) {
      return dispatch(Actions.addTodo(text));
    }
  };
}

export function fetchData() {
  return (dispatch, getState) => {
    let state = getState() || {};

    if (!state.isFetching) {
      return dispatch(Actions.getTodos());
    }
  };
}
