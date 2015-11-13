import expect from "expect";
import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-addons-test-utils";
import { createStore } from "redux";
import { Provider } from "react-redux";

describe("TodoItem", () => {
  it("render", () => {
    var TodoItem = require("../../src/components/TodoItem").default;
    let store = createStore(() => { return {} });

    let todo = { id: 1, body: "hoge" };

    let component = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <TodoItem todo={todo} />
      </Provider>
    );

    let el = ReactTestUtils.findRenderedDOMComponentWithClass(component, "todo");
    expect(el).toExist();

    let body = ReactTestUtils.findRenderedDOMComponentWithClass(component, "todo-body");
    expect(body).toExist();
    expect(ReactDOM.findDOMNode(body).innerHTML).toEqual("hoge");
  });
});
