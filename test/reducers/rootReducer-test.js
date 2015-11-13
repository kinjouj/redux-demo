import expect from "expect";
import rootReducer from "../../src/reducers";
import {
  ACTION_ADD_TODO,
  ACTION_ADD_TODO_COMPLETE,
  ACTION_FETCH,
  ACTION_RECV
} from "../../src/constants";

describe("rootReducer", () => {

  it("default", () => {
    expect(
      rootReducer(undefined, {})
    ).toEqual({ isFetching: false, todos: [] });
  });

  it("ACTION_ADD_TODO", () => {
    expect(
      rootReducer(null, { type: ACTION_ADD_TODO })
    ).toEqual({ isFetching: true });
  });

  it("ACTION_ADD_TODO_COMPLETE", () => {
    expect(
      rootReducer(
        undefined,
        {
          type: ACTION_ADD_TODO_COMPLETE
        }
      )
    ).toEqual({ isFetching: false, todos: [] });

    expect(
      rootReducer(
        undefined,
        {
          type: ACTION_ADD_TODO_COMPLETE,
          todos: [
            {
              id: 1,
              body: "hoge"
            }
          ]
        }
      )
    ).toEqual({
      isFetching: false,
      todos: [ { id: 1, body: "hoge" } ]
    });
  });

  it("ACTION_FETCH", () => {
    expect(
      rootReducer(undefined, { type: ACTION_FETCH })
    ).toEqual({ isFetching: true, todos: [] });
  });

  it("ACTION_RECV", () => {
    expect(
      rootReducer(undefined, { type: ACTION_RECV })
    ).toEqual({ isFetching: false, todos: [] });

    expect(
      rootReducer(
        undefined,
        {
          type: ACTION_RECV,
          todos: [
            {
              id: 1,
              body: "hoge"
            }
          ]
        }
      )
    ).toEqual({
      isFetching: false,
      todos: [
        {
          id: 1,
          body: "hoge"
        }
      ]
    });
  });
});
