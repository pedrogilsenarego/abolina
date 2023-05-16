import { useDispatch, useSelector } from "react-redux";
import { State } from "../../slicer/types";
import { Book } from "../../slicer/books/books.types";
import { useEffect, useState } from "react";
import { fetchBooks } from "../../slicer/books/books.actions";
import { organizeBooks } from "./utilsBooks";
import { addProductToCart } from "../../slicer/cart/cart.actions";
import { updateSuccessNotification } from "../../slicer/general/general.actions";
import { i18n } from "../../translations/i18n";
import { useLocation } from "react-router";

const useBooks = () => {
  const location = useLocation()
  const [collection, setCollection] = useState<string>(location?.state?.collection|| "");
  const dispatch = useDispatch();
  const initialBooks = useSelector<State, Book[]>(
    (state) => state.books.books.data || []
  );
  const lang = useSelector<State, string>(
    (state) => state.general.lang || "PT"
  );

  const collections = organizeBooks(initialBooks);

  const filterBooks = (): Book[] => {
    if (collection === "") return initialBooks;
    return initialBooks.filter((book) => book.collections === collection);
  };

  const filteredBooks = filterBooks();

  const handleAddToCart = (book: Book) => {
    dispatch(addProductToCart([book]));
    dispatch(
      updateSuccessNotification(`${i18n.t("notifications.success.addedCart")}`)
    );
  };

  useEffect(() => {
    dispatch(fetchBooks());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    filteredBooks,
    lang,
    collections,
    handleAddToCart,
    setCollection,
    collection,
  };
};

export default useBooks;
