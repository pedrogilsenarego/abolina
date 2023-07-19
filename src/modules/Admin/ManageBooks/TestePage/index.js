import { Box, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import HTMLFlipBook from "react-pageflip";
import { useSelector } from "react-redux";
import { Colors } from "../../../../constants/pallette";
import { useKeyPress } from "../../../../hooks/useKeyPress";
import { i18n } from "../../../../translations/i18n";
import { SliderMine } from "./styles";

import "./App.css";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div className="cover" ref={ref} data-density="hard">
      <img
        src={props.image}
        alt=""
        width="100%"
        height="100%"
        objectFit="cover"
      />
    </div>
  );
});

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="page" ref={ref}>
      {props.children}
    </div>
  );
});

function MyAlbum(props) {
  const [book, setBook] = useState();
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(true);
  const [zoomRatio, setZoomRatio] = useState(1);
  const bookRef = useRef();
  const constraintsRef = useRef(null);
  const leftButton = useKeyPress("ArrowLeft");
  const rightButton = useKeyPress("ArrowRight");
  const listImages = book?.content || [];
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const mobileRotated = useMediaQuery(theme.breakpoints.down(800));
  const storeBook = useSelector((state) => state?.books?.books?.data[1] || {});
  const width = 450;
  const height = width * 1.18;
  const fullScreen = false;

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
    if (page >= listImages.length / 2 + 6 && direction === "right") return;
    if (page <= 0 && direction === "left") return;
    setZoom(false);
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

  const renderBook = () => {
    return (
      <div
        style={{
          padding: "200px 0px",
          position: "relative",
          backgroundColor: "lightblue",
          display: zoom ? "flex" : undefined,
          justifyContent: zoom ? "center" : undefined,
        }}
      >
        {!mobileRotated && page >= 3 && page < listImages.length + 3 && (
          <Box
            style={{
              position: "absolute",
              right: 50,
              bottom: 10,
              zIndex: 3000,
              borderRadius: "10px",
            }}
          >
            <Box display="flex" alignItems="center" width="220px" columnGap={2}>
              <HiOutlineMinusSm size="60px" color="white" />
              <SliderMine
                size="small"
                value={zoomRatio * 20 - 20}
                defaultValue={0}
                aria-label="Small"
                onChange={(e) => {
                  setZoomRatio(e.target.value / 20 + 1);
                  setZoom(true);
                }}
              />
              <HiOutlinePlusSm size="60px" color="white" />
            </Box>
          </Box>
        )}
        {listImages.length > 1 && !mobileRotated && !zoom && (
          <Box
            display="flex"
            justifyContent="space-between"
            style={{
              position: "absolute",

              top: "47%",
              left: "50%",
              transform: "translateX(-50%)",
              width: width * 2.3,
              zIndex: 1000,
            }}
          >
            <FiChevronLeft
              size="50px"
              color={page > 0 ? Colors.tealc : Colors.greyTransparent}
              style={{ cursor: "pointer" }}
              onClick={() => handleMove("left")}
            />

            <FiChevronRight
              size="50px"
              color={
                page < listImages.length + 5
                  ? Colors.tealc
                  : Colors.greyTransparent
              }
              style={{ cursor: "pointer" }}
              onClick={() => handleMove("right")}
            />
          </Box>
        )}
        {!zoom ? (
          <div>
            <HTMLFlipBook
              width={width}
              height={height}
              minWidth={315}
              maxWidth={1000}
              minHeight={420}
              maxHeight={1350}
              showCover={true}
              flippingTime={1200}
              style={{ margin: "0 auto" }}
              maxShadowOpacity={0.5}
              className="album-web"
              ref={bookRef}
              onFlip={(e) => setPage(e.data)}
              mobileScrollSupport={true}
            >
              <PageCover image={book?.coverPage[0] || ""} />
              <PageCover />
              <Page>
                <p>{book?.title}</p>
                <p>{book?.author}</p>
              </Page>
              {listImages.map((item, index) => {
                return (
                  <Page>
                    <img
                      src={item}
                      alt=""
                      width="100%"
                      height="100%"
                      objectFit="cover"
                    />
                  </Page>
                );
              })}
              {listImages.length % 2 === 0 && <Page />}
              <PageCover></PageCover>
              <PageCover>see you</PageCover>
            </HTMLFlipBook>
          </div>
        ) : (
          <div>
            <motion.div
              ref={constraintsRef}
              style={{
                height: height,

                width: width * 2,
                overflow: "hidden",
                position: "relative",
                cursor: "grabbing",
                placeContent: "center",
                placeItems: "center",
                display: "flex",
              }}
            >
              <motion.div
                drag
                dragConstraints={constraintsRef}
                display="flex"
                style={{
                  height: height * zoomRatio,
                  width: width * 2 * zoomRatio,
                  position: "absolute",
                }}
              >
                <img
                  draggable={false}
                  src={listImages[page - 3]}
                  width={width * zoomRatio}
                  height={height * zoomRatio}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
                <img
                  draggable={false}
                  alt=""
                  src={listImages[page - 2]}
                  width={width * zoomRatio}
                  height={height * zoomRatio}
                  style={{ objectFit: "cover" }}
                />
              </motion.div>
            </motion.div>
          </div>
        )}
        {page !== 0 && page !== listImages.length + 5 && (
          <div
            style={{
              position: mobileRotated ? "inherit" : "absolute",
              width: "70vw",
              marginTop: mobileRotated ? "10px" : "0px",
              left: 50,
              bottom: 20,
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: mobileRotated ? "18px" : "22px",
                fontWeight: "bold",
              }}
            >
              {i18n.t("modules.books.viewBook.page")} {page}-{page + 1} /{" "}
              {listImages.length + 4}
            </p>
          </div>
        )}
      </div>
    );
  };

  return <>{renderBook()}</>;
}

export default MyAlbum;
