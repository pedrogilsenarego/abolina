const bookTypes = {
  FETCH_BOOKS: "FETCH_BOOKS",
  SET_BOOKS: "SET_BOOKS",
  FETCH_BOOK: "FETCH_BOOK",
  SET_BOOK:"SET_BOOK",
  ADD_BOOK: "ADD_BOOK"
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
  designerResume: string
  translator: string
  translatorResume: string
  author: string
  authorResume: string
  resume: string
  language: string
  size: string
  pages:number
  content: string[]
}

export default bookTypes