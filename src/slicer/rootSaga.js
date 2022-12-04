import { all, call } from "redux-saga/effects";
import bookSagas from "./books/books.sagas";

export default function* rootSaga() {
  yield all([call(bookSagas)]);
}
