import { all, call, takeLatest, put } from "redux-saga/effects";
import { userTypes } from "./user.types";
import { signInSuccess } from "./user.actions";
import { GoogleProvider, auth } from "../../firebase/utils";
import { handleUserProfileSocialLogin } from "./user.helpers";

export function* getSnapshotFromUserAuthSocialLogin(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfileSocialLogin, {
      userAuth: user,
      additionalData,
    });
    const snapshot = yield userRef.get();
    yield put(
      signInSuccess({
        id: snapshot.id,
        ...snapshot.data(),
      })
    );
  } catch (err) {
    console.log(err);
  }
}

export function* googleSignIn() {
  console.log("duh");
  try {
    console.log("teste");
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    console.log("teste2");
    yield getSnapshotFromUserAuthSocialLogin(user);
  } catch (err) {
    console.log(err);
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export default function* userSagas() {
  yield all([call(onGoogleSignInStart)]);
}
