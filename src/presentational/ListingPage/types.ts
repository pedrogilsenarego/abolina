import React from 'react'
import { Props as TableProps } from '../../components/TableList/types'
import { ROLES, PERMISSIONS } from '../../constants/permissions'

export interface Field {
  code: string
  value: string
}

export interface DateProps {
  value: Date | null
  handleChange: (event: any) => void
  inputLabel: string
}
export interface AuditInfoProps {
  showAuditInfo?: boolean
  handleAuditInfoClose: () => void
  auditInfoTitle: string
  auditLoading: boolean
  auditTableProps: TableProps<any>
}

export interface filterProps {
  showFilterBox?: boolean
  filterBarTitle?: string
  filterOptions?: any
  filterBarLabel?: string
  onChange?: (newFilter: number | string) => void
  filterBarNumRecords?: number
  filterBarStatusQuickFilter?: number | string
  filterBoxBarRole?: ROLES
  filterBoxBarPermissions?: PERMISSIONS[]
  showMultipleFilterBoxBar?: boolean
  multipleFilterBoxBarLabel?: string
  multibleFilterBoxBarOptions?: any
  multibleFilterBoxBarTitle?: string
  multibleFilterBoxBarOnChange?: (newFilter: number | string) => void
  multibleFilterBoxBarNumRecords?: number
  muiltipleFilterBarStatusQuickFilter?: number | string
  muiltipleFilterBoxBarRole?: ROLES
  muiltipleFilterBoxBarPermissions?: PERMISSIONS[]
  clearFilters?: () => void
  hasClearFilter?: boolean
  showFilterBar?: boolean
  showCustomFilterBar?: boolean
  customFilterBar?: React.ReactNode
  refKey?: string
  refValue?: string
  multipleRefKey?: string
  multipleRefValue?: string
}

export interface searchProps {
  showSearchInput?: boolean
  showSearchSelect?: boolean
  searchValue?: string | undefined
  searchPlaceholder?: string
  handleSearchQuery?: (event: any) => void
  showStartEndDte?: boolean
  startDateProps?: DateProps
  endDateProps?: DateProps
  showCustomSearchSelectSide?: boolean
  customSearchSelectSide?: React.ReactNode
  searchInputPlaceHolder?: string
  searchInputValue?: string
  searchInputOnChange?: (event: any) => void
  searchField?: string
  items?: Field[]
  handleChange?: (event: any) => void
  showCustomSearchinputSide?: boolean
  customSearchinputSide?: React.ReactNode
  customSearchinputSideRole?: ROLES
  customSearchinputSidePermissions?: PERMISSIONS[]
}

export interface Props<T>
  extends filterProps,
    TableProps<T>,
    searchProps,
    AuditInfoProps {
  createActionRole?: ROLES
  createActionPermissions?: PERMISSIONS[]
  createActionLabel?: string
  handleCreateAction?: () => void
  showCreateActionBox?: boolean
  multipleActions?: React.ReactNode
  showCustomCreationBox?: boolean
  customCreateActionRole?: ROLES
  customCreateActionPermissions: PERMISSIONS[]
  customCreationBox?: React.ReactNode
}
