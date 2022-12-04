import { takeLatest, put, all, call } from "redux-saga/effects";
import { setBooks, setBook } from "./books.actions";
import { handleFetchBooks, handleFetchBook } from "./books.helpers";
import bookTypes from "./books.types";

function* sagaFetchBooks({ payload }) {
  try {
    const books = yield handleFetchBooks(payload);
    yield put(setBooks(books));
  } catch (err) {}
}

export function* onFetchBooks() {
  yield takeLatest(bookTypes.FETCH_BOOKS, sagaFetchBooks);
}

function* sagaFetchBook({ payload }) {
  try {
    const book = yield handleFetchBook(payload);
    yield put(setBook(book));
  } catch (err) {}
}

export function* onFetchBook() {
  yield takeLatest(bookTypes.FETCH_BOOK, sagaFetchBook);
}

//

export default function* bookSagas() {
  yield all([call(onFetchBooks), call(onFetchBook)]);
}
