import { expect } from "chai";
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
    ).to.be.deep.eq({ isFetching: false, todos: [] });
  });

  it("ACTION_ADD_TODO", () => {
    expect(
      rootReducer(null, { type: ACTION_ADD_TODO })
    ).to.be.deep.eq({ isFetching: true });
  });

  it("ACTION_ADD_TODO_COMPLETE", () => {
    expect(
      rootReducer(
        undefined,
        {
          type: ACTION_ADD_TODO_COMPLETE
        }
      )
    ).to.be.deep.eq({ isFetching: false, todos: [] });

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
    ).to.be.deep.eq({
      isFetching: false,
      todos: [ { id: 1, body: "hoge" } ]
    });
  });

  it("ACTION_FETCH", () => {
    expect(
      rootReducer(undefined, { type: ACTION_FETCH })
    ).to.be.deep.eq({ isFetching: true, todos: [] });
  });

  it("ACTION_RECV", () => {
    expect(
      rootReducer(undefined, { type: ACTION_RECV })
    ).to.be.deep.eq({ isFetching: false, todos: [] });

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
    ).to.be.deep.eq({
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
