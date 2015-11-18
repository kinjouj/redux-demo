import { expect } from "chai";
import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-addons-test-utils";
import { createStore } from "redux";
import { Provider } from "react-redux";

describe("TodoInput", () => {
  it("render", (done) => {
    var TodoInput = require("../../src/components/TodoInput").default;
    let store = createStore(() => { return {} });

    let onAddTodo = (text) => {
      expect(text).to.be.eq("hoge");
      done();
    };

    let component = ReactTestUtils.renderIntoDocument(
      <Provider store={store}>
        <TodoInput onAddTodo={onAddTodo} />
      </Provider>
    );

    let todo = ReactTestUtils.findRenderedComponentWithType(
      component,
      TodoInput
    );

    let input = ReactTestUtils.findRenderedDOMComponentWithTag(todo, "input");
    ReactTestUtils.Simulate.change(input, { target: { value: "hoge" }});

    let button = ReactTestUtils.findRenderedDOMComponentWithTag(todo, "button");
    ReactTestUtils.Simulate.click(button);

    let instance = todo.getWrappedInstance();
    expect(instance.state.text).to.be.eq("hoge");
  });
});
