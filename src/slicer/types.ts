import { Books } from "./books/books.types"
import { GeneralState } from "./general/general.types"

export interface State {
  general: GeneralState
  books: Books
}