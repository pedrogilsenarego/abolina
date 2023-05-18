import { Collection } from "../../slicer/books/books.types";

export const mapCollectionsData = (data: any) => {
 
  if (!data) {
    
    return []; // Return an empty array if data is undefined or falsy
  }
  console.log(data)
  return data.data.map((item:Collection) => {
    return { title: item.title, value: item.documentID };
  });
};
