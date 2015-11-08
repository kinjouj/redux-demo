import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from "./components/App";
import store from "./store";

require("babel-polyfill");

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
