import { Book } from "../books/books.types";

export const cartTypes = {
  ADD_PRODUCT_TO_CART: "ADD_PRODUCT_TO_CART",
  CLEAR_CART:"CLEAR_CART",
  UPDATE_CART:"UPDATE_CART",
  DELETE_PRODUCT:"DELETE_PRODUCT",
  CHANGE_VALUE:"CHANGE_VALUE"
  
};

export interface CartProduct {
  product:Book;
  value:number
}

export interface CartState {
  cartItems: CartProduct[]
}





export default cartTypes;
