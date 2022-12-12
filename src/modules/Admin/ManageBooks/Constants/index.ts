
import { ColumnType } from '../../../../components/TableList/types'
import { i18n } from '../../../../translations/i18n'


export const tableColumns = 
  
  [
  
  {
    id: "description",
    label: "Description",
    type: ColumnType.Text,
    sortable: false,
  },
  {
    id: "show",
    label: "Show",
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