import { fromJS } from "immutable";

const initialState = fromJS({
  accessToken: null,
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
  case "INJECT_FROM_SERVER": {
    const { accessToken } = payload;
    return state
      .set("accessToken", accessToken);
  }

  default: return state;
  }
};
