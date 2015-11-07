import { combineReducers } from "redux";

function rootReducer(state = [], action) {
  switch (action.type) {
    case "echo":
      return [
        { text: action.text },
        ...state.slice(0, 1)
      ];

    default:
      return state;

  }
}

export default combineReducers({ rootReducer });
