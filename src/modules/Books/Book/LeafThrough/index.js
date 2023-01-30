import HTMLFlipBook from "react-pageflip";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CardMedia from "../../../../components/CardMedia";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { isEven } from "../../../../utils/math";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { MdFullscreen } from "react-icons/md";
import { Colors } from "../../../../constants/pallette";
import { i18n } from "../../../../translations/i18n";
import { useKeyPress } from "../../../../hooks/useKeyPress";
import Fullscreen from "../../../../components/FullScreen/FullScreen";

const MyBook = () => {
  const [page, setPage] = useState(0);
  const [book, setBook] = useState();
  const [fullScreen, setFullScreen] = useState(false);
  const mainBox = useRef(null);
  const listImages = book?.content || [];

  const bookRef = useRef();
  const leftButton = useKeyPress("ArrowLeft");
  const rightButton = useKeyPress("ArrowRight");
  const windowSize = useRef([window.innerWidth, window.innerHeight]);

  const storeBook = useSelector((state) => state.books.book || {});
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const mobileRotated = useMediaQuery(theme.breakpoints.down(800));

  useEffect(() => {
    setBook(storeBook);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (leftButton) {
      handleMove("left");
    }
    if (rightButton) {
      handleMove("right");
    }
  }, [leftButton, rightButton]);

  const handleMove = (direction) => {
    if (direction === "left") {
      bookRef.current.pageFlip().flipPrev();
      return;
    }
    bookRef.current.pageFlip().flipNext();
    return;
  };

  const renderContent = () => {
    return (
      <Fullscreen openFullScreen={fullScreen} setOpenFullScreen={setFullScreen}>
        <Box>
          <Typography
            textAlign='center'
            style={{
              fontSize: mobileRotated ? "20px" : "28px",
              color: Colors.tealc,
              fontWeight: 700,
              letterSpacing: "3px",
            }}
          >
            {book?.title}
          </Typography>
          <Box
            style={{
              height: mobileRotated ? "2px" : "3px",
              width: windowSize.current[0] * (mobile ? 0.8 : 0.6),
              background:
                "linear-gradient(90deg, rgba(249,249,252,1) 0%, rgba(0,156,166,1) 50%, rgba(244,246,246,1) 100%)",
            }}
          />
        </Box>

        <Box
          ref={mainBox}
          mt={mobileRotated ? "20px" : "100px"}
          width={windowSize.current[0] * (mobile ? 0.8 : 0.6)}
          height={windowSize.current[1] * (mobile ? 0.3 : 0.5)}
          display='flex'
          justifyContent='center'
          style={{
            boxShadow: "0px 10px 30px 10px #00000066",
            borderRadius: "6px",
          }}
        >
          <HTMLFlipBook
            width={windowSize.current[0] * (mobile ? 0.4 : 0.3)}
            height={windowSize.current[1] * (mobile ? 0.3 : 0.5)}
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
                <div key={index}>
                  <CardMedia
                    leafThrough
                    leafShadowPosition={isEven(index) ? "left" : "right"}
                    image={item}
                    height={windowSize.current[1] * (mobile ? 0.3 : 0.5)}
                  />
                </div>
              );
            })}
          </HTMLFlipBook>
        </Box>

        <Box
          style={{
            position: mobileRotated ? "inherit" : "absolute",
            width: "70vw",
            marginTop: mobileRotated ? "10px" : "0px",
            left: 50,
            bottom: 20,
          }}
        >
          <Typography
            color='white'
            fontSize={mobileRotated ? "20px" : "28px"}
            fontWeight={700}
          >
            {i18n.t("modules.books.viewBook.page")} {page + 1}-{page + 2} /{" "}
            {listImages.length}
          </Typography>
        </Box>
      </Fullscreen>
    );
  };

  return (
    <>
      <Box style={{ position: "absolute", right: 10, top: 10 }}>
        <MdFullscreen
          size={mobileRotated ? "2em" : "3em"}
          color={Colors.tealc}
          style={{ cursor: "pointer" }}
          onClick={() => setFullScreen(true)}
        />
      </Box>
      {listImages.length > 1 && !mobileRotated && (
        <Box
          display='flex'
          justifyContent='space-between'
          style={{
            position: "absolute",
            top: "45%",
            width: "67vw",

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
      {renderContent()}
    </>
  );
};

export default MyBook;
