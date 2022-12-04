import bookTypes from "./books.types"

export const fetchBooks = (books:any) => ({
  type: bookTypes.FETCH_BOOKS,
  payload: books
})