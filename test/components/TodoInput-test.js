import expect from "expect";
import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-addons-test-utils";

describe("TodoInput", () => {
  it("render", (done) => {
    var TodoInput = require("../../src/components/TodoInput").default;
    var store = {
      getState: function() {
        return {};
      },
      subscribe: function() {},
      dispatch: function() {}
    };

    let onAddTodo = (text) => {
      expect(text).toEqual("hoge");
      done();
    };

    let c = <TodoInput store={store} onAddTodo={onAddTodo} />;
    let component = ReactTestUtils.renderIntoDocument(c);
    let input = ReactTestUtils.findRenderedDOMComponentWithTag(component, "input");
    ReactTestUtils.Simulate.change(input, { target: { value: "hoge" }});
    ReactTestUtils.Simulate.click(ReactTestUtils.findRenderedDOMComponentWithTag(component, "button"));
  });
});
