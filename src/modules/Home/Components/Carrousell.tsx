import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useEffect, useState } from "react";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import "./styles.scss";
import { Colors } from "../../../constants/pallette";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { ROUTE_PATHS } from "../../../constants/routes";
import { useNavigate } from "react-router"
import { useDispatch, useSelector } from "react-redux";
import { fetchCarroussell } from "../../../slicer/books/books.actions";
import { State } from "../../../slicer/types";


const Carrousell = () => {

  const images = useSelector<State, string[]>(state => state.books.carroussell || [])
  const [errorImage, setErrorImage] = useState(false);
  const [indexMini, setIndexMini] = useState(0);
  const [mainImage, setMainImage] = useState(images[0]);
  const [hover, setHover] = useState<boolean>(false);
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  const Navigate = useNavigate()
  const dispatch = useDispatch()

  const IMAGE_HEIGHT_MOBILE = "80vh";
  const IMAGE_HEIGHT_LAPTOP = "20vh";

  useEffect(() => {
    dispatch(fetchCarroussell())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const mouseDownCoords = (e: any) => {
    // @ts-ignore
    window.checkForDrag = e.clientX;
  };
  const clickOrDrag = (e: any) => {
    const mouseUp = e.clientX;
    if (
      // @ts-ignore
      mouseUp < window.checkForDrag + 5 &&
      // @ts-ignore
      mouseUp > window.checkForDrag - 5
    ) {
    }
  };

  const handleOnImgError = () => {
    setErrorImage(true);
  };
  useEffect(() => {
    if (errorImage) setErrorImage(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mainImage]);

  const handleGoLeft = () => {
    if (indexMini > 0) {
      setIndexMini(indexMini - 1);
      setMainImage(images[indexMini]);
    }
    return;
  };
  const handleGoRight = () => {
    if (indexMini < images.length - 1) {
      setIndexMini(indexMini + 1);
      setMainImage(images[indexMini]);
    }
    return;
  };

  return (
    <>
      <Container
        maxWidth={"lg"}
        style={{ minHeight: "60vh", position: "relative" }}
      >
        {!mobile && (
          <Box
            display='flex'
            justifyContent='space-between'
            style={{
              width: "104%",
              position: "absolute",
              left: "-2%",
              bottom: "50%",
              zIndex: 1000,
            }}
          >
            <FiChevronLeft
              size='3em'
              color={Colors.tealc}
              style={{ cursor: "pointer" }}
              onClick={handleGoLeft}
            />
            <FiChevronRight
              size='3em'
              color={Colors.tealc}
              style={{ cursor: "pointer" }}
              onClick={handleGoRight}
            />
          </Box>
        )}
        <Box style={{}}>
          {!errorImage && (
            <CarouselProvider
              naturalSlideHeight={40}
              naturalSlideWidth={100}
              totalSlides={images.length}
              currentSlide={indexMini}
              lockOnWindowScroll
              touchEnabled={mobile ? true : false}
              dragEnabled={mobile ? true : false}
            // style={{ position: "relative" }}
            >
              <Slider
                onClick={() => Navigate(ROUTE_PATHS.BOOKS_BOOK)}
                onMouseDown={(e) => mouseDownCoords(e)}
                onMouseUp={(e) => clickOrDrag(e)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                style={{
                  boxShadow: hover && !mobile ? "10px 16px 10px #00000066" : "4px 4px 4px #00000066",
                  borderRadius: "4px",
                  transform: hover && !mobile ? "translate(-6px,-12px)" : null,
                  transition: "all 0.2s ease-in"
                }}
              >
                {images.map((image, pos) => {
                  return (
                    <Slide
                      key={pos}
                      index={pos}
                      style={{
                        height: mobile
                          ? IMAGE_HEIGHT_MOBILE
                          : IMAGE_HEIGHT_LAPTOP,
                      }}
                    >
                      <img
                        onError={handleOnImgError}
                        style={{
                          width: "100%",
                          objectFit: "cover",
                          height: "100%",
                          cursor: "Pointer",
                        }}
                        src={image}
                        alt=''
                      />
                    </Slide>
                  );
                })}
              </Slider>

              <>
                <Box
                  display='flex'
                  justifyContent='center'
                  style={{ marginTop: "35px" }}
                >
                  <DotGroup
                    className='prc-dotGroup'
                    style={{ transform: "scale(0.6)" }}
                  />
                </Box>
              </>
            </CarouselProvider>
          )}
        </Box>
      </Container>
    </>
  );
};

export default Carrousell;
