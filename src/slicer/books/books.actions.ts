import bookTypes from "./books.types"

export const fetchBooks = () => ({
  type: bookTypes.FETCH_BOOKS,
})

export const setBooks = (books:any) => ({
  type: bookTypes.SET_BOOKS,
  payload: books,
});