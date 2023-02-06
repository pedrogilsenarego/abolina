import HTMLFlipBook from "react-pageflip";
import { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import CardMedia from "../../../../components/CardMedia";
import { Box, Typography, useTheme, useMediaQuery } from "@mui/material";
import { isEven } from "../../../../utils/math";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ImEyePlus, ImEyeMinus } from "react-icons/im";
import { MdFullscreen } from "react-icons/md";
import { Colors } from "../../../../constants/pallette";
import { i18n } from "../../../../translations/i18n";
import { useKeyPress } from "../../../../hooks/useKeyPress";
import FullScreenWrapper from "../../../../components/FullScreen/chatgtp";
import ZoomC from "../../../../components/Zoom";

const MyBook = ({ fullScreen, setFullScreen }) => {
  const [page, setPage] = useState(0);
  const [book, setBook] = useState();
  const [zoom, setZoom] = useState(true);

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

  useEffect(() => {
    setZoom(true);

    setTimeout(() => {
      setZoom(false);
    }, [10]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullScreen]);

  console.log(zoom);

  const handleMove = (direction) => {
    if (direction === "left") {
      bookRef.current.pageFlip().flipPrev();
      return;
    }
    bookRef.current.pageFlip().flipNext();
    return;
  };

  const ratioWidth = fullScreen ? 0.9 : mobile ? 0.8 : 0.6;
  const ratioHeight = fullScreen ? 0.9 : mobile ? 0.3 : 0.6;
  const ratioWidthPage = fullScreen ? 0.45 : mobile ? 0.4 : 0.3;

  const width = windowSize.current[0] * ratioWidth;
  const height = windowSize.current[1] * ratioHeight;
  const widthPage = windowSize.current[0] * ratioWidthPage;

  const renderContent = () => {
    return (
      <FullScreenWrapper fullScreen={fullScreen} setFullScreen={setFullScreen}>
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
              width: width,
              background:
                "linear-gradient(90deg, rgba(249,249,252,1) 0%, rgba(0,156,166,1) 50%, rgba(244,246,246,1) 100%)",
            }}
          />
        </Box>
        {!zoom ? (
          <Box
            ref={mainBox}
            mt={mobileRotated ? "20px" : fullScreen ? "30px" : "60px"}
            width={width}
            height={height}
            display='flex'
            justifyContent='center'
            style={{
              boxShadow: "0px 10px 30px 10px #00000066",
              borderRadius: "6px",
            }}
          >
            <HTMLFlipBook
              width={widthPage}
              height={height}
              size='stretch'
              maxShadowOpacity={0.5}
              drawShadow
              flippingTime={1200}
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
                      height={height}
                    />
                  </div>
                );
              })}
            </HTMLFlipBook>
          </Box>
        ) : (
          <Box
            display='flex'
            mt={mobileRotated ? "20px" : fullScreen ? "30px" : "60px"}
          >
            <ZoomC image={listImages[page]} width={widthPage} height={height} />
            <ZoomC
              image={listImages[page + 1]}
              width={widthPage}
              height={height}
            />
          </Box>
        )}

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
      </FullScreenWrapper>
    );
  };

  return (
    <>
      {!fullScreen && !mobileRotated && (
        <Box style={{ position: "absolute", right: 10, top: 10 }}>
          <MdFullscreen
            size={mobileRotated ? "2em" : "2.5em"}
            color={Colors.tealc}
            style={{ cursor: "pointer" }}
            onClick={() => setFullScreen(true)}
          />
        </Box>
      )}
      {!mobileRotated && (
        <Box style={{ position: "absolute", right: 60, top: 20 }}>
          {!zoom ? (
            <ImEyePlus
              size={mobileRotated ? "1em" : "1.5em"}
              color={Colors.tealc}
              style={{ cursor: "pointer" }}
              onClick={() => setZoom(!zoom)}
            />
          ) : (
            <ImEyeMinus
              size={mobileRotated ? "1em" : "1.5em"}
              color={Colors.tealc}
              style={{ cursor: "pointer" }}
              onClick={() => {
                setZoom(!zoom);
                setTimeout(() => {
                  bookRef.current.pageFlip().turnToPage(page);
                }, [10]);
              }}
            />
          )}
        </Box>
      )}

      {listImages.length > 1 && !mobileRotated && !zoom && (
        <Box
          display='flex'
          justifyContent='space-between'
          style={{
            position: "absolute",
            top: "45%",
            width: fullScreen ? "93vw" : "67vw",

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
