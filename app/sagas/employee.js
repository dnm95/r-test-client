import {
  takeEvery, put, call, select,
} from "redux-saga/effects";
import moment from "moment";
import actions from "actions";
import api from "Api";

import { employeeSelector } from "selectors/employee";

function* fetchEmployee(id) {
  try {
    api.resource = `/attendance/${id}`;
    const employee = yield call(api.get);
    yield put({
      type: actions.employee.REQUEST_EMPLOYEE_DATA_SUCCESS,
      payload: {
        employee,
      },
    });
  } catch(error) {
    yield put({ type: actions.employee.REQUEST_EMPLOYEE_DATA_FAILED });
    console.log(error);
  }
}

export function* getEmployee(action) {
  const { id } = action.query;
  yield call(fetchEmployee, id);
}

export function* createAttendace(action) {
  const { data } = yield select(employeeSelector);
  const { type, dateTime } = action.payload;
  const day = moment(dateTime).format("YYYY-MM-DD");
  const hour = moment(dateTime, "HH:mm:ss").format("HH:mm:ss");

  try {
    api.resource = "/attendance";
    const response = yield call(api.post, {
      body: { day, hour, type, employee: data.id }
    });
    if (response.employee_id) {
      yield put({ type: actions.employee.CREATE_EMPLOYEE_ATTENDANCE_SUCCESS });
      yield put({ type: actions.modal.HIDE_MODAL });
      yield call(fetchEmployee, response.employee_id);
    }
  } catch(error) {
    yield put({ type: actions.employee.CREATE_EMPLOYEE_ATTENDANCE_FAILED });
    console.log(error);
  }
  console.log(day, hour);
}

export default function* sagas() {
  yield takeEvery(actions.employee.REQUEST_EMPLOYEE_DATA, getEmployee);
  yield takeEvery(actions.employee.CREATE_EMPLOYEE_ATTENDANCE, createAttendace);
}
