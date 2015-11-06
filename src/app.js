import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux';
import App from "./components/App";
import rootStore from "./store";


ReactDOM.render(
  <Provider store={rootStore}>
    <App />
  </Provider>,
  document.querySelector("#app")
);
