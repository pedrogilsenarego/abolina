import { takeLatest, put, all, call } from "redux-saga/effects";
import { handleFetchCollections } from "./general.helpers";

import {
  updateSuccessNotification,
  updateFailNotification,
  setCollections,
} from "../general/general.actions";
import { i18n } from "../../translations/i18n";
import generalTypes from "./general.types";

function* sagaFetchCollections() {
  try {
    const collections = yield handleFetchCollections();
    yield put(setCollections(collections));
  } catch (err) {
    yield put(
      updateFailNotification(i18n.t("notifications.fail.updateCarroussell"))
    );
  }
}

export function* onFetchCollections() {
  yield takeLatest(generalTypes.GET_COLLECTIONS, sagaFetchCollections);
}

//

export default function* generalSagas() {
  yield all([call(onFetchCollections)]);
}
