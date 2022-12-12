const generalTypes = {
  ENABLE_LOADING: "ENABLE_LOADING",
  DISABLE_LOADING: "DISABLE_LOADING",
  UPDATE_SUCCESS_NOTIFICATION: "UPDATE_SUCESS_NOTIFICATION",
  UPDATE_INFORMATION_NOTIFICATION: "UPDATE_INFORMATION_NOTIFICATION",
  CLEAR_NOTIFICATION: "CLEAR_NOTIFICATION",
  UPDATE_FAIL_NOTIFICATION: "UPDATE_FAIL_NOTIFICATION",
  UPDATE_SUCCESS_API_REQUEST: "UPDATE_SUCCESS_API_REQUEST",
  UPDATE_FAIL_API_REQUEST: "UPDATE_FAIL_API_REQUEST",
  CLEAR_API_REQUEST: "CLEAR_API_REQUEST",
  SAVE_LAST_ENDPOINT: "SAVE_LAST_ENDPOINT",
  REMOVE_LAST_ENDPOINT: "REMOVE_LAST_ENDPOINT",
  UPDATE_LANG: "UPDATE_LANG",
  SCROLL_CONTACTS: "SCROLL_CONTACTS",
  PAGINATION_MANAGE_BOOKS: "PAGINATION_MANAGE_BOOKS"
};

export interface GeneralState {
  lang: string,
  scrollToContacts: boolean
  paginationManageBooks: Pagination

}

export interface Pagination {
  page: number
  perPage: number
  sortBy: string
  orderBy: 'asc' | 'desc'
  type: PaginationTypes
  searchQuery?: string
  searchBy?: string | undefined
  quickFilters?: any
  startDate?: Date | string | undefined | null
  endDate?: Date | string | undefined | null
  filters?: any
  loaded?: boolean
}

export enum PaginationTypes {
  PAGINATION_MANAGE_BOOKS= "PAGINATION_MANAGE_BOOKS"
}


export default generalTypes;
