import { createSelector } from "reselect";

const makeSelector = (state) => state.get("globals").toJS();

const globalsSelector = createSelector(
  [makeSelector],
  (globals) => globals
);

export default (state) => ({
  accessToken: globalsSelector(state).accessToken,
});

export { globalsSelector };
