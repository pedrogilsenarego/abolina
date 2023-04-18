import { all, call, takeLatest, put } from "redux-saga/effects";
import { userTypes } from "./user.types";
import { signInSuccess, signOutUserSuccess } from "./user.actions";
import { FacebookProvider, GoogleProvider, auth } from "../../firebase/utils";
import { handleUserProfile } from "./user.helpers";
import { getCurrentUser } from "../../firebase/utils";
import {
  updateFailNotification,
  updateSuccessNotification,
} from "../general/general.actions";
import { i18n } from "../../translations/i18n";

export function* getSnapshotFromUserAuth(user, additionalData = {}) {
  try {
    const userRef = yield call(handleUserProfile, {
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
    // console.log(err);
  }
}

export function* googleSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(GoogleProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    console.log(err);
  }
}

export function* onGoogleSignInStart() {
  yield takeLatest(userTypes.GOOGLE_SIGN_IN_START, googleSignIn);
}

export function* facebookSignIn() {
  try {
    const { user } = yield auth.signInWithPopup(FacebookProvider);
    yield getSnapshotFromUserAuth(user);
  } catch (err) {
    console.log(err);
  }
}

export function* onFacebookSignInStart() {
  yield takeLatest(userTypes.FACEBOOK_SIGN_IN_START, facebookSignIn);
}

export function* signOutUser() {
  try {
    yield auth.signOut();
    yield put(signOutUserSuccess());
  } catch (err) {
    // console.log(err);
  }
}

export function* onSignOutUserStart() {
  yield takeLatest(userTypes.SIGN_OUT_USER_START, signOutUser);
}

export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    if (!userAuth) return;

    if (userAuth.emailVerified) {
      // If the user's email is verified, proceed with your app's logic.
      yield getSnapshotFromUserAuth(userAuth);
    } else {
      // If the user's email is not verified, handle it accordingly (e.g., show an alert, log it, or dispatch an action).
      console.log("Email is not verified");
      // You can dispatch an action to update your app state
      // yield put({ type: 'EMAIL_NOT_VERIFIED' });
    }
  } catch (err) {
    console.error(err);
  }
}

export function* onCheckUserSession() {
  yield takeLatest(userTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

export function* signUpUser({ payload: { name, email, password } }) {
  try {
    yield auth.createUserWithEmailAndPassword(email, password);
    //const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield auth.currentUser.sendEmailVerification();
    //const additionalData = { displayName: name };
    // this would login imiddiatle the user
    //yield getSnapshotFromUserAuth(user, additionalData);
    yield put(
      updateSuccessNotification(
        i18n.t("notifications.success.newUserEmailPassword")
      )
    );
  } catch (err) {
    yield put(updateFailNotification(i18n.t("notifications.fail.newUser")));
  }
}

export function* onSignUpUserStart() {
  yield takeLatest(userTypes.SIGN_UP_USER_START, signUpUser);
}

export function* emailSignIn({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);

    if (user.emailVerified) {
      yield getSnapshotFromUserAuth(user);
      yield put(
        updateSuccessNotification(i18n.t("notifications.success.loginUser"))
      );
    } else {
      yield put(
        updateFailNotification(i18n.t("notifications.fail.emailNotVerified"))
      );
    }
  } catch (err) {
    console.log(err);
    if (err) yield put(updateFailNotification(`${err.message}`));
    else
      yield put(
        updateFailNotification(`${i18n.t("notifications.fail.loginUser")}`)
      );
  }
}

export function* onEmailSignInStart() {
  yield takeLatest(userTypes.EMAIL_SIGN_IN_START, emailSignIn);
}

export default function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onFacebookSignInStart),
    call(onSignOutUserStart),
    call(onCheckUserSession),
    call(onSignUpUserStart),
    call(onEmailSignInStart),
  ]);
}
