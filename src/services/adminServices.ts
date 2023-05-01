import { QueryFunction } from "react-query";
import { handleFetchCollections } from "../slicer/general/general.helpers";
import { handleAddCollection } from "./adminHelpers";

export const fetchCollections: QueryFunction<any> = async () => {
  
  try {
    console.log("fetching")
    const data:any = await handleFetchCollections()
    return data.available || [{value:"", title:""}]
  }
  catch {

  }
  
}

export const addCollection = async (value:{value:string, title:string}) => {
 
  try {
    console.log("adding Data")
    await handleAddCollection(value)
    
  }
  catch {

  }
  
}