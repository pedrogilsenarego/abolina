import { useEffect, useMemo, useState, useRef, useLayoutEffect } from "react";
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
  const containerRef = useRef<any>()

  const slides = useMemo(() => {
    if (images.length > 1) {
      const items = images.map((child, pos) => (
        <img
          style={{ width: "62vw", objectFit: "cover" }}
          key={pos}
          src={child}
          alt={child}
        />
      ));

      return [
        <img
          style={{ width: "62vw", objectFit: "cover" }}
          key={images.length + 1}
          src={images[images.length - 1]}
          alt={images[images.length - 1]}
        />,
        ...items,
        <img
          style={{ width: "62vw", objectFit: "cover" }}
          key={images.length + 2}
          src={images[0]}
          alt={images[0]}
        />,
      ];
    }

    return <li>{images[0]}</li>;
  }, [images]);

  const handleMove = (direction: "left" | "right") => {

    if (direction === "left") {
      setTranslateX(72 * (current - 1));
      setCurrent((prev) => --prev)

      return
    }



    setTranslateX(72 * (current + 1));
    setCurrent((prev) => ++prev)
    return

  };

  // useEffect(() => {
  //   const transitionEnd = () => {
  //     if (current <= 1) {
  //       containerRef.current.style.transition = "all 0s ease-in-out"
  //       setTranslateX(72 * current)
  //     }
  //     if (current >= images.length) {
  //       containerRef.current.style.transition = "all 0s ease-in-out"
  //       setTranslateX(72 * images.length)
  //     }

  //   }

  //   document.addEventListener("transitionend", transitionEnd)

  //   return () => {
  //     document.removeEventListener("transitionend", transitionEnd)
  //   }

  // }, [current, images])



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
          ref={containerRef}
          display='flex'
          columnGap='10vw'
          justifyContent='center'
          style={{
            height: "45vh",
            transition: "all 1s ease-in-out",
            transform: `translateX(${-translateX}vw)`,
          }}
        >
          {slides}
        </Box>
      </div>
    </>
  );
};

export default Carousel;
