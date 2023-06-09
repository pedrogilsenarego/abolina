import { CurrentUser, userTypes } from "./user.types";
import {FORM} from "../../modules/Login/Register"

export const signInSuccess = (user:any) => ({
  type: userTypes.SIGN_IN_SUCCESS,
  payload: user,
});

export const googleSignInStart = () => ({
  type: userTypes.GOOGLE_SIGN_IN_START,
});

export const facebookSignInStart = () => ({
  type: userTypes.FACEBOOK_SIGN_IN_START,
});

export const signOutUserStart = () => ({
  type: userTypes.SIGN_OUT_USER_START,
});

export const signOutUserSuccess = () => ({
  type: userTypes.SIGN_OUT_USER_SUCCESS,
});

export const checkUserSession = () => ({
  type: userTypes.CHECK_USER_SESSION,
});

export const signUpUserStart = (userCredentials:FORM) => ({
  type: userTypes.SIGN_UP_USER_START,
  payload: userCredentials,
});

export const emailSignInStart = (userCredentials: {email:string, password:string}) => ({
  type: userTypes.EMAIL_SIGN_IN_START,
  payload: userCredentials,
});

export const recoverPassword = (email:string) => ({
  type: userTypes.RECOVER_PASSWORD,
  payload: email,
});

export const mutateUserSettings = (payload:{userFields:Partial<CurrentUser>, id:string}) => ({
  type: userTypes.MUTATE_USER_SETTINGS,
  payload:payload
})

export const setUserSettings = (payload:{userFields:Partial<CurrentUser>}) => ({
  type: userTypes.SET_PREFERENCES,
  payload:payload
})