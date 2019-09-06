import { fromJS } from "immutable";
import actions from "actions/user";

const initialState = fromJS({
  loading: false,
  data: {
    email: "",
    role: "",
  },
  admin: false,
});

export default (state = initialState, action) => {
  switch (action.type) {
  case actions.REQUEST_LOGIN: {
    return state
      .set("loading", true);
  }

  case actions.REQUEST_LOGIN_SUCCESS: {
    return state
      .set("loading", false);
  }

  case actions.REQUEST_LOGIN_FAILED: {
    return state
      .set("loading", false);
  }

  default: return state;
  }
};
