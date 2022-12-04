import bookTypes, { Books, Book } from "./books.types"

export const fetchBooks = (filters = {}) => ({
  type: bookTypes.FETCH_BOOKS,
  payload: filters
})

export const setBooks = (books:Books) => ({
  type: bookTypes.SET_BOOKS,
  payload: books,
});

export const fetchBook = (documentID:string | undefined) => ({
  type: bookTypes.FETCH_BOOK,
  payload: documentID
})

export const setBook = (book:Book) => ({
  type: bookTypes.SET_BOOK,
  payload: book,
});