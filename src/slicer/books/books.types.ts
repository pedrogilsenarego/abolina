const bookTypes = {
  FETCH_BOOKS: "FETCH_BOOKS",
  SET_BOOKS: "SET_BOOKS",
  FETCH_BOOK: "FETCH_BOOK",
  SET_BOOK:"SET_BOOK"
}

export interface Books {
  books: {
    data:Book[]
  }
  book: Book
  
  
}

export interface Book {
  documentID: string
  coverPage:string;
  title:string
  price: number
  weight: string
  designer: string
  translator: string
  author: string
  lang: string
  size: string
  pages:number
  content: string[]
}

export default bookTypes