import { useDispatch } from "react-redux";
import { deleteBook, fetchBooks, updateCarroussellLink } from "../../../../slicer/books/books.actions";
import { useEffect } from "react";

import { Book } from "../../../../slicer/books/books.types";

interface Props {
  tableData: any
  books?: any
}

const useList = ({tableData, books}:Props) => {

  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchBooks())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleAction = (type: string, id: number, value?:any) => {
    switch (type) {
      case "link": 
      {
        const payload = {
          link: books?.data?.filter((book:Book)=>book.title===value)[0].documentID,
          title:value,
          pos: id
        }
       
       
          dispatch(updateCarroussellLink(payload))
          break;
      }
     
     
      default:
        break;
    }
  };

  return {handleAction}
}

export default useList