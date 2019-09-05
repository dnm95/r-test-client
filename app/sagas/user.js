import {
  takeEvery, put, call,
} from "redux-saga/effects";
import actions from "actions";
// import api from "Api";

export function* requestLogin(action) {
  const { email, password } = action.payload;
  try {
    console.log(email, password);
  } catch(error) {
    yield put({ type: actions.user.REQUEST_LOGIN_FAILED });
    console.log(error);
  }
}

export default function* sagas() {
  yield takeEvery(actions.user.REQUEST_LOGIN, requestLogin);
}
