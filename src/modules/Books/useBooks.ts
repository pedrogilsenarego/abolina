import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { fetchCollectionByName } from "../../services/books/booksServices";
import { fetchBooks } from "../../slicer/books/books.actions";
import { Book, Collection } from "../../slicer/books/books.types";
import { addProductToCart } from "../../slicer/cart/cart.actions";
import { updateSuccessNotification } from "../../slicer/general/general.actions";
import { State } from "../../slicer/types";
import { i18n } from "../../translations/i18n";
import { organizeBooks } from "./utilsBooks";

const useBooks = () => {
  const location = useLocation();
  const [collection, setCollection] = useState<string>(
    location?.state?.collection || ""
  );
  const [openCollectionsDrawer, setOpenCollectionsDrawer] =
    useState<boolean>(false);
  const dispatch = useDispatch();
  const initialBooks = useSelector<State, Book[]>(
    (state) => state.books.books.data || []
  );
  const lang = useSelector<State, string>(
    (state) => state.general.lang || "PT"
  );

  const collections = organizeBooks(initialBooks);

  useEffect(() => {
    setCollection(collections[0].name);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  const {
    isLoading: loadingCollectionData,
    error: errorCollectionData,
    data: collectionData,
  } = useQuery<Collection>(["collection", collection], fetchCollectionByName, {
    enabled: collection !== "",
    staleTime: 600000, // 600 seconds (in milliseconds)
  });

  return {
    filteredBooks,
    lang,
    collections,
    handleAddToCart,
    setCollection,
    collection,
    collectionData,
    openCollectionsDrawer,
    setOpenCollectionsDrawer,
  };
};

export default useBooks;
