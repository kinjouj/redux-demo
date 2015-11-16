import { expect } from "chai";
import sinon from "sinon";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ServiceDB from "../../src/service/servicedb";
import * as actions from "../../src/actions";

function getStore(state, expectedActions, done) {
  let getStore = applyMiddleware(thunk)(
    () => {
      return {
        getState: function() {
          return state;
        },
        dispatch: function(action) {
          var expectAction = expectedActions.shift();

          try {
            expect(expectAction).to.be.eql(action);

            if (done && !expectedActions.length) {
              done();
            }

            return action;
          } catch (e) {
            console.error(e);
            done(e);
          }
        }
      };
    }
  );

  return getStore();
}

describe("actions", () => {
  it("addTodo", (done) => {
    let stub = sinon.stub(ServiceDB, "addTodo", function(text) {
      expect(text).to.be.eq("hoge");

      return new Promise((resolve) => {
        resolve([{ body: text }]);
      });
    });
    ServiceDB.addTodo = stub;

    let store = getStore(
      null,
      [
        { type: "add_todo" },
        { type: "add_todo_complete", todos: [ { body: "hoge" } ] }
      ],
      (e) => {
        stub.restore();
        done(e);
      }
    );
    store.dispatch(actions.addTodo("hoge"));
  });

  it("addTodo2", () => {
  });
});
