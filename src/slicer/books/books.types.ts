const bookTypes = {
  FETCH_BOOKS: "FETCH_BOOKS",
  SET_BOOKS: "SET_BOOKS",
  FETCH_BOOK: "FETCH_BOOK",
  SET_BOOK:"SET_BOOK",
  ADD_BOOK: "ADD_BOOK",
  EDIT_BOOK:"EDIT_BOOK",
  //
  UPDATE_NEW_BOOK_STATUS: "UPDATE_NEW_BOOK_STATUS",
  //
  FETCH_CARROUSSELL: "FETCH_CARROUSSELL",
  SET_CARROUSSELL: "SET_CARROUSSELL",
  UPDATE_CARROUSELL: "UPDATE_CARROUSSELL",
  ADD_NEW_IMAGE_CARROUSSELL: "ADD_NEW_IMAGE_CARROUSSELL",
  DELETE_BOOK:"DELETE_BOOK",
  UPDATE_PROGRESS:"UPDATE_PROGRESS"
}

export interface Books {
  books: {
    data:Book[]
  }
  book: Book
  carroussell: string[]
  progress:number
}

export interface Book {
  documentID: string
  coverPage:string;
  title:string
  titleEN:string
  price: number
  weight: string
  designer: string
  designerResume: string
  designerResumeEN:string
  translator: string
  translatorResume: string
  translatorResumeEN:string
  author: string
  authorResume: string
  authorResumeEN:string
  resume: string
  resumeEN:string
  language: string
  size: string
  pages:number
  content: string[]
  newBook?: string
  createdDate?: Date;
}

export default bookTypes