import { createSelector } from "reselect";

const makeSelector = (state) => state.get("user").toJS();

const userSelector = createSelector(
  [makeSelector],
  (user) => user
);

export default (state) => ({
  user: userSelector(state)
});

export { userSelector };
