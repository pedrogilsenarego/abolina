import { useDispatch } from "react-redux";
import { deleteBook, fetchBooks, updateNewBookStatus } from "../../../slicer/books/books.actions";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../constants/routes";

interface Props {
  tableData: any
}

const useList = ({tableData}:Props) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(()=>{
    dispatch(fetchBooks())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleAction = (type: string, id: number, value?:any) => {
    switch (type) {
      case "newBook": 
      {
        const payload = {
          value: value,
          documentID: tableData[id].documentID
        }
        
       
          dispatch(updateNewBookStatus(payload))
          break;
      }
      case "delete": {
        const payload = {
          documentID: tableData[id].documentID,
          title: tableData[id].title
        };
        dispatch(deleteBook(payload));
        break;
      }
      case "edit": {
        const document = tableData[id].documentID;
        const newPath = ROUTE_PATHS.ADMIN_BOOKS_EDIT.replace(':id', document);
        navigate(newPath);
        break;
      }
      case "settings": {
        const document = tableData[id].documentID;
        const newPath = ROUTE_PATHS.ADMIN_BOOKS_SETTINGS.replace(':id', document);
        navigate(newPath);
        break;
      }
      default:
        break;
    }
  };

  return {handleAction}
}

export default useList