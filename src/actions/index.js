import db from "db.js";

export const ACTION_ADD_TODO = "add_todo";
export const ACTION_ADD_TODO_COMPLETE = "add_todo_complete";
export const ACTION_FETCH = "fetch";
export const ACTION_RECV = "recv";

const DB_NAME = "redux-todo"
const DB_VERSION = 1;

function open_db() {
  return new Promise((resolve) => {
    db.open({
      server: DB_NAME,
      version: DB_VERSION,
      schema: {
        todo: {
          key: { keyPath: "id", autoIncrement: true },
          indexes: {
            body: { unique: true }
          }
        }
      }
    }) .then((server) => {
      resolve(server);
    });
  });
}

function createTodo(text) {
  return (dispatch) => {
    dispatch({ type: ACTION_ADD_TODO });
    return new Promise((resolve) => {
      open_db().then((server) => {
        server.todo.add({ body: text }).then((entries) => {
          dispatch({ type: ACTION_ADD_TODO_COMPLETE, todos: entries });
        });
      });
    });
  }
}

function getTodos() {
  return (dispatch) => {
    dispatch({ type: ACTION_FETCH });
    return new Promise((resolve) => {
      open_db().then((server) => {
        (async () => {
          let entries = await server.todo.query().all().execute();
          setTimeout(() => {
            dispatch({ type: ACTION_RECV, todos: entries });
          }, 3000);
        })();
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