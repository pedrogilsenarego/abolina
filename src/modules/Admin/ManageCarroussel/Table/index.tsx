import { useSelector } from "react-redux";
import TableList from "../../../../components/TableList";
import { tableColumns } from "./Constants";
import { mapCarouselItems } from "./mapper";
import useList from "./useList";
import { State } from "../../../../slicer/types";
import { Carousel } from "../../../../slicer/books/books.types";


const Table = () => {
  const tableData = useSelector<State, Carousel[]>((state) => state?.books?.carroussell);
  // const books = useSelector<State, any>((state) => state?.books?.books)
  // console.log(books)

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