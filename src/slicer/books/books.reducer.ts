import bookTypes from "./books.types";

const INITIAL_STATE = {
  books: [],
  book: {},
  carroussell: []
};

interface Action {
  type: string;
  payload: any;
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
      case bookTypes.SET_CARROUSSELL:
        return {
          ...state,
          carroussell: action.payload.content,
        };

    default:
      return state;
  }
};

export default booksReducer;
