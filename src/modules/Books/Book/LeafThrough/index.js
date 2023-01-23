import HTMLFlipBook from "react-pageflip";
import { useState, useEffect, useRef, useLayoutEffect } from "react";
import { useSelector } from "react-redux";
import CardMedia from "../../../../components/CardMedia";
import { Box, Typography } from "@mui/material";
import { isEven } from "../../../../utils/math";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Colors } from "../../../../constants/pallette";
import { i18n } from "../../../../translations/i18n";

const MyBook = () => {
  const [page, setPage] = useState(0);
  const [book, setBook] = useState();
  const mainBox = useRef(null);
  const listImages = book?.content || [];
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);
  const bookRef = useRef();

  useLayoutEffect(() => {
    setWidth(mainBox.current.offsetWidth);
    setHeight(mainBox.current.offsetHeight);
  }, []);

  const storeBook = useSelector((state) => state.books.book || {});

  useEffect(() => {
    setBook(storeBook);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMove = (direction) => {
    if (direction === "left") {
      bookRef.current.pageFlip().flipPrev();
      return;
    }
    bookRef.current.pageFlip().flipNext();
    return;
  };

  console.log(bookRef?.current?.pageFlip()?.getCurrentPageIndex() || "");

  return (
    <>
      {listImages.length > 1 && (
        <Box
          display='flex'
          justifyContent='space-between'
          style={{
            width: "77vw",
            position: "absolute",

            bottom: "43vh",
            zIndex: 1000,
          }}
        >
          <FiChevronLeft
            size='3em'
            color={Colors.tealc}
            style={{ cursor: "pointer" }}
            onClick={() => handleMove("left")}
          />

          <FiChevronRight
            size='3em'
            color={Colors.tealc}
            style={{ cursor: "pointer" }}
            onClick={() => handleMove("right")}
          />
        </Box>
      )}
      <Box style={{ position: "absolute" }}>
        <Typography
          textAlign='center'
          style={{
            fontSize: "28px",
            color: Colors.tealc,
            fontWeight: 700,
            letterSpacing: "3px",
          }}
        >
          {book?.title}
        </Typography>
        <Box
          style={{
            height: "3px",
            width: width,
            background:
              "linear-gradient(90deg, rgba(249,249,252,1) 0%, rgba(0,156,166,1) 50%, rgba(244,246,246,1) 100%)",
          }}
        />
      </Box>
      <Box
        ref={mainBox}
        mt='110px'
        width='80%'
        display='flex'
        justifyContent='center'
        style={{
          boxShadow: "0px 10px 30px 10px #00000066",
          borderRadius: "6px",
        }}
      >
        <HTMLFlipBook
          width={width / 2}
          height={600}
          size='stretch'
          maxShadowOpacity={0.5}
          drawShadow
          flippingTime={1500}
          autoSize
          ref={bookRef}
          onFlip={(e) => setPage(e.data)}
          mobileScrollSupport={true}
        >
          {listImages.map((item, index) => {
            return (
              <div>
                <CardMedia
                  leafThrough
                  leafShadowPosition={isEven(index) ? "left" : "right"}
                  image={item}
                  height={600}
                />
              </div>
            );
          })}
        </HTMLFlipBook>
      </Box>
      <Box
        style={{ position: "absolute", width: "70vw", left: 50, bottom: 20 }}
      >
        <Typography color='white' fontSize='28px' fontWeight={700}>
          {i18n.t("modules.books.viewBook.page")} {page + 1}-{page + 2} /{" "}
          {listImages.length}
        </Typography>
      </Box>
    </>
  );
};

export default MyBook;
