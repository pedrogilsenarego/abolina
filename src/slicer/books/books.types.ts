const bookTypes = {
  FETCH_BOOKS: "FETCH_BOOKS",
  SET_BOOKS: "SET_BOOKS",
  FETCH_BOOK: "FETCH_BOOK",
  SET_BOOK: "SET_BOOK",
  ADD_BOOK: "ADD_BOOK",
  EDIT_BOOK: "EDIT_BOOK",
  //
  UPDATE_NEW_BOOK_STATUS: "UPDATE_NEW_BOOK_STATUS",
  //
  FETCH_CARROUSSELL: "FETCH_CARROUSSELL",
  SET_CARROUSSELL: "SET_CARROUSSELL",
  UPDATE_CARROUSELL: "UPDATE_CARROUSSELL",
  UPDATE_CARROUSELL_LINK: "UPDATE_CARROUSELL_LINK",
  ADD_NEW_IMAGE_CARROUSSELL: "ADD_NEW_IMAGE_CARROUSSELL",
  DELETE_BOOK: "DELETE_BOOK",
  UPDATE_PROGRESS: "UPDATE_PROGRESS",
  //collections
  ADD_COLLECTION: "ADD_COLLECTION",
  FETCH_COLLECTIONS:"FETCH_COLLECTIONS",
  FETCH_COLLECTION:"FETCH_COLLECTION",
  SET_COLLECTION:"SET_COLLECTION",
  SET_COLLECTIONS:"SET_COLLECTIONS",
  DELETE_COLLECTION:"DELETE_COLLECTION",
  EDIT_COLLECTION:"EDIT_COLLECTION",
  //
  FETCH_BOOK_THEN_FETCH_COLLECTION:"FETCH_BOOK_THEN_FETCH_COLLECTION"
};

export interface Books {
  books: {
    data: Book[];
  };
  book: Book;
  carroussell: Carousel[];
  collection: Collection;
  
  collections: { data: Collection[] };
  progress: number;
}

export interface Carousel {
  image: string;
  link: string;
}

export interface Book {
  documentID: string;
  coverPage: string;
  title: string;
  titleEN: string;
  price: number;
  digitalPrice:number;
  weight: string;
  designer: string;
  number: string;
  collections: string;
  caracteristics: string[];
  
  designerResume: string;
  designerResumeEN: string;
  translator: string;
  translatorResume: string;
  translatorResumeEN: string;
  author: string;
  authorResume: string;
  authorResumeEN: string;
  resume: string;
  resumeEN: string;
  language: string;
  size: string;
  pages: number;
  content: string[];
  newBook?: string;
  createdDate?: Date;
  discount?: number;
  discountDigital?:number
  peekDigital?:string
}

export interface Collection {
  title: string;
  titleEN: string;
  resume: string;
  resumeEN: string;
  caracteristicis: string[];
  documentID:string
}

export default bookTypes;
