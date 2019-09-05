import { fromJS } from "immutable";
import actions from "actions/modal";

const initialState = fromJS({
  open: false,
  name: "",
  confirm: false,
  props: {}
});

export default (state = initialState, action) => {
  switch (action.type) {
  case actions.OPEN_MODAL: {
    const { name, confirm, props } = action.payload;

    return state
      .set("open", true)
      .set("name", name)
      .set("confirm", confirm || false)
      .set("props", props);
  }

  case actions.HIDE_MODAL: {
    return state.set("open", false);
  }

  default: return state;
  }
};
