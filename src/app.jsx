/*eslint-disable no-unused-vars*/
import React from "react";
/*eslint-enable no-unused-vars*/
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./components/App";
import store from "./store";

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
