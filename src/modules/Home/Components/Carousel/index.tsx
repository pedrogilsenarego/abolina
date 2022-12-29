import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../../slicer/types";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Colors } from "../../../../constants/pallette";
import Image from "./Components/Image";
import DotGroups from "./Components/DotGroups";
import { fetchCarroussell } from "../../../../slicer/books/books.actions";

const Carousel = () => {

  const images = useSelector<State, string[]>(
    (state) => state.books.carroussell || []
  );
  const value = 72;
  const initialTranslateXValue = ((images.length / 2 * value) - value / 2) * -1

  const [current, setCurrent] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(initialTranslateXValue);
  const [slider, setSlider] = useState<any>([]);
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  const dispatch = useDispatch()

  const slides = [images[images.length - 1], ...images, images[0]];



  useEffect(() => {
    setSlider(slides);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    dispatch(fetchCarroussell());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMove = (direction: "left" | "right") => {
    if (direction === "left") {
      if (current <= 0) {

        setTranslateX(translateX + value * (images.length - 1))
        setCurrent(images.length - 1)
      } else {
        setTranslateX(translateX - value);
        setCurrent(current - 1);
      }
      return;
    }

    if (current >= images.length - 1) {
      setTranslateX(initialTranslateXValue);
      setCurrent(0);
    } else {
      setTranslateX(translateX + value);
      setCurrent((prev) => ++prev);
    }
    return;
  };

  // useEffect(() => {
  //   setTimeout(() => {
  //     handleMove("right")
  //   }, 10000)
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [current])

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
