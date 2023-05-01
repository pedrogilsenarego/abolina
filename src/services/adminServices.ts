import { QueryFunction } from "react-query";
import { handleFetchCollections } from "../slicer/general/general.helpers";


export const fetchCollections: QueryFunction<any> = async () => {
  
  try {
    console.log("fetching")
    const data:any = await handleFetchCollections()
    return data.available || [{value:"", title:""}]
  }
  catch {

  }
  
}