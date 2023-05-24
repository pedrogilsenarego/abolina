import { Book } from "../../slicer/books/books.types";

export type BookCollection = {
  title:string;
  id:string
}

export type Collection = {
  name: string;
  books: BookCollection[];
};

export const organizeBooks = (books: Book[]): Collection[] => {
  let collections: Collection[] = [];

  books.forEach((item: Book) => {
    if (item.collections) {
      const existingCollection = collections.find((c) => c.name === item.collections);
      if (existingCollection) {
        existingCollection.books.push({title:item.title, id:item.documentID});
      } else {
        collections.push({ name: item.collections, books: [{title:item.title, id:item.documentID}] });
      }
    }
  });

  return collections;
};

