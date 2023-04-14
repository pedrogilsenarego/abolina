import { Books } from "./books/books.types"
import { CartState } from "./cart/cart.types"
import { GeneralState } from "./general/general.types"
import { User } from "./user/user.types"

export interface State {
  general: GeneralState
  books: Books
  user:User
  cart:CartState
}