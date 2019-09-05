import { fromJS } from "immutable";
import actions from "./actions";

const initialState = fromJS({
  clicks: 0
});

export default (state = initialState, action) => {
  switch (action.type) {
  case actions.ADD_CLICK: {
    return state.set("clicks", state.get("clicks") + 1);
  }

  default: return state;
  }
};
