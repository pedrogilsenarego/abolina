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

export const addBook = (book:any) => ({
  type: bookTypes.ADD_BOOK,
  payload: book,
});

export const editBook = (payload:any) => ({
  type: bookTypes.EDIT_BOOK,
  payload: payload,
});

//
export const updateNewBookStatus = (payload:{value:string, documentID:number | string}) => ({
  type: bookTypes.UPDATE_NEW_BOOK_STATUS,
  payload
});
//

export const fetchCarroussell = () => ({
  type: bookTypes.FETCH_CARROUSSELL,
  
})

export const setCarroussell = (content:string[]) => ({
  type: bookTypes.SET_CARROUSSELL,
  payload: content,
});

export const updateCarroussell = (list:string[]) => ({
  type: bookTypes.UPDATE_CARROUSELL,
  payload: list,
})

export const addNewCarroussell = (newImage:any) => ({
  type: bookTypes.ADD_NEW_IMAGE_CARROUSSELL,
  payload:newImage
})

export interface DeleteProps {
  documentID:string
  title:string
  }
  
  export const deleteBook = (payload:DeleteProps) => ({
    type: bookTypes.DELETE_BOOK,
    payload: payload,
  });

  export const updateProgress = (payload:number) => ({
    type: bookTypes.UPDATE_PROGRESS,
    payload: payload,
  });

  