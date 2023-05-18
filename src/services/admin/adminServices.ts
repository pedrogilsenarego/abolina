import { QueryFunction, QueryKey } from "react-query";
import {  handleSaveSettings } from "./adminHelpers";
import { handleFetchBook, handleFetchCollection, handleFetchCollections } from "../../slicer/books/books.helpers";
import { mapCollectionsData } from "./adminMapper";
export const fetchCollections: QueryFunction<any> = async () => {
  
  try {
    console.log("fetching")
    const data:any = await handleFetchCollections({})
    
    return {options:mapCollectionsData(data)||[{value:"", title:""}], data}
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

export const fetchCollection: QueryFunction<any, QueryKey> = async ({ queryKey }) => {
  const documentID = queryKey[1] as string;

  try {
    console.log(`fetching collection ${documentID}`);
    const data = await handleFetchCollection(documentID);
    return data;
  } catch (error) {
    // Handle the error or throw it to be caught by React Query's error handling
    throw error;
  }
};

export const saveSettings = async (values:{newBook:string,discount:number, format:string[]}, documentID:string) => {
  try {
    console.log("adding Data")
    await handleSaveSettings(values, documentID)
  }
  catch {
  }
  
}

