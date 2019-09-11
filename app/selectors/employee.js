import { createSelector } from "reselect";

const makeSelector = (state) => state.get("employee").toJS();

const employeeSelector = createSelector(
  [makeSelector],
  (employee) => employee
);

export default (state) => ({
  employee: employeeSelector(state)
});

export { employeeSelector };
