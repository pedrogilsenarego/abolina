import { useSelector } from "react-redux";
import TableList from "../../../../components/TableList";
import { tableColumns } from "./Constants";
import { mapCarouselItems } from "./mapper";
import useList from "./useList";
import { State } from "../../../../slicer/types";


const Table = () => {
  const tableData = useSelector<State, any>((state) => state.books.carroussell);
  console.log(tableData)
  const { handleAction } = useList({ tableData })
  return (
    <>
      <TableList
        columns={tableColumns}
        rows={mapCarouselItems(tableData).rows}
        onAction={handleAction}
      /></>
  )
}

export default Table