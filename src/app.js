import React from "react";
import ReactDOM from "react-dom";
import { createStore } from 'redux';
import { Provider, connect } from 'react-redux';
import Home from "./components/home";
import rootReducer from "./reducers/root";

let store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <Home />
  </Provider>,
  document.querySelector("#app")
);
