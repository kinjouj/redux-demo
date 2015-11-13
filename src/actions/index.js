import db from "db.js";
import {
  ACTION_ADD_TODO,
  ACTION_ADD_TODO_COMPLETE,
  ACTION_FETCH,
  ACTION_RECV
} from "../constants";

require("babel-polyfill");

const DB_NAME = "redux-todo";

function openDB() {
  return new Promise((resolve) => {
    db.open({
      server: DB_NAME,
      version: 1,
      schema: {
        todo: {
          key: { keyPath: "id", autoIncrement: true },
          indexes: {
            body: { unique: true }
          }
        }
      }
    }).then((server) => {
      resolve(server);
    });
  });
}

function createTodo(text) {
  return (dispatch) => {
    dispatch({ type: ACTION_ADD_TODO });
    return new Promise(() => {
      (async () => {
        let server = await openDB();
        let entries = await server.todo.add({ body: text });
        setTimeout(() => {
          dispatch({ type: ACTION_ADD_TODO_COMPLETE, todos: entries });
        }, 1000);
      })();
    });
  };
}

function getTodos() {
  return (dispatch) => {
    dispatch({ type: ACTION_FETCH });
    return new Promise(() => {
      (async () => {
        let server = await openDB();
        let entries = await server.todo.query().all().execute();
        setTimeout(() => {
          dispatch({ type: ACTION_RECV, todos: entries });
        }, 2000);
      })();
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
