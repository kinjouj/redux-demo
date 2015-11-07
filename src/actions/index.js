const ACTION_FETCH_DATE = "fetch_data";

function getTodos() {
  return (dispatch) => {
    dispatch({ type: "fetch" });
    return new Promise((resolve) => {
      setTimeout(() => {
        dispatch({ type: "recv", todos: ["hoge", "fuga", "foobar" ] });
      }, 3000);
    });
  };
}

export function fetchData() {
  return (dispatch, getState) => {
    console.log(getState());

    return dispatch(getTodos());
  };
}
