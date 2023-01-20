import HTMLFlipBook from "react-pageflip";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import CardMedia from "../../../../components/CardMedia";
import { Box, Typography } from "@mui/material";

const MyBook = () => {
  const [page, setPage] = useState(1);
  const [book, setBook] = useState();
  const mainBox = useRef(null);
  const listImages = book?.content || [];
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useLayoutEffect(() => {
    setWidth(mainBox.current.offsetWidth);
    setHeight(mainBox.current.offsetHeight);
  }, []);

  const storeBook = useSelector((state) => state.books.book || {});

  useEffect(() => {
    setBook(storeBook);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(book);

  return (
    <>
      <Box
        ref={mainBox}
        mt='60px'
        width='80%'
        display='flex'
        justifyContent='center'
        style={{
          overflow: "hidden",
          boxShadow: "0px 10px 30px 10px #00000066",
          borderRadius: "6px",
        }}
      >
        <HTMLFlipBook
          width={width / 2}
          height={600}
          size='fixed'
          maxShadowOpacity={0.5}
          drawShadow
          flippingTime={1500}
          autoSize
          // showCover={true}
          mobileScrollSupport={true}
        >
          {listImages.map((item, index) => {
            return (
              <div className='demoPage'>
                <CardMedia image={item} height='100%' />
              </div>
            );
          })}
        </HTMLFlipBook>
      </Box>
    </>
  );
};

export default MyBook;
