import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  setBooks,
  setBook,
  setCarroussell,
  fetchBooks,
  updateProgress,
} from "./books.actions";
import { store } from "../createStore";
import {
  handleFetchBooks,
  handleFetchBook,
  handleAddBook,
  handleAddCoverPage,
  handleFetchCarroussell,
  handleUpdateCarroussell,
  handleAddCarroussellImage,
  handleDeleteCarroussellStorage,
  handleUpdateNewBookStatus,
  handleDeleteBook,
  handleDeleteBookStorage,
} from "./books.helpers";
import bookTypes from "./books.types";
import {
  updateSuccessNotification,
  updateFailNotification,
  enableLoading,
  disableLoading,
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
    yield put(setBook({ ...book, documentID: payload }));
  } catch (err) {}
}

export function* onFetchBook() {
  yield takeLatest(bookTypes.FETCH_BOOK, sagaFetchBook);
}

function* sagaAddBook({ payload }) {
  try {
    yield put(enableLoading());
    const timestamp = new Date();
    const { title, coverPage2, content } = payload;

    const onProgressUpdate = (progress) => {
      console.log(progress);
      store.dispatch(updateProgress(progress));
    };

    const coverPage = yield call(
      handleAddCoverPage,
      title,
      coverPage2,
      onProgressUpdate
    );
    yield put(updateProgress(0));
    const content2 = yield call(
      handleAddCoverPage,
      title,
      content,
      onProgressUpdate
    );
    delete payload.coverPage2;
    delete payload.content;

    yield handleAddBook({
      ...payload,
      coverPage,
      newBook: "undefined",
      content: content2,
      createdDate: timestamp,
    });
    yield put(updateProgress(0));
    yield put(disableLoading());
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
function* sagaUpdateNewBookStatus({ payload }) {
  try {
    yield handleUpdateNewBookStatus(payload);
    yield put(fetchBooks());
    yield put(
      updateSuccessNotification(
        i18n.t("notifications.success.newBookStatusChanged")
      )
    );
  } catch (err) {
    yield put(
      updateFailNotification(i18n.t("notifications.fail.newBookStatusChanged"))
    );
  }
}

export function* onUpdateNewBookStatus() {
  yield takeLatest(bookTypes.UPDATE_NEW_BOOK_STATUS, sagaUpdateNewBookStatus);
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
    const freshData = payload[0].data; // imagens que ficam no carrousel
    yield handleUpdateCarroussell(freshData);
    yield put(setCarroussell({ content: freshData }));
    const deleteData = payload[1].data;
    yield handleDeleteCarroussellStorage(deleteData);
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
    yield put(
      updateSuccessNotification(
        i18n.t("notifications.success.newCarrousselImage")
      )
    );
  } catch (err) {
    yield put(
      updateFailNotification(i18n.t("notifications.fail.newCarrousselImage"))
    );
  }
}

export function* onNewImageCarroussell() {
  yield takeLatest(
    bookTypes.ADD_NEW_IMAGE_CARROUSSELL,
    sagaNewImageCarroussell
  );
}

function* sagaDeleteBook({ payload }) {
  try {
    yield handleDeleteBook(payload.documentID);
    yield handleDeleteBookStorage(payload.title);
    yield put(fetchBooks());

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

export function* onDeleteBook() {
  yield takeLatest(bookTypes.DELETE_BOOK, sagaDeleteBook);
}

//

export default function* bookSagas() {
  yield all([
    call(onFetchBooks),
    call(onFetchBook),
    call(onAddBook),
    call(onUpdateNewBookStatus),
    call(onFetchCarroussell),
    call(onUpdateCarroussell),
    call(onNewImageCarroussell),
    call(onDeleteBook),
  ]);
}
