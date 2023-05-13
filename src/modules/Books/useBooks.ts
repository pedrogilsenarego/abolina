import { useDispatch, useSelector } from "react-redux";
import { State } from "../../slicer/types";
import { Book } from "../../slicer/books/books.types";
import { useEffect } from "react";
import { fetchBooks } from "../../slicer/books/books.actions";
import { organizeBooks } from "./utilsBooks";

const useBooks = () => {
  const dispatch=useDispatch()
  const books = useSelector<State, Book[]>(
    (state) => state.books.books.data || []
  );
  const lang = useSelector<State, string>(
    (state) => state.general.lang || "PT"
  );

  const collections = organizeBooks(books)


  useEffect(() => {
    dispatch(fetchBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {books, lang, collections}
}

export default useBooks