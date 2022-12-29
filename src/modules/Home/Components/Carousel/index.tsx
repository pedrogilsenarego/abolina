import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../slicer/types";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Colors } from "../../../../constants/pallette";
import Image from "./Components/Image";
import DotGroups from "./Components/DotGroups";

const Carousel = () => {
  const images = useSelector<State, string[]>(
    (state) => state.books.carroussell || []
  );
  const [current, setCurrent] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(
    images.length % 2 === 0 ? 36 : 0
  );
  const [slider, setSlider] = useState<any>([]);
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));

  const slides = [images[images.length - 1], ...images, images[0]];

  const value = images.length % 2 === 0 ? 108 : 72;

  useEffect(() => {
    setSlider(slides);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMove = (direction: "left" | "right") => {
    if (direction === "left") {
      setTranslateX(value * (current - 1));
      setCurrent((prev) => --prev);

      return;
    }

    setTranslateX(value * (current + 1));
    setCurrent((prev) => ++prev);
    // const newSlider = [...slider]

    // newSlider.push(images[0])
    // newSlider.shift()
    // setSlider(newSlider)






    return;
  };

  console.log(slider)

  return (
    <>
      <div
        style={{
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        <Box
          display='flex'
          justifyContent='space-between'
          style={{
            width: "90vw",
            position: "absolute",
            left: "5vw",

            bottom: "45%",
            zIndex: 1000,
          }}
        >
          <FiChevronLeft
            size='3em'
            // color={
            //   current >= Math.floor(-slider.length / 2) + 2
            //     ? Colors.tealc
            //     : "transparent"
            // }
            color={Colors.tealc}
            style={{ cursor: "pointer" }}
            // onClick={() =>
            //   current >= Math.floor(-slider.length / 2) + 2
            //     ? handleMove("left")
            //     : null
            // }
            onClick={() => handleMove("left")}
          />
          {/* {current < Math.floor(slider.length / 2) && ( */}
          <FiChevronRight
            size='3em'
            color={Colors.tealc}
            style={{ cursor: "pointer" }}
            onClick={() => handleMove("right")}
          />
          {/* )} */}
        </Box>
        <Box
          display='flex'
          columnGap='10vw'
          justifyContent='center'
          style={{
            height: "45vh",
            transition: "all 1s ease-in-out",
            transform: `translateX(${-translateX}vw)`,
          }}
        >
          {slider.map((item: any, pos: number) =>
            <Image key={pos} item={item} pos={pos} mobile={mobile} />

          )}
        </Box>
      </div>
      <>
        <Box
          display='flex'
          justifyContent='center'
          style={{ marginTop: "35px" }}
        >
          <DotGroups
            numberDots={images.length}
            index={current}
            setIndex={setCurrent}
          />
        </Box>
      </>
    </>
  );
};

export default Carousel;
