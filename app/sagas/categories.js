import { all, fork, take } from "redux-saga/effects";
import { END } from "redux-saga";


function* fetchCategories(action) {
  yield console.log("get data from");
  yield console.log(action);
}

function* watchFetchCategories() {
  let action = yield take("SOME_ACTION");
  while (action !== END) {
    yield fork(fetchCategories, action);
    action = yield take("SOME_ACTION");
  }
}

export default function* sagas() {
  yield all([
    fork(watchFetchCategories)
  ]);
}
