import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import rootStore from "./store";
import App from "./components/App";

ReactDOM.render(
  <Provider store={rootStore}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
