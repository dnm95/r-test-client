import {
  takeEvery, put, call, select,
} from "redux-saga/effects";
import moment from "moment";
import actions from "actions";
import { Router } from "routes";
import api from "Api";

import { employeeSelector } from "selectors/employee";
import { userSelector } from "selectors/user";

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
  } catch (error) {
    yield put({ type: actions.employee.REQUEST_EMPLOYEE_DATA_FAILED });
    console.log(error);
  }
}

export function* getEmployee(action) {
  const userStateId = yield select(userSelector);
  const id = action.payload.id || userStateId.id;
  yield call(fetchEmployee, id);
}

export function* getEmployees(action) {
  const { attendances, today } = action.payload;
  try {
    api.resource = attendances ? `/attendances${today ? "?today=true" : ""}` : "/employees";
    const employees = yield call(api.get);
    yield put({
      type: actions.employee.REQUEST_EMPLOYEES_DATA_SUCCESS,
      payload: {
        employees,
      },
    });
  } catch (error) {
    yield put({ type: actions.employee.REQUEST_EMPLOYEES_DATA_FAILED });
    console.log(error);
  }
}

export function* createUpdateEmployee(action) {
  const { active } = yield select(employeeSelector);
  const { data } = action.payload;

  try {
    api.resource = `/employee${active.id ? `/${active.id}` : ""}`;
    const body = { ...data };
    const response = active.id ? yield call(api.put, { body }) : yield call(api.post, { body });
    if (response.email) {
      yield put({ type: actions.employee.REQUEST_EMPLOYEE_UPDATE_SUCCESS });
      yield put({ type: actions.modal.HIDE_MODAL });
      if (active.id) {
        yield call(fetchEmployee, active.id);
      } else {
        yield call(getEmployees, {
          payload: { attendances: false, date: false },
        });
      }
    }
  } catch (error) {
    yield put({ type: actions.employee.REQUEST_EMPLOYEE_UPDATE_FAILED });
    console.log(error);
  }
}

export function* createAttendace(action) {
  const { active } = yield select(employeeSelector);
  const { type, dateTime } = action.payload;
  const day = moment(dateTime).format("YYYY-MM-DD");
  const hour = moment(dateTime, "HH:mm:ss").format("HH:mm:ss");

  try {
    api.resource = "/attendance";
    const response = yield call(api.post, {
      body: {
        day, hour, type, employee: active.id
      }
    });
    if (response.employee_id) {
      yield put({ type: actions.employee.CREATE_EMPLOYEE_ATTENDANCE_SUCCESS });
      yield put({ type: actions.modal.HIDE_MODAL });
      yield call(fetchEmployee, response.employee_id);
    }
  } catch (error) {
    yield put({ type: actions.employee.CREATE_EMPLOYEE_ATTENDANCE_FAILED });
    console.log(error);
  }
}

export function* searchAttendances(action) {
  try {
    api.resource = `/attendances/search?query=${action.payload.query}`;
    const employees = yield call(api.get);
    yield put({
      type: actions.employee.REQUEST_EMPLOYEES_DATA_SUCCESS,
      payload: {
        employees,
      },
    });
  } catch (error) {
    yield put({ type: actions.employee.REQUEST_EMPLOYEES_DATA_FAILED });
    console.log(error);
  }
}

export function* deleteEmployee(action) {
  const { id } = action.payload;
  try {
    api.resource = `/employee/${id}`;
    const response = yield call(api.delete, {});
    if (response.email) {
      yield put({ type: actions.employee.REQUEST_DELETE_EMPLOYEE_SUCCESS });
      Router.pushRoute("secure.dashboard");
    }
  } catch (error) {
    yield put({ type: actions.employee.REQUEST_DELETE_EMPLOYEE_FAILED });
    console.log(error);
  }
}

export default function* sagas() {
  yield takeEvery(actions.employee.REQUEST_EMPLOYEE_DATA, getEmployee);
  yield takeEvery(actions.employee.REQUEST_EMPLOYEES_DATA, getEmployees);
  yield takeEvery(actions.employee.REQUEST_EMPLOYEE_UPDATE, createUpdateEmployee);
  yield takeEvery(actions.employee.CREATE_EMPLOYEE_ATTENDANCE, createAttendace);
  yield takeEvery(actions.employee.REQUEST_DELETE_EMPLOYEE, deleteEmployee);
  yield takeEvery(actions.employee.SEARCH_EMPLOYEES_ATTENDANCES, searchAttendances);
}
