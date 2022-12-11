import { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { updatePaginationManageBooks } from '../../slicer/general/general.actions'

const useListingPage = (
  paginationType: any,
  tablePagination: any
) => {
  const dispatch = useDispatch()

  const handleNumRows = useCallback(
    (newPerPage: number) => {
      dispatch(
        updatePaginationManageBooks({
          page: tablePagination.page,
          perPage: newPerPage,
          sortBy: tablePagination.sortBy,
          orderBy: tablePagination.orderBy,
          type: paginationType,
        })
      )
    },
    [tablePagination]
  )

  const handlePage = useCallback(
    (newPage: number) => {
      dispatch(
        updatePaginationManageBooks({
          page: newPage,
          perPage: tablePagination.perPage,
          sortBy: tablePagination.sortBy,
          orderBy: tablePagination.orderBy,
          type: paginationType,
          
        })
      )
    },
    [tablePagination]
  )

  const handleOrderBy = useCallback(
    (newOrderBy: 'asc' | 'desc', newSortBy: string) => {
      dispatch(
        updatePaginationManageBooks({
          page: tablePagination.page,
          perPage: tablePagination.perPage,
          sortBy: newSortBy,
          orderBy: newOrderBy,
          type: paginationType,
          
        })
      )
    },
    [tablePagination]
  )

  return {
    tablePagination,
    handleNumRows,
    handlePage,
    handleOrderBy,
  }
}

export default useListingPage
