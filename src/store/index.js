import { applyMiddleware, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
import logger from "redux-logger";
import rootReducer from "../reducers";

let createStoreWithMiddleware = applyMiddleware(
  logger({ collapsed: true }),
  thunkMiddleware
)(createStore);

export default createStoreWithMiddleware(rootReducer);