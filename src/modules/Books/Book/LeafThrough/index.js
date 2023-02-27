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
import FullScreenWrapper from "../../../../components/FullScreen/chatgtp";
import { motion } from "framer-motion";
import { SliderMine } from "./styles";
import { HiOutlinePlusSm, HiOutlineMinusSm } from "react-icons/hi";

const MyBook = ({ fullScreen, setFullScreen }) => {
  const [page, setPage] = useState(0);
  const [book, setBook] = useState();
  const [zoom, setZoom] = useState(true);
  const [zoomRatio, setZoomRatio] = useState(1);

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [leftButton, rightButton]);

  useEffect(() => {
    setZoom(true);

    setTimeout(() => {
      setZoom(false);
    }, [10]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fullScreen]);

  useEffect(() => {
    if (zoomRatio === 1) {
      setZoom(false);
      setTimeout(() => {
        bookRef.current.pageFlip().turnToPage(page);
      }, [10]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [zoomRatio]);

  const handleMove = (direction) => {
    if (page >= listImages.length / 2 && direction === "right") return;
    if (page <= 0 && direction === "left") return;
    setZoom(false);
    setZoomRatio(1);
    setTimeout(() => {
      bookRef.current.pageFlip().turnToPage(page);
    }, [20]);
    setTimeout(() => {
      if (direction === "left") {
        bookRef.current.pageFlip().flipPrev();
        return;
      }
      bookRef.current.pageFlip().flipNext();
      return;
    }, [50]);
  };

  const ratioWidth = fullScreen ? 0.8 : mobile ? 0.8 : 0.6;
  const ratioHeight = fullScreen ? 0.8 : mobile ? 0.3 : 0.6;
  const ratioWidthPage = fullScreen ? 0.4 : mobile ? 0.4 : 0.3;

  const width = windowSize.current[0] * ratioWidth;
  const height = windowSize.current[1] * ratioHeight;
  const widthPage = windowSize.current[0] * ratioWidthPage;

  const constraintsRef = useRef(null);

  const renderContent = () => {
    return (
      <FullScreenWrapper fullScreen={fullScreen} setFullScreen={setFullScreen}>
        <Box>
          <Typography
            textAlign='center'
            style={{
              textTransform: "uppercase",
              fontSize: mobileRotated || mobile ? "18px" : "28px",
              color: Colors.tealc,
              fontWeight: 800,
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
                "linear-gradient(90deg, #e4e4e4 0%, rgba(0,156,166,1) 50%, #e4e4e4 100%)",
            }}
          />
        </Box>
        {!zoom ? (
          <Box
            ref={mainBox}
            mt={mobileRotated ? "20px" : fullScreen ? "80px" : "60px"}
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
          <motion.div
            ref={constraintsRef}
            style={{
              height: height,
              width: width,
              overflow: "hidden",
              position: "relative",
              cursor: "grabbing",
              placeContent: "center",
              placeItems: "center",
              display: "flex",
              marginTop: mobileRotated ? "60px" : fullScreen ? "30px" : "60px",
            }}
          >
            <motion.div
              drag
              dragConstraints={constraintsRef}
              display='flex'
              style={{
                height: height * zoomRatio,
                width: width * zoomRatio,
                position: "absolute",
              }}
            >
              <img
                draggable={false}
                src={listImages[page]}
                width={widthPage * zoomRatio}
                height={height * zoomRatio}
                alt=''
                style={{ objectFit: "cover" }}
              />
              <img
                draggable={false}
                alt=''
                src={listImages[page + 1]}
                width={widthPage * zoomRatio}
                height={height * zoomRatio}
                style={{ objectFit: "cover" }}
              />
            </motion.div>
          </motion.div>
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
            fontSize={mobileRotated ? "18px" : "22px"}
            fontWeight='bold'
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
            color={Colors.tealcDark}
            style={{ cursor: "pointer" }}
            onClick={() => setFullScreen(true)}
          />
        </Box>
      )}
      {!mobileRotated && (
        <Box
          style={{
            position: "absolute",
            right: 50,
            bottom: 10,
            zIndex: 3000,
            borderRadius: "10px",
          }}
        >
          <Box display='flex' alignItems='center' width='220px' columnGap={2}>
            <HiOutlineMinusSm size='60px' color='white' />
            <SliderMine
              size='small'
              value={zoomRatio * 20 - 20}
              defaultValue={0}
              aria-label='Small'
              onChange={(e) => {
                setZoomRatio(e.target.value / 20 + 1);
                setZoom(true);
              }}
            />
            <HiOutlinePlusSm size='60px' color='white' />
          </Box>
        </Box>
      )}

      {listImages.length > 1 && !mobileRotated && (
        <Box
          display='flex'
          justifyContent='space-between'
          style={{
            position: "absolute",
            top: "45%",
            width: fullScreen ? "96vw" : "75vw",

            zIndex: 1000,
          }}
        >
          <FiChevronLeft
            size='80px'
            color={Colors.tealc}
            style={{ cursor: "pointer" }}
            onClick={() => handleMove("left")}
          />

          <FiChevronRight
            size='80px'
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
