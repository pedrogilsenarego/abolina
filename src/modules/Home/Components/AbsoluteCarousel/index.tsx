import { Box } from "@mui/material";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Colors } from "../../../../constants/pallette";
import DotGroups from "./Components/DotGroups";
import Image from "./Components/Image";
import useAbsoluteCarousel from "./useAbsoluteCarousel";

interface IProps {
  height?: string;
  automaticSlide?: number;
  mobile?: boolean;
  width?: string;
}

const AbsoluteCarousel = ({
  height = "300px",
  mobile = false,
  width = "55vw",
  automaticSlide,
}: IProps) => {
  const {
    slides,
    getTranslateX,
    handleMiniIndex,
    handleCallMove,
    miniIndex,
    setMousehover,
    initialCount,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
    handleClickMainImage,
  } = useAbsoluteCarousel({ automaticSlide, mobile });
  console.log(slides);

  return (
    <div style={{ position: "relative" }}>
      <div
        onMouseEnter={() => setMousehover(true)}
        onMouseLeave={() => setMousehover(false)}
        style={{
          overflow: !mobile ? "inherit" : "hidden",
          height: height,
          position: "relative",
        }}
      >
        {!mobile && (
          <>
            {slides.length > 1 && (
              <Box
                display="flex"
                justifyContent="space-between"
                style={{
                  pointerEvents: "none",
                  width: "100vw",
                  position: "absolute",
                  left: 0,
                  bottom: 0,
                  zIndex: 1000,
                }}
              >
                <div
                  onClick={() => handleCallMove("left")}
                  style={{
                    width: "250px",
                    height: height,

                    cursor: "pointer",
                    pointerEvents: "all",
                  }}
                />

                <div
                  onClick={() => handleCallMove("right")}
                  style={{
                    pointerEvents: "all",
                    width: "250px",
                    height: height,

                    cursor: "pointer",
                  }}
                />
              </Box>
            )}
            {slides.length > 1 && (
              <Box
                display="flex"
                justifyContent="space-between"
                style={{
                  pointerEvents: "none",
                  width: "62vw",
                  position: "absolute",
                  left: "19vw",
                  bottom: "42%",
                  zIndex: 500,
                }}
              >
                <FiChevronLeft
                  size="3rem"
                  color={Colors.tealc}
                  style={{ cursor: "pointer", pointerEvents: "all" }}
                  onClick={() => handleCallMove("left")}
                />

                <FiChevronRight
                  size="3rem"
                  color={Colors.tealc}
                  style={{ cursor: "pointer", pointerEvents: "all" }}
                  onClick={() => handleCallMove("right")}
                />
              </Box>
            )}
          </>
        )}

        {slides.map((slide, pos) => {
          const { position } = slide.position;
          return (
            <div
              onTouchStart={!mobile ? undefined : handleTouchStart}
              onTouchMove={!mobile ? undefined : handleTouchMove}
              onTouchEnd={!mobile ? undefined : handleTouchEnd}
              key={pos}
              style={{
                height: "100%",
                transition: "all 1s ease-in-out",
                position: "absolute",
                zIndex:
                  position === "back" ? -10 : position === "central" ? 10 : 5,
                willChange: "transform opacity zIndex",
                opacity:
                  position === "central" ? 1 : position === "back" ? 0 : 0.5,
                left: 0,
                right: 0,
                transform: `translateX(${getTranslateX(position)}vw)`,
              }}
            >
              <Image
                position={position}
                mobile={mobile}
                onClick={
                  position === "central"
                    ? () => handleClickMainImage(slide.link)
                    : undefined
                }
                key={pos}
                width={width}
                item={slide.image}
                pos={pos}
              />
            </div>
          );
        })}
      </div>

      <Box
        display="flex"
        justifyContent="center"
        style={{
          marginTop: mobile ? "10px" : "35px",
          zIndex: 200,
          position: "relative",
        }}
      >
        <DotGroups
          numberDots={initialCount}
          index={miniIndex}
          setIndex={handleMiniIndex}
        />
      </Box>
      <div
        style={{
          top: 0,
          position: "absolute",
          width: "100%",
          height: "100%",
          backgroundColor: "white",
          zIndex: 2,
        }}
      />
    </div>
  );
};

export default AbsoluteCarousel;
