import { all, call } from "redux-saga/effects";
import bookSagas from "./books/books.sagas";
import userSagas from "./user/user.sagas";
import generalSagas from "./general/general.sagas";

export default function* rootSaga() {
  yield all([call(bookSagas), call(userSagas), call(generalSagas)]);
}
