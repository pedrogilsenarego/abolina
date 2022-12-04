import { Box } from "@mui/material";
import CardMedia from "../../../../components/CardMedia";
import CollectionBrowser from "../Roster/CollectionBrowser";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../slicer/types";
import { Book } from "../../../../slicer/books/books.types";

const ViewBook = () => {
  const [page, setPage] = useState<number>(1);
  const [book, setBook] = useState<Book>();

  const listImages = book?.content || []

  const storeBook = useSelector<State, Book>(
    (state) => state.books.book || {}
  );

  useEffect(() => {
    setBook(storeBook)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleRight = () => {
    if (page < listImages.length) {
      setPage(page + 1);
    } else return;
  };

  const handleLeft = () => {
    if (page > 0 + 1) {
      setPage(page - 1);
    } else return;
  };

  return (
    <>
      <CardMedia image={listImages[page - 1]} height='auto' />
      <Box display='flex' justifyContent='center' mt='30px' mb='30px'>
        <CollectionBrowser
          handleRight={handleRight}
          handleLeft={handleLeft}
          title={`${page}/${listImages.length}`}
        />
      </Box>
    </>
  );
};

export default ViewBook;
