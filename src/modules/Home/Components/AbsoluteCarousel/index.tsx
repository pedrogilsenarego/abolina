import { Box } from "@mui/material";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Colors } from "../../../../constants/pallette";
import Image from "./Components/Image";
import useAbsoluteCarousel from "./useAbsoluteCarousel";

interface IProps {
  height?: string;
}

const AbsoluteCarousel = ({ height = "300px" }: IProps) => {
  const { slides, mobile, getTranslateX, handleMove } = useAbsoluteCarousel();
  console.log(slides);

  return (
    <div
      style={{
        height: height,
        position: "relative",
      }}
    >
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
            onClick={() => handleMove("left")}
            style={{
              width: "250px",
              height: height,

              cursor: "pointer",
              pointerEvents: "all",
            }}
          />

          <div
            onClick={() => handleMove("right")}
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
        const { position } = slide.position;
        return (
          <div
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
