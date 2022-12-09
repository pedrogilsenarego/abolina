import { takeLatest, put, all, call } from "redux-saga/effects";
import { setBooks, setBook, setCarroussell } from "./books.actions";
import {
  handleFetchBooks,
  handleFetchBook,
  handleAddBook,
  handleAddCoverPage,
  handleFetchCarroussell,
  handleUpdateCarroussell,
  handleAddCarroussellImage,
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
    yield put(setBooks({ ...books }));
  } catch (err) {}
}

export function* onFetchBooks() {
  yield takeLatest(bookTypes.FETCH_BOOKS, sagaFetchBooks);
}

function* sagaFetchBook({ payload }) {
  try {
    const book = yield handleFetchBook(payload);
    yield put(setBook({ ...book }));
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

function* sagaFetchCarroussell() {
  try {
    const content = yield handleFetchCarroussell();
    yield put(setCarroussell(content));
  } catch (err) {}
}

export function* onFetchCarroussell() {
  yield takeLatest(bookTypes.FETCH_CARROUSSELL, sagaFetchCarroussell);
}

function* sagaUpdateCarroussell({ payload }) {
  try {
    yield handleUpdateCarroussell(payload);
    yield put(setCarroussell(payload));
    yield put(
      updateSuccessNotification(
        i18n.t("notifications.success.updateCarroussell")
      )
    );
  } catch (err) {
    yield put(
      updateFailNotification(i18n.t("notifications.fail.updateCarroussell"))
    );
  }
}

export function* onUpdateCarroussell() {
  yield takeLatest(bookTypes.UPDATE_CARROUSELL, sagaUpdateCarroussell);
}

function* sagaNewImageCarroussell({ payload }) {
  try {
    const { newImage, list } = payload;
    const url = yield handleAddCarroussellImage(newImage);
    const newArray = list[0].data.concat(url);
    yield handleUpdateCarroussell(newArray);
    yield put(setCarroussell({ content: newArray }));
    // yield put(
    //   updateSuccessNotification(i18n.t("notifications.success.newBook"))
    // );
  } catch (err) {
    // yield put(updateFailNotification(i18n.t("notifications.fail.newBook")));
  }
}

export function* onNewImageCarroussell() {
  yield takeLatest(
    bookTypes.ADD_NEW_IMAGE_CARROUSSELL,
    sagaNewImageCarroussell
  );
}

//

export default function* bookSagas() {
  yield all([
    call(onFetchBooks),
    call(onFetchBook),
    call(onAddBook),
    call(onFetchCarroussell),
    call(onUpdateCarroussell),
    call(onNewImageCarroussell),
  ]);
}
