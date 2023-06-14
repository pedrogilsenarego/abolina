export const userTypes = {
  ACCEPT_COOKIE_POLICY: "ACCEPT_COOKIE_POLICY",
  EMAIL_SIGN_IN_START: "EMAIL_SIGN_IN_START",
  SIGN_IN_SUCCESS: "SIGN_IN_SUCCESS",
  CHECK_USER_SESSION: "CHECK_USER_SESSION",
  SIGN_OUT_USER_START: "SIGN_OUT_USER_START",
  SIGN_OUT_USER_SUCCESS: "SIGN_OUT_USER_SUCCESS",
  SIGN_UP_USER_START: "SIGN_UP_USER_START",
  RESET_PASSWORD_START: "RESET_PASSWORD_START",
  RESET_PASSWORD_SUCCESS: "RESET_PASSWORD_SUCCESS",
  GOOGLE_SIGN_IN_START: "GOOGLE_SIGN_IN_START",
  FACEBOOK_SIGN_IN_START: "FACEBOOK_SIGN_IN_START",
  USER_ERROR: "USER_ERROR",
  RESET_USER_STATE: "RESET_USER_STATE",
  FETCH_USERS_START: "FETCH_USERS_START",
  SET_USERS: "SET_USERS",
  SET_PREFERENCES: "SET_PREFERENCES",
  RECOVER_PASSWORD:"RECOVER_PASSWORD",
  MUTATE_USER_SETTINGS:"MUTATE_USER_SETTINGS"
  
}

export interface User {
  currentUser:CurrentUser
}

export interface InvoiceSettings {
  name:string
  surname:string
  country:string
  address:string
  city:string;
  postalCode:string
  taxId:string
}

export interface Coupons {
bookId:string;
couponId:string[]
title:string
}

export interface CurrentUser {
  id:string;
  email:string
  userRoles:string[]
  displayName:string
  invoiceSettings:InvoiceSettings
  booksOwned:string[]
  coupons:Coupons[]
}