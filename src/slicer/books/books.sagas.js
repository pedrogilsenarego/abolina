import { takeLatest, put, all, call } from "redux-saga/effects";
import { setBooks, setBook } from "./books.actions";
import {
  handleFetchBooks,
  handleFetchBook,
  handleAddBook,
  handleAddCoverPage,
} from "./books.helpers";
import bookTypes from "./books.types";
import {
  updateSuccessNotification,
  updateFailNotification,
} from "../general/general.actions";
import { i18n } from "../../translations/i18n";

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

function* sagaAddBook({ payload }) {
  try {
    const timestamp = new Date();
    const { title, coverPage2, content } = payload;
    const coverPage = yield handleAddCoverPage(title, coverPage2);
    const content2 = yield handleAddCoverPage(title, content);
    delete payload.coverPage2;
    delete payload.content;

    yield handleAddBook({
      ...payload,
      coverPage,
      content: content2,
      createdDate: timestamp,
    });
    yield put(
      updateSuccessNotification(i18n.t("notifications.success.newBook"))
    );
  } catch (err) {
    yield put(updateFailNotification(i18n.t("notifications.fail.newBook")));
  }
}

export function* onAddBook() {
  yield takeLatest(bookTypes.ADD_BOOK, sagaAddBook);
}

//

export default function* bookSagas() {
  yield all([call(onFetchBooks), call(onFetchBook), call(onAddBook)]);
}
