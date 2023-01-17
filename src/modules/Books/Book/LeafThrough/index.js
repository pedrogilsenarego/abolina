import { Typography, Box } from "@mui/material";
import HTMLFlipBook from "react-pageflip";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import CardMedia from "../../../../components/CardMedia";

const MyBook = () => {
  const [page, setPage] = useState(1);
  const [book, setBook] = useState();

  const listImages = book?.content || [];

  const storeBook = useSelector((state) => state.books.book || {});

  useEffect(() => {
    setBook(storeBook);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(book);

  return (
    <>
      <HTMLFlipBook
        width={300}
        height={500}
        size='stretch'
        minWidth={315}
        maxWidth={1000}
        minHeight={400}
        maxHeight={1533}
        maxShadowOpacity={0.5}
        // showCover={true}
        mobileScrollSupport={true}
      >
        {listImages.map((item, index) => {
          return (
            <div className='demoPage'>
              <Typography style={{ color: "black" }}>
                Page {index + 1}
              </Typography>
              <CardMedia image={item} height='100%' />
            </div>
          );
        })}
      </HTMLFlipBook>
    </>
  );
};

export default MyBook;
