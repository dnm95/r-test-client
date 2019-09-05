import { createSelector } from "reselect";

const makeSelector = state => state.get("test").toJS();

const testSelector = createSelector(
  [makeSelector],
  test => test
);

export default state => ({
  test: testSelector(state)
});
