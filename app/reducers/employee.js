import { fromJS } from "immutable";
import actions from "actions/employee";

const initialState = fromJS({
  loading: false,
  active: {
    id: null,
    name: "",
    first_name: "",
    last_name: "",
    rfc: "",
    email: "",
    attendance: [],
  },
  employees: [],
});

export default (state = initialState, action) => {
  switch (action.type) {
  case actions.REQUEST_EMPLOYEE_DATA:
  case actions.REQUEST_EMPLOYEES_DATA:
  case actions.REQUEST_EMPLOYEE_UPDATE:
  case actions.CREATE_EMPLOYEE_ATTENDANCE: {
    return state
      .set("loading", true);
  }

  case actions.REQUEST_EMPLOYEE_DATA_SUCCESS: {
    return state
      .set("active", fromJS(action.payload.employee))
      .set("loading", false);
  }

  case actions.REQUEST_EMPLOYEES_DATA_SUCCESS: {
    return state
      .set("employees", fromJS(action.payload.employees))
      .set("active", initialState.get("active"))
      .set("loading", false);
  }

  case actions.REQUEST_EMPLOYEE_UPDATE_SUCCESS: {
    return state
      .set("loading", false);
  }

  case actions.REQUEST_EMPLOYEE_DATA_FAILED:
  case actions.REQUEST_EMPLOYEES_DATA_FAILED:
  case actions.REQUEST_EMPLOYEE_UPDATE_FAILED:
  case actions.CREATE_EMPLOYEE_ATTENDANCE_FAILED: {
    return state
      .set("loading", false);
  }

  default: return state;
  }
};
