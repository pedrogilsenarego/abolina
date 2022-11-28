import { CarouselProvider, Slider, Slide, DotGroup } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useEffect, useState } from "react";
import { Box, Container, useMediaQuery, useTheme } from "@mui/material";
import "./styles.scss";
import { Colors } from "../../../constants/pallette";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const Carrousell = () => {
  const NO_IMAGE =
    "https://upload.wikimedia.org/wikipedia/commons/f/fc/No_picture_available.png";

  const images = [NO_IMAGE, NO_IMAGE, NO_IMAGE];
  const [errorImage, setErrorImage] = useState(false);
  const [indexMini, setIndexMini] = useState(0);
  const [mainImage, setMainImage] = useState(images[0]);
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));

  const IMAGE_HEIGHT_MOBILE = "80vh";
  const IMAGE_HEIGHT_LAPTOP = "20vh";

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
    if (indexMini > 0) { setIndexMini(indexMini - 1); }
    return

  };
  const handleGoRight = () => {
    if (indexMini < images.length - 1) {
      setIndexMini(indexMini + 1);
    }
    return
  };

  console.log(indexMini)

  return (
    <>
      <Container
        maxWidth={"lg"}
        style={{ minHeight: "60vh", position: "relative" }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          style={{
            width: "100%",
            position: "absolute",

            bottom: "53%",
            zIndex: "1000",
          }}
        >
          <FiChevronLeft
            size='2.5em'
            color={Colors.tealc}
            style={{ cursor: "pointer" }}
            onClick={handleGoLeft}
          />
          <FiChevronRight
            size='2.5em'
            color={Colors.tealc}
            style={{ cursor: "pointer" }}
            onClick={handleGoRight}
          />
        </Box>
        <Box>
          {!errorImage && (
            <CarouselProvider
              naturalSlideHeight={40}
              naturalSlideWidth={100}
              totalSlides={3}
              currentSlide={indexMini}
              lockOnWindowScroll
              touchEnabled={mobile ? true : false}
              dragEnabled={mobile ? true : false}
            // style={{ position: "relative" }}
            >
              <Slider
                onMouseDown={(e) => mouseDownCoords(e)}
                onMouseUp={(e) => clickOrDrag(e)}
              >
                {images.map((image, pos) => {
                  return (
                    <Slide
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
                        src={mainImage}
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
                  style={{ marginTop: "5px" }}
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
