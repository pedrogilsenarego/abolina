import { QueryFunction, QueryKey } from "react-query";
import { handleFetchCollectionByName } from "../../slicer/books/books.helpers";

export const fetchCollectionByName: QueryFunction<any, QueryKey> = async ({
  queryKey,
}) => {
  const documentName = queryKey[1] as string;

  try {
    console.log(`fetching collection ${documentName}`);
    const data = await handleFetchCollectionByName(documentName);
    return data;
  } catch (error) {
    // Handle the error or throw it to be caught by React Query's error handling
    throw error;
  }
};