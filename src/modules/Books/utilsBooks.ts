import { Book } from "../../slicer/books/books.types";

export type Collection = {
  name: string;
  books: string[];
};

export const organizeBooks = (books: Book[]): Collection[] => {
  let collections: Collection[] = [];

  books.forEach((item: Book) => {
    if (item.collections) {
      const existingCollection = collections.find((c) => c.name === item.collections);
      if (existingCollection) {
        existingCollection.books.push(item.title);
      } else {
        collections.push({ name: item.collections, books: [item.title] });
      }
    }
  });

  return collections;
};

