import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import generalReducer from "./general/general.reducer";
import booksReducer from "./books/books.reducer"
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

export const rootReducer = combineReducers({
  general: generalReducer,
  books: booksReducer,
  user:userReducer,
  cart:cartReducer
  
});

const configStorage = {
  key: "root",
  storage,
};

export default persistReducer(configStorage, rootReducer);