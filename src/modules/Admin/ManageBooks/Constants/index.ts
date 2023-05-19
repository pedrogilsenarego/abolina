
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
    id: "collection",
    label: "Collection",
    
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
    id: "newBook",
    label: "Book Status",
    
    type: ColumnType.Text,
    sortable: false,
  },{
    id: "discount",
    label: "Discount Papper",
    
    type: ColumnType.Text,
    sortable: false,
  },
  {
    id: "discountDigital",
    label: "Discount Digital",
    
    type: ColumnType.Text,
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