import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { State } from "../../../../slicer/types";
import { Box } from "@mui/material";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Colors } from "../../../../constants/pallette";

const Carousel = () => {
  const images = useSelector<State, string[]>(
    (state) => state.books.carroussell || []
  );
  const [current, setCurrent] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(0);
  const [slider, setSlider] = useState<any>([]);

  const slides = [...images];

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    setSlider(slides);
  }, []);


  const handleMove = (direction: "left" | "right") => {
    if (direction === "left") {
      setTranslateX(72 * (current - 1));
      setCurrent((prev) => --prev);

      return;
    }

    setTranslateX(72 * (current + 1));
    setCurrent((prev) => ++prev);
    // const newArray = [...slider];
    // newArray.shift();
    // newArray.push(images[0]);
    // setTimeout(() => {
    //   setSlider(newArray);
    // }, 1000);

    return;
  };

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
            color={(current >= (Math.floor(-slider.length / 2) + 2)) ? Colors.tealc : "transparent"}
            style={{ cursor: "pointer" }}
            onClick={() => (current >= (Math.floor(-slider.length / 2) + 2)) ? handleMove("left") : null}
          />
          {current < Math.floor(slider.length / 2) && (
            <FiChevronRight
              size='3em'
              color={Colors.tealc}
              style={{ cursor: "pointer" }}
              onClick={() => handleMove("right")}
            />
          )}
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
          {slider.map((item: any, pos: number) => {
            return (
              <img
                style={{ width: "62vw", objectFit: "cover" }}
                key={pos}
                src={item}
                alt={item}
              />
            );
          })}
        </Box>
      </div>
    </>
  );
};

export default Carousel;
