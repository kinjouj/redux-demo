import expect from "expect";
import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-addons-test-utils";
import { createStore } from "redux";
import { Provider } from "react-redux";

describe("TodoInput", () => {
  it("render", (done) => {
    var TodoInput = require("../../src/components/TodoInput").default;
    var store = createStore(() => {});

    let onAddTodo = (text) => {
      expect(text).toEqual("hoge");
      done();
    };

    let component = ReactTestUtils.renderIntoDocument(
      <TodoInput store={store} onAddTodo={onAddTodo} />
    );

    let input = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
    ReactTestUtils.Simulate.change(input, { target: { value: "hoge" }});

    let button = ReactTestUtils.findRenderedDOMComponentWithTag(component, "button");
    ReactTestUtils.Simulate.click(button);
  });
});
