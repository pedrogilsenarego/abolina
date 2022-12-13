
import { ColumnType } from '../../../../components/TableList/types'
import { i18n } from '../../../../translations/i18n'


export const tableColumns = 
  
  [
  
  {
    id: "title",
    label: "Title",
    type: ColumnType.Text,
    sortable: false,
  },
  {
    id: "newBook",
    label: "New Book",
    type: ColumnType.ActionComponent,
    sortable: false,
  },
  {
    id: 'delete',
    label: 'Remove',
    type: ColumnType.ActionComponent,
    minWidth: 70,
    sortable: false,
  },

]