import { takeLatest, put, all, call } from "redux-saga/effects";
import {
  setBooks,
  setBook,
  setCarroussell,
  fetchBooks,
  updateProgress,
  setCollections,
  fetchCollections,
  setCollection,
} from "./books.actions";
import { store } from "../createStore";
import {
  handleFetchBooks,
  handleFetchBook,
  handleAddBook,
  handleAddCoverPage,
  handleFetchCarroussell,
  handleFetchCollection,
  handleUpdateCarroussell,
  handleAddCarroussellImage,
  handleDeleteCarroussellStorage,
  handleUpdateNewBookStatus,
  handleDeleteBook,
  handleDeleteBookStorage,
  handleUpdateCarroussellLink,
  handleEditBook,
  handleAddCollection,
  handleFetchCollections,
  handleDeleteCollection,
  handleEditCollection,
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

function* sagaEditBook({ payload }) {
  const { documentID, title, values } = payload;

  const newTitle = values.title || title;

  try {
    yield put(enableLoading());

    if ("content" in values) {
      // se as fotos tiverem sido mexidas...

      yield handleDeleteBookStorage(payload.title); //delete nas fotos que existem

      const onProgressUpdate = (progress) => {
        console.log(progress);
        store.dispatch(updateProgress(progress));
      };
      const content = values.content;
      const coverPage2 = values.coverPage2;

      const coverPage = yield call(
        handleAddCoverPage,
        newTitle,
        coverPage2,
        onProgressUpdate
      );
      yield put(updateProgress(0));
      const content2 = yield call(
        handleAddCoverPage,
        newTitle,
        content,
        onProgressUpdate
      );
      delete payload.values.coverPage2;

      values.coverPage = coverPage;
      values.content = content2;
    }

    const editPayload = {
      values,
      documentID,
    };
    console.log(editPayload);
    yield handleEditBook(editPayload);

    yield put(updateProgress(0));
    yield put(disableLoading());
    yield put(updateSuccessNotification("The book was edited"));
  } catch {
    yield put(updateFailNotification("Couldn't edit the book this time"));
  }
}

export function* onEditBook() {
  yield takeLatest(bookTypes.EDIT_BOOK, sagaEditBook);
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
    deleteData.pop();
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

function* sagaUpdateCarrouselLink({ payload }) {
  try {
    yield handleUpdateCarroussellLink(payload);

    yield put(updateSuccessNotification("Carousel Link updated"));
  } catch (err) {
    yield put(updateFailNotification("Carousel Link not updated"));
  }
}

export function* onUpdateCarrousellLink() {
  yield takeLatest(bookTypes.UPDATE_CARROUSELL_LINK, sagaUpdateCarrouselLink);
}

function* sagaNewImageCarroussell({ payload }) {
  try {
    const { newImage, list } = payload;
    const url = yield handleAddCarroussellImage(newImage);
    const urlObj = {
      title: "",
      link: "",
      image: url[0],
    };
    const newArray = list[0].data.concat(urlObj);
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

//collections

function* sagaFetchCollections({ payload }) {
  try {
    const collections = yield handleFetchCollections(payload);
    yield put(setCollections({ ...collections }));
  } catch (err) {}
}

export function* onFetchCollections() {
  yield takeLatest(bookTypes.FETCH_COLLECTIONS, sagaFetchCollections);
}

function* sagaAddCollection({ payload }) {
  try {
    yield put(enableLoading());
    const timestamp = new Date();
    yield handleAddCollection({
      ...payload,
      createdDate: timestamp,
    });

    yield put(disableLoading());
    yield put(
      updateSuccessNotification(i18n.t("notifications.success.newBook"))
    );
  } catch (err) {
    yield put(updateFailNotification(i18n.t("notifications.fail.newBook")));
  }
}

export function* onAddCollection() {
  yield takeLatest(bookTypes.ADD_COLLECTION, sagaAddCollection);
}

function* sagaDeleteCollection({ payload }) {
  try {
    yield handleDeleteCollection(payload);

    yield put(fetchCollections());

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

export function* onDeleteCollection() {
  yield takeLatest(bookTypes.DELETE_COLLECTION, sagaDeleteCollection);
}

function* sagaEditCollection({ payload }) {
  const { documentID, values } = payload;
  try {
    yield put(enableLoading());
    const editPayload = {
      values,
      documentID,
    };
    console.log(editPayload);
    yield handleEditCollection(editPayload);

    yield put(disableLoading());
    yield put(updateSuccessNotification("The book was edited"));
  } catch {
    yield put(updateFailNotification("Couldn't edit the book this time"));
  }
}

export function* onEditCollection() {
  yield takeLatest(bookTypes.EDIT_COLLECTION, sagaEditCollection);
}

function* sagaFetchCollection({ payload }) {
  try {
    const collection = yield handleFetchCollection(payload);
    yield put(setCollection({ ...collection, documentID: payload }));
  } catch (err) {}
}

export function* onFetchCollection() {
  yield takeLatest(bookTypes.FETCH_COLLECTION, sagaFetchCollection);
}

//
function* sagaFetchBookThenCollection({ payload }) {
  try {
    const book = yield handleFetchBook(payload);
    yield put(setBook({ ...book, documentID: payload }));
  } catch (err) {}
}

export function* onFetchBookThenCollection() {
  yield takeLatest(bookTypes.FETCH_BOOK, sagaFetchBookThenCollection);
}

export default function* bookSagas() {
  yield all([
    call(onFetchBooks),
    call(onFetchCollections),
    call(onFetchBook),
    call(onFetchCollection),
    call(onAddBook),
    call(onAddCollection),
    call(onEditBook),
    call(onEditCollection),
    call(onUpdateNewBookStatus),
    call(onFetchCarroussell),
    call(onUpdateCarroussell),
    call(onNewImageCarroussell),
    call(onDeleteBook),
    call(onDeleteCollection),
    call(onUpdateCarrousellLink),
    call(onFetchBookThenCollection),
  ]);
}
