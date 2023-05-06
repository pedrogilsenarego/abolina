
import { ColumnType } from '../../../../../components/TableList/types'


export const tableColumns = 
  
  [
  
  {
    id: "image",
    label: "Image",
    type: ColumnType.Image,
    sortable: false,
  },
  {
    id: "link",
    label: "Connect Book",
    type: ColumnType.Select,
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