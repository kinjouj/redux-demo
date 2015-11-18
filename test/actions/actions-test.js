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
    let stub = sinon.stub(ServiceDB, "addTodo", text => {
      expect(text).to.be.eq("hoge");

      return new Promise(resolve => {
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

    expect(
      () => store.dispatch(actions.addTodo())
    ).to.throw("invalid parameter: text is empty");
  });

  it("addTodo: if ServiceDB.addTodo error", (done) => {
    let stub = sinon.stub(ServiceDB, "addTodo", () => {
      return new Promise(() => {
        throw new Error("test error");
      });
    });
    ServiceDB.addTodo = stub;

    let store = getStore(
      null,
      [
        { type: "add_todo" },
        { type: "add_todo_complete", todos: [] }
      ],
      (e) => {
        stub.restore();
        done(e);
      }
    );
    store.dispatch(actions.addTodo("hoge"));
  });

  it("fetchData", (done) => {
    let stub = sinon.stub(ServiceDB, "findAll", function() {
      return new Promise(resolve => {
        resolve([ { body: "hoge" }]);
      });
    });
    ServiceDB.findAll = stub;

    let store = getStore(
      null,
      [
        { type: "fetch" },
        { type: "recv", todos: [ { body: "hoge" } ] }
      ],
      (e) => {
        stub.restore();
        done(e);
      }
    );
    store.dispatch(actions.fetchData());
  });

  it("fetchData: if ServiceDB.findAll error", (done) => {
    let stub = sinon.stub(ServiceDB, "findAll", function() {
      return new Promise(() => {
        throw new Error("test error")
      });
    });
    ServiceDB.findAll = stub;

    let store = getStore(
      null,
      [
        { type: "fetch" },
        { type: "recv", todos: [] }
      ],
      (e) => {
        stub.restore();
        done(e);
      }
    );
    store.dispatch(actions.fetchData());
  });
});
