import { expect } from "chai";
import nock from "nock";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
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

  afterEach(() => {
    nock.cleanAll()
  });

  it("addTodo", (done) => {
    nock("https://kinjouj-test.appspot.com")
        .post("/_ah/api/todo/v1/push")
        .query({ body: "hoge" })
        .reply(200, {
          key: { id: 1},
          properties: { body: "hoge" }
        });

    let store = getStore(
      null,
      [
        { type: "add_todo" },
        { type: "add_todo_complete", todos: [ { id: 1, body: "hoge" } ] }
      ],
      done
    );
    store.dispatch(actions.addTodo("hoge"));

    expect(
      () => store.dispatch(actions.addTodo())
    ).to.throw("invalid parameter: text is empty");
  });

  it("addTodo: if ServiceDB.addTodo error", (done) => {
    nock("https://kinjouj-test.appspot.com")
        .post("/_ah/api/todo/v1/push")
        .query({ body: "hoge" })
        .reply(500);

    let store = getStore(
      null,
      [
        { type: "add_todo" },
        { type: "add_todo_complete", todos: [] }
      ],
      done
    );
    store.dispatch(actions.addTodo("hoge"));
  });

  it("fetchData", (done) => {
    nock("https://kinjouj-test.appspot.com")
        .get("/_ah/api/todo/v1/fetch")
        .reply(200, {
          items: [
            {
              key: { id: 1 },
              properties: { body: "hoge" }
            }
          ]
        });

    let store = getStore(
      null,
      [
        { type: "fetch" },
        { type: "recv", todos: [ { id: 1, body: "hoge" } ] }
      ],
      done
    );
    store.dispatch(actions.fetchData());
  });

  it("fetchData: if response error", (done) => {
    nock("https://kinjouj-test.appspot.com")
        .get("/_ah/api/todo/v1/fetch")
        .reply(500);

    let store = getStore(
      null,
      [
        { type: "fetch" },
        { type: "recv", todos: [] }
      ],
      done
    );
    store.dispatch(actions.fetchData());
  });
});
