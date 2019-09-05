import { all, fork } from "redux-saga/effects";
import categories from "./categories";


export default function* mainSagas() {
  yield all([
    fork(categories)
  ]);
}
