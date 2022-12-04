import { takeLatest, put, all, call } from "redux-saga/effects";
import { setBooks } from "./books.actions";
import { handleFetchBooks } from "./books.helpers";
import bookTypes from "./books.types";

function* sagaFetchBooks() {
  try {
    const books = yield handleFetchBooks();
    yield put(setBooks(books));
  } catch (err) {}
}

export function* onFetchBooks() {
  yield takeLatest(bookTypes.FETCH_BOOKS, sagaFetchBooks);
}

function* setBooksSagas() {
  yield all([call(onFetchBooks)]);
}

export function* onSetBooks() {
  yield takeLatest(bookTypes.SET_BOOKS, setBooksSagas);
}

export default function* bookSagas() {
  yield all([call(onSetBooks), call(onFetchBooks)]);
}
