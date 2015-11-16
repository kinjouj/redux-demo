import { expect } from "chai";
import React from "react";
import { createStore } from "redux";
import { Provider } from "react-redux";
import ReactTestUtils from "react-addons-test-utils";

describe("TodoList", () => {
  it("render", () => {
    var TodoList = require("../../src/components/TodoList").default;
    let store = createStore(() => { return {} });

    let todos = [ { id: 1, body: "A" } ];
    let component = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <TodoList todos={todos} />
      </Provider>
    );

    let todoList = ReactTestUtils.findRenderedComponentWithType(
      component,
      TodoList
    );

    let item = ReactTestUtils.findRenderedDOMComponentWithClass(
      todoList,
      "todo"
    );
    expect(item).to.be.exist;
  });
});
