import bookTypes from "./books.types"

export const fetchBooks = (filters = {}) => ({
  type: bookTypes.FETCH_BOOKS,
  payload: filters
})

export const setBooks = (books:any) => ({
  type: bookTypes.SET_BOOKS,
  payload: books,
});