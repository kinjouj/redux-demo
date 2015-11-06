function rootReducer(state = {}, action) {
  switch (action.type) {
    case "echo":
      return { text: action.text };

    default:
      return state;

  }
}

export default rootReducer;
