import expect from "expect";
import sinon from "sinon";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import ServiceDB from "../../src/service/servicedb";
import * as actions from "../../src/actions";

function getStore(state = {}, expectedActions, done) {
  let getStore = applyMiddleware(thunk)(
    () => {
      return {
        getState: function() {
          return state;
        },
        dispatch: function(action) {
          var expectAction = expectedActions.shift();

          try {
            expect(expectAction).toEqual(action);

            if (done && !expectedActions.length) {
              done();
            }

            return action;
          } catch (e) {
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
    ServiceDB.openDB = function() {
      return new Promise((resolve) => {
        resolve({
          todo: {
            add: function(todo) {
              return new Promise((resolve) => {
                resolve([todo]);
              });
            }
          }
        });
      });
    };

    let store = getStore(
      {},
      [
        { type: "add_todo" },
        { type: "add_todo_complete", todos: [ { body: "hoge" } ] }
      ],
      done
    );
    store.dispatch(actions.addTodo("hoge"));
  });
});
