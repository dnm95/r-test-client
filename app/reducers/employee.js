import { fromJS } from "immutable";
import actions from "actions/user";

const initialState = fromJS({
  loading: false,
  data: {
    id: null,
    name: "",
    firstName: "",
    lastName: "",
    rfc: "",
    email: "",
    attendance: [],
  },
});

export default (state = initialState, action) => {
  switch (action.type) {
  case actions.REQUEST_EMPLOYEE_DATA: {
    return state
      .set("loading", true);
  }

  case actions.REQUEST_EMPLOYEE_DATA_SUCCESS: {
    return state
      .set("loading", false);
  }

  case actions.REQUEST_EMPLOYEE_DATA_FAILED: {
    return state
      .set("loading", false);
  }

  default: return state;
  }
};
