import bookTypes from "./books.types";

const INITIAL_STATE = {
  books: [],
  book: {},
};

interface Action {
  type: string;
  payload: string;
}

const booksReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case bookTypes.SET_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    case bookTypes.SET_BOOK:
      return {
        ...state,
        book: action.payload,
      };

    default:
      return state;
  }
};

export default booksReducer;
