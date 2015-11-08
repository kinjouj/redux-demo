import db from "db.js";

export const ACTION_ADD_TODO = "add_todo";
export const ACTION_ADD_TODO_COMPLETE = "add_todo_complete";
export const ACTION_FETCH_DATA = "fetch_data";

function open_db() {
  return new Promise((resolve) => {
    db.open({
        server: "redux-todo",
        version: 1,
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
    dispatch({ type: "fetch" });
    return new Promise((resolve) => {
      open_db().then((server) => {
        (async () => {
          let entries = await server.todo.query().all().execute();
          dispatch({ type: "recv", todos: entries });
        })();
      });
    });
  };
}

export function addTodo(text) {
  return (dispatch, getState) => {
    console.log(getState());
    
    return dispatch(createTodo(text));
  };
}

export function fetchData() {
  return (dispatch, getState) => {
    console.log(getState());

    return dispatch(getTodos());
  };
}
