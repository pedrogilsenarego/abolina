import { useDispatch, useSelector } from "react-redux";
import { State } from "../../slicer/types";
import { Book } from "../../slicer/books/books.types";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../slicer/books/books.actions";
import { organizeBooks } from "./utilsBooks";
import { addProductToCart } from "../../slicer/cart/cart.actions";
import { updateSuccessNotification } from "../../slicer/general/general.actions";
import { i18n } from "../../translations/i18n";

const useBooks = () => {
  const [collection, setCollection] = useState<string>("")
  
  const dispatch=useDispatch()
  const books = useSelector<State, Book[]>(
    (state) => state.books.books.data || []
  );
  const lang = useSelector<State, string>(
    (state) => state.general.lang || "PT"
  );

  const collections = organizeBooks(books)

  const handleAddToCart = (book:Book) => {
    dispatch(addProductToCart([book]));
    dispatch(
      updateSuccessNotification(`${i18n.t("notifications.success.addedCart")}`)
    );
  };


  useEffect(() => {
    dispatch(fetchBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {books, lang, collections, handleAddToCart, setCollection, collection}
}

export default useBooks