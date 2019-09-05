import { combineReducers } from "redux-immutable";

import user from "./user";
import employee from "./employee";

export default combineReducers({
  user, employee
});
