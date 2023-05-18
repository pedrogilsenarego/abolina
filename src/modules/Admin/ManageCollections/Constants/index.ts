
import { ColumnType } from '../../../../components/TableList/types'
import { i18n } from '../../../../translations/i18n'


export const tableColumns = 
  
  [
  
  {
    id: "title",
    label: i18n.t(
      "modules.admin.manageBooks.tableList.title"
    ),
    type: ColumnType.Text,
    sortable: false,
  },
 
  {
    id: "createdDate",
    label: i18n.t(
      "modules.admin.manageBooks.tableList.createdDate"
    ),
    type: ColumnType.Date,
    sortable: false,
  },
 

  {
    id: 'actions',
    label: 'Actions',
    type: ColumnType.ActionComponent,
    minWidth: 70,
    sortable: false,
  },

]