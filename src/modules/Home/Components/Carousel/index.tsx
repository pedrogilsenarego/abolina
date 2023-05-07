import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { State } from "../../../../slicer/types";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { Colors } from "../../../../constants/pallette";
import Image from "./Components/Image";
import DotGroups from "./Components/DotGroups";
import { fetchCarroussell } from "../../../../slicer/books/books.actions";
import { Carousel } from "../../../../slicer/books/books.types";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../../constants/routes";

import image1 from "../../../../assets/images/1_xfn4yn.webp"
import image2 from "../../../../assets/images/1-1_edzth5.webp"
import image3 from "../../../../assets/images/1-2_i4s044.webp"


const CarouselL = () => {
  // const itemsCarousel = useSelector<State, Carousel[]>(
  //   (state) => state.books.carroussell || []
  // );
  const itemsCarousel = [
    {
      image: image1,
      link: ""
    },
    {
      image: image2,
      link: ""
    },
    {
      image: image3,
      link: ""
    }
  ]
  const value = 60;
  const initialTranslateXValue =
    ((itemsCarousel.length / 2) * value - value / 2) * -1;
  const [mouseHover, setMousehover] = useState(false);
  const [current, setCurrent] = useState<number>(0);
  const [miniIndex, setMiniIndex] = useState<number>(0);
  const [translateX, setTranslateX] = useState<number>(initialTranslateXValue);
  const [slider, setSlider] = useState<Carousel[]>([]);
  const [absoluteCurrent, setAbsoluteCurrent] = useState<number>(0);
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const slides =
    itemsCarousel.length > 1
      ? [
        itemsCarousel[itemsCarousel.length - 1],
        ...itemsCarousel,
        itemsCarousel[0],
      ]
      : [...itemsCarousel];

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
      setTranslateX(translateX - value);
      if (current < 1) {
        setCurrent(itemsCarousel.length - 1);
        setMiniIndex(itemsCarousel.length - 1);
      } else {
        setCurrent((prev) => --prev);
        setMiniIndex((prev) => --prev);
      }
      setAbsoluteCurrent((prev) => --prev)

      const newSlider = [...slider];
      const nextIndex =
        current - itemsCarousel.length - 1 > 0 ? current + 1 : current; // Calculate the index of the next element from itemsCarousel using modulo

      setSlider([
        itemsCarousel[nextIndex],
        ...newSlider,
        itemsCarousel[nextIndex],
      ]);

      return;
    }

    setTranslateX(translateX + value); // Change the sign of value to move items to the left
    if (current < itemsCarousel.length - 1) {
      setCurrent((prev) => ++prev);
      setMiniIndex((prev) => ++prev);
    } else {
      setCurrent(0);
      setMiniIndex(0);
    }
    setAbsoluteCurrent((prev) => ++prev)

    const newSlider = [...slider];
    const nextIndex =
      current - itemsCarousel.length - 1 > 0 ? current + 1 : current; // Calculate the index of the next element from itemsCarousel using modulo

    setSlider([
      itemsCarousel[nextIndex],
      ...newSlider,
      itemsCarousel[nextIndex],
    ]);

    return;
  };

  // useEffect(() => {
  //   if (miniIndex !== current) {
  //     setTranslateX(translateX + value * (current - miniIndex) * -1);
  //     setCurrent(miniIndex);
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [miniIndex]);

  // useEffect(() => {
  //   const timeoutId = setTimeout(() => {
  //     if (!mouseHover) handleMove("right");
  //   }, 4000);
  //   return () => clearTimeout(timeoutId);
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [current, mouseHover]);

  function setVw() {
    let vw = document.documentElement.clientWidth / 100;
    document.documentElement.style.setProperty("--vw", `${vw}px`);
  }

  setVw();
  window.addEventListener("resize", setVw);

  const handleClickImage = (pos: number) => {
    console.log(pos / 2, absoluteCurrent)
    if (pos % 2 !== 0)
      navigate(
        ROUTE_PATHS.BOOKS_BOOK.replace(":id", itemsCarousel[pos - 1].link)
      );
    if (pos / 2 - 1 > absoluteCurrent) handleMove("right");
    if (pos / 2 - 1 < absoluteCurrent) handleMove("left");
  };

  return (
    <>
      <div
        style={{
          width: "calc(var(--vw, 1vw) * 100)",
          display: "flex",
          justifyContent: "center",
          position: "relative",
        }}
      >
        {itemsCarousel.length > 1 && (
          <Box
            display='flex'
            justifyContent='space-between'
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
              size='3rem'
              color={Colors.tealc}
              style={{ cursor: "pointer", pointerEvents: "all" }}
              onClick={() => handleMove("left")}
            />

            <FiChevronRight
              size='3rem'
              color={Colors.tealc}
              style={{ cursor: "pointer", pointerEvents: "all" }}
              onClick={() => handleMove("right")}
            />
          </Box>
        )}
        <Box
          onMouseEnter={() => setMousehover(true)}
          onMouseLeave={() => setMousehover(false)}
          display='flex'
          columnGap='5vw'
          justifyContent='center'
          style={{
            //zIndex: 800,
            height: "40vh",
            transition: "all 1s ease-in-out",
            transform: `translateX(${-translateX}vw)`,
          }}
        >
          {slider.map((item: Carousel, pos: number) => (
            <Image
              onClick={handleClickImage}
              key={pos}
              item={item.image}
              pos={pos}
              mobile={mobile}
              current={current}
            />
          ))}
        </Box>
      </div>
      <>
        <Box
          display='flex'
          justifyContent='center'
          style={{ marginTop: "35px" }}
        >
          <DotGroups
            numberDots={itemsCarousel.length}
            index={miniIndex}
            setIndex={setMiniIndex}
          />
        </Box>
      </>
    </>
  );
};

export default CarouselL;
