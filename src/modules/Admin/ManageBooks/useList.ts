import { useDispatch } from "react-redux";
import { fetchBooks, updateNewBookStatus } from "../../../slicer/books/books.actions";
import { useEffect } from "react";

interface Props {
  tableData: any
}

const useList = ({tableData}:Props) => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchBooks())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleAction = (type: string, id: number) => {
    switch (type) {
      case "newBook": {
        const signal = tableData[id].newBook ?? true
        const payload = {signal: !signal, documentID: tableData[id].documentID}
        dispatch(updateNewBookStatus(payload))
        break;
      }
      default:
        break;
    }
  };

  return {handleAction}
}

export default useList