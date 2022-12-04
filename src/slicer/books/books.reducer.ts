import bookTypes from "./books.types";


const INITIAL_STATE = {
  books: []
};

interface Action {
  type: string;
  payload: string;
}

const generalReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case bookTypes.FETCH_BOOKS:
      return {
        ...state,
        books: action.payload,
      };
    
    default:
      return state;
  }
};

export default generalReducer;
