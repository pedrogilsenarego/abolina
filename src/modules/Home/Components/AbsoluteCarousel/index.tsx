import { Box } from "@mui/material";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Colors } from "../../../../constants/pallette";
import Image from "./Components/Image";
import useAbsoluteCarousel from "./useAbsoluteCarousel";

const AbsoluteCarousel = () => {
  const { slides, mobile, getTranslateX, handleMove } = useAbsoluteCarousel();
  console.log(slides);

  return (
    <div
      style={{
        height: "300px",
        position: "relative",
      }}
    >
      {slides.length > 1 && (
        <Box
          display="flex"
          justifyContent="space-between"
          style={{
            pointerEvents: "none",
            width: "62vw",
            position: "absolute",
            left: "19vw",
            bottom: "45%",
            zIndex: 500,
          }}
        >
          <FiChevronLeft
            size="3rem"
            color={Colors.tealc}
            style={{ cursor: "pointer", pointerEvents: "all" }}
            onClick={() => handleMove("left")}
          />

          <FiChevronRight
            size="3rem"
            color={Colors.tealc}
            style={{ cursor: "pointer", pointerEvents: "all" }}
            onClick={() => handleMove("right")}
          />
        </Box>
      )}
      {slides.map((slide, pos) => {
        return (
          <div
            style={{
              transition: "all 1s ease-in-out",
              position: "absolute",
              zIndex:
                slide.position === "back"
                  ? -10
                  : slide.position === "central"
                  ? 10
                  : 5,
              willChange: "transform opacity zIndex", // Add this property
              opacity:
                slide.position === "central"
                  ? 1
                  : slide.position === "back"
                  ? 0
                  : 0.5,
              left: 0,
              right: 0,
              transform: `translateX(${getTranslateX(slide.position)}vw)`,
            }}
          >
            <Image
              position={slide.position}
              mobile={mobile}
              key={pos}
              item={slide.image}
              pos={pos}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AbsoluteCarousel;
