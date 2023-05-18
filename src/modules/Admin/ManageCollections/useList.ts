import { useDispatch } from "react-redux";
import {deleteCollection,  fetchCollections } from "../../../slicer/books/books.actions";
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
    dispatch(fetchCollections())
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  const handleAction = (type: string, id: number, value?:any) => {
    switch (type) {
     
      case "delete": {
        dispatch(deleteCollection(tableData[id].documentID,));
        break;
      }
      case "edit": {
        const document = tableData[id].documentID;
        const newPath = ROUTE_PATHS.ADMIN_COLLECTIONS_EDIT.replace(':id', document);
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