import { combineReducers } from "redux-immutable";

import user from "./user";
import employee from "./employee";
import globals from "./globals";
import modal from "./modal";

export default combineReducers({
  user, employee, globals, modal,
});
