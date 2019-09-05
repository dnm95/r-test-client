import { all, fork } from "redux-saga/effects";
import categories from "./categories";
import user from "./user";


export default function* mainSagas() {
  yield all([
    fork(categories),
    fork(user),
  ]);
}
