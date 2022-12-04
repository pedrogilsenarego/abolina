import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; 
import generalReducer from "./general/general.reducer";
import booksReducer from "./books/books.reducer"

export const rootReducer = combineReducers({
  general: generalReducer,
  books: booksReducer
});

const configStorage = {
  key: "root",
  storage,
};

export default persistReducer(configStorage, rootReducer);