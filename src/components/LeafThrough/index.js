import { Box, useMediaQuery, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { HiOutlineMinusSm, HiOutlinePlusSm } from "react-icons/hi";
import { MdFullscreen } from "react-icons/md";
import HTMLFlipBook from "react-pageflip";
import { useSelector } from "react-redux";
import { Colors } from "../../constants/pallette";
import { useKeyPress } from "../../hooks/useKeyPress";
import { i18n } from "../../translations/i18n";
import FullScreenWrapper from "../FullScreen/chatgtp";
import { SliderMine } from "./styles";

import "./App.css";

const PageCover = React.forwardRef((props, ref) => {
  return (
    <div
      className="cover"
      ref={ref}
      onMouseDown={props.onMouseDown}
      onMouseUp={props.onMouseUp}
      onMouseMove={props.onMouseMove}
      data-density="hard"
      onClick={props.onClick}
    >
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

function MyAlbum({ fullScreen, setFullScreen }) {
  const [book, setBook] = useState();
  const [page, setPage] = useState(0);
  const [zoom, setZoom] = useState(true);
  const [state, setState] = useState("");
  const [zoomRatio, setZoomRatio] = useState(1);
  const [centerBook, setCenterBook] = useState("normal");
  const [isMounted, setIsMounted] = useState(false);
  const bookRef = useRef();
  const constraintsRef = useRef(null);
  const leftButton = useKeyPress("ArrowLeft");
  const rightButton = useKeyPress("ArrowRight");
  const listImages = book?.content || [];
  const theme = useTheme();
  const mobileRotated = useMediaQuery(theme.breakpoints.down(800));
  const storeBook = useSelector((state) => state?.books?.book || {});
  const windowSize = useRef([window.innerWidth, window.innerHeight]);
  const width = mobileRotated
    ? (windowSize.current[0] / 2.8).toFixed(0) || 400
    : (windowSize.current[0] / 3.5).toFixed(0) || 560; //(windowSize.current[0] / 4.5).toFixed(0) || 400;
  //const width = (windowSize.current[0] / 4.5).toFixed(0) || 400;
  const height = zoom ? width * 1.01 : width; //width * 1.18;
  //const height = width * 1.18;

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
      setIsMounted(false);
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
    setZoomRatio(1);
    setTimeout(() => {
      bookRef.current.pageFlip().turnToPage(page);
    }, [20]);
    setTimeout(() => {
      if (direction === "left") {
        if (page === 1) setCenterBook("normal");
        if (page === listImages.length - 1) setCenterBook(false);
        bookRef.current.pageFlip().flipPrev();
        return;
      }
      if (direction === "right") {
        if (page === 0) setCenterBook(false);
        if (page === listImages.length - 3) setCenterBook("inversed");
        bookRef.current.pageFlip().flipNext();
        return;
      }
    }, [50]);
  };

  useEffect(() => {
    if (isMounted) {
      if (page === 0) setCenterBook("normal");
      if (page === listImages.length) setCenterBook("inversed");

      if (page > 0 && page < listImages.length - 3) setCenterBook(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const renderBook = () => {
    return (
      <div
        style={{
          width: "100%",
          height: "100%",
          padding: mobileRotated ? "0px" : "120px 0px",

          display: zoom ? "flex" : undefined,
          justifyContent: zoom ? "center" : undefined,
        }}
      >
        {!fullScreen && !mobileRotated && (
          <Box style={{ position: "absolute", right: "10px", top: "10px" }}>
            <MdFullscreen
              size={mobileRotated ? "2rem" : "2.5rem"}
              color={"#7f7f7f"}
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
        {listImages.length > 1 && !mobileRotated && (
          <Box
            display="flex"
            justifyContent="space-between"
            style={{
              position: "absolute",

              top: "47%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "100%",
              zIndex: 1000,
            }}
          >
            <FiChevronLeft
              size="100px"
              color={page > 0 ? Colors.tealc : Colors.greyTransparent}
              style={{ cursor: "pointer" }}
              onClick={() => handleMove("left")}
            />

            <FiChevronRight
              size="100px"
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
          <div
            style={{
              transition: !isMounted ? "none" : "transform 1s ease-in-out",
              transform:
                centerBook === "normal" && !mobileRotated
                  ? `translate(-${width / 2}px, 0%)`
                  : centerBook === "inversed" && !mobileRotated
                  ? `translate(${width / 2}px, 0%)`
                  : `translate(0%, 0%)`,
            }}
          >
            <HTMLFlipBook
              width={mobileRotated ? width * 2 : width}
              height={mobileRotated ? height * 2 : height}
              minWidth={315}
              maxWidth={1000}
              minHeight={420}
              maxHeight={1350}
              showCover={mobileRotated ? false : true}
              onChangeState={(e) => setState(e.data)}
              flippingTime={1200}
              style={{ margin: "0 auto" }}
              maxShadowOpacity={0} // for shadows put 0.5
              className="album-web"
              ref={bookRef}
              onFlip={(e) => {
                setPage(e.data);
              }}
              onInit={() => setIsMounted(true)}
              mobileScrollSupport={true}
            >
              {mobileRotated
                ? listImages.map((item, index) => (
                    <Page>
                      <img
                        src={item}
                        alt=""
                        width="100%"
                        height="100%"
                        objectFit="cover"
                      />
                    </Page>
                  ))
                : listImages.map((item, index) => {
                    switch (index) {
                      case 0:
                        return (
                          <PageCover
                            image={item}
                            onClick={() => {
                              if (state !== "flipping") {
                                setCenterBook(false);
                              }
                            }}
                          />
                        );
                      case 1:
                        return (
                          <PageCover
                            image={item}
                            onClick={() => {
                              setCenterBook("normal");
                            }}
                          />
                        );
                      case listImages.length - 2:
                        return (
                          <PageCover
                            image={item}
                            onClick={() => {
                              setCenterBook("inversed");
                            }}
                          />
                        );
                      case listImages.length - 1:
                        return (
                          <PageCover
                            image={item}
                            onClick={() => {
                              setCenterBook(false);
                            }}
                          />
                        );
                      default:
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
                    }
                  })}
            </HTMLFlipBook>
          </div>
        ) : (
          <div>
            <motion.div
              ref={constraintsRef}
              style={{
                height: height,

                width: mobileRotated ? width : width * 2,
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
                  width:
                    width *
                    (page === 0 || page === listImages.length - 1 ? 1 : 2) *
                    zoomRatio,
                  position: "absolute",
                }}
              >
                <img
                  draggable={false}
                  src={listImages[page]}
                  width={width * zoomRatio}
                  height={height * zoomRatio}
                  alt=""
                  style={{ objectFit: "cover" }}
                />
                {page !== 0 && (
                  <img
                    draggable={false}
                    alt=""
                    src={listImages[page + 1]}
                    width={width * zoomRatio}
                    height={height * zoomRatio}
                    style={{ objectFit: "cover" }}
                  />
                )}
              </motion.div>
            </motion.div>
          </div>
        )}

        {!mobileRotated && page !== 0 && page !== listImages.length - 1 && (
          <div
            style={{
              position: mobileRotated ? "inherit" : "absolute",
              width: "70vw",
              marginTop: mobileRotated ? "10px" : "0px",
              left: 50,
              bottom: 10,
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: mobileRotated ? "18px" : "22px",
                fontWeight: "bold",
              }}
            >
              {i18n.t("modules.books.viewBook.page")}{" "}
              {page + (mobileRotated ? 1 : 0)}
              {!mobileRotated && `-${page + 1}`} / {listImages.length - 2}
            </p>
          </div>
        )}
        {mobileRotated && (
          <div
            style={{
              position: mobileRotated ? "inherit" : "absolute",
              width: "70vw",
              marginTop: mobileRotated ? "10px" : "0px",
              left: 50,
              bottom: 10,
            }}
          >
            <p
              style={{
                color: "white",
                fontSize: mobileRotated ? "18px" : "22px",
                fontWeight: "bold",
              }}
            >
              {i18n.t("modules.books.viewBook.page")}{" "}
              {page + (mobileRotated ? 1 : 0)}
              {!mobileRotated && `-${page + 1}`} / {listImages.length}
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <FullScreenWrapper fullScreen={fullScreen} setFullScreen={setFullScreen}>
      {renderBook()}
    </FullScreenWrapper>
  );
}

export default MyAlbum;
