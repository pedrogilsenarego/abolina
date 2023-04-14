import { all, call, put, takeLatest } from "redux-saga/effects";
import cartTypes from "./cart.types";
import { updateFailNotification } from "../general/general.actions";
import { changeValueProductCart, deleteProductCart } from "./cart.actions";



function* sagaUpdateCart({payload}:any) {
  try {
    if(payload.value<=0)yield put(deleteProductCart(payload.id));
    else yield put(changeValueProductCart(payload.value, payload.id))
  } catch (err) {
    yield put(updateFailNotification("something wen wrong"));
  }
}

export function* onUpdateCart() {
// @ts-ignore
  yield takeLatest(cartTypes.UPDATE_CART, sagaUpdateCart);
}

export default function* cartSagas() {
  yield all([call(onUpdateCart)]);
}
