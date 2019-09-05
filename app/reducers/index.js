import { combineReducers } from "redux-immutable";

import user from "./user";
import employee from "./employee";
import modal from "./modal";

export default combineReducers({
  user, employee, modal,
});
