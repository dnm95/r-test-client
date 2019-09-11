import { all, fork } from "redux-saga/effects";
import employee from "./employee";


export default function* mainSagas() {
  yield all([
    fork(employee),
  ]);
}
