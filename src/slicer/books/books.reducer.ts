import bookTypes from "./books.types";

const INITIAL_STATE = {
  books: [],
  book: {},
  
  collections:[],
  collection:{},
  carroussell: [],
  progress:0
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
        case bookTypes.UPDATE_PROGRESS:
          return {
            ...state,
            progress: action.payload,
          };
          case bookTypes.SET_COLLECTIONS:
            return {
              ...state,
              collections: action.payload,
            };
            case bookTypes.SET_COLLECTION:
              return {
                ...state,
                collection: action.payload,
              };

    default:
      return state;
  }
};

export default booksReducer;
