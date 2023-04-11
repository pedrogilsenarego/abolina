import { all, call } from "redux-saga/effects";
import bookSagas from "./books/books.sagas";
import userSagas from "./user/user.sagas";

export default function* rootSaga() {
  yield all([call(bookSagas), call(userSagas)]);
}
