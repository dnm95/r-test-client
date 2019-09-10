import { fromJS } from "immutable";

const initialState = fromJS({
  email: "",
  role: "",
});

export default (state = initialState, action) => {
  switch (action.type) {
  case "INJECT_FROM_SERVER": {
    const user = action.payload.user || initialState;
    return state
      .set("email", user.email)
      .set("role", user.role);
  }

  default: return state;
  }
};
