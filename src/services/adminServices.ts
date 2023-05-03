import { QueryFunction, QueryKey } from "react-query";
import { handleFetchCollections } from "../slicer/general/general.helpers";
import { handleAddCollection } from "./adminHelpers";
import { handleFetchBook } from "../slicer/books/books.helpers";

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

export const fetchBook: QueryFunction<any, QueryKey> = async ({ queryKey }) => {
  const documentID = queryKey[1] as string;

  try {
    console.log(`fetching book ${documentID}`);
    const data = await handleFetchBook(documentID);
    return data;
  } catch (error) {
    // Handle the error or throw it to be caught by React Query's error handling
    throw error;
  }
};
