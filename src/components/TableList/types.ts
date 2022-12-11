export enum ColumnType {
  Text,
  ActionComponent,
  Date,
  Chip,
  CheckBox,
  Image,
  Number,
}

export enum ListType {
  Campaigns,
  Advertisers,
  Default,
}

export interface Mapper<T> {
  key: T
  value: string
}

export interface Column {
  id: string
  label: string
  sortable: boolean
  type: ColumnType
  minWidth?: number
  width?: number
  align?: 'right'
  format?: any
  hoverMapper?: Mapper<any>[]
  colorMapper?: Mapper<any>[]
}

// todo use this interface in all TableListAction and remove the duplicated once
export interface TableListAction {
  // todo create isActive prop and use "disabled" prop to indicate if it is disabled toggle or not
  buttonType: 'toggle' | 'icon' | 'disabledToggle' | 'isDimmed'
  dimColor?: string
  event: string
  label: string
  icon: string
  confirmationRequired?: boolean
  confirmationTitle?: string
  confirmationDescription?: string
  confirmationButtonLabel?: string
  declineButtonLabel?: string
  disabled?: boolean
}

export interface Props<T> {
  title?: string
  columns: Column[]
  rows: T[]
  page: number
  perPage: number
  totalNumRows: number
  selectedOptions?: number[]
  rowsPerPageOptions?: number[]
  orderBy: 'asc' | 'desc'
  sortBy: string
  loading: boolean
  noDataLabel?: string
  enableCheckBox?: boolean
  enableBulkSelect?: boolean
  disablePagination?: boolean
  onCheckBoxChange?: (data: any) => void
  onCheckBoxChangeAll?: (checked: boolean) => void
  onPageChange: (page: number) => void
  onNumRowsChange: (numRows: number) => void
  onOrderChange: (order: 'asc' | 'desc', orderBy: string) => void
  onAction?: (type: string, id: number) => void
  clearFilters?: () => void
  hasClearFilter?: boolean
  feedBackMessageDescription?: string
}
