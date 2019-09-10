import { fromJS } from "immutable";

const initialState = fromJS({
  csrfToken: null,
  accessToken: null,
});

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
  case "INJECT_FROM_SERVER": {
    const { accessToken, csrfToken } = payload;
    return state
      .set("accessToken", accessToken)
      .set("csrfToken", csrfToken);
  }

  default: return state;
  }
};
