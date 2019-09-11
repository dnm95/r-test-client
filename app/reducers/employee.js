import { fromJS } from "immutable";
import actions from "actions/employee";

const initialState = fromJS({
  loading: false,
  data: {
    id: null,
    name: "",
    first_name: "",
    last_name: "",
    rfc: "",
    email: "",
    attendance: [],
  },
});

export default (state = initialState, action) => {
  switch (action.type) {
  case actions.REQUEST_EMPLOYEE_DATA:
  case actions.CREATE_EMPLOYEE_ATTENDANCE: {
    return state
      .set("loading", true);
  }

  case actions.REQUEST_EMPLOYEE_DATA_SUCCESS: {
    return state
      .set("data", fromJS(action.payload.employee))
      .set("loading", false);
  }

  case actions.REQUEST_EMPLOYEE_DATA_FAILED:
  case actions.CREATE_EMPLOYEE_ATTENDANCE_FAILED: {
    return state
      .set("loading", false);
  }

  default: return state;
  }
};
