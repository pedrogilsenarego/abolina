import { useMediaQuery, useTheme } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "../../../../slicer/books/books.types";
import { State } from "../../../../slicer/types";

const useAbsoluteCarousel = () => {
  const [current, setCurrent] = useState<number>(0);
  const itemsCarousel = useSelector<State, Carousel[]>(
    (state) => state.books.carroussell || []
  );
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));

  const getPositionValue = (position: string) => {
    switch (position) {
      case "central":
      case "back":
        return 0;
      case "left":
        return "80%";
      case "furtherLeft":
        return "200%";
      case "right":
        return "-80%";
      case "furtherRight":
        return "-200%";
      default:
        return 0;
    }
  };

  // Define the positions
  const positions = [
    "central",
    "right",
    "furtherRight",
    "back",
    "left",
    "furtherLeft",
  ];

  // Generate the slides array with the positions
  const slides = itemsCarousel.map((item, index) => {
    const position = positions[index % positions.length];
    return { ...item, position };
  });

  // If there are less than 6 items, fill the rest with repeated items
  if (slides.length < 6) {
    const repeatedSlides = slides
      .slice(0, 6 - slides.length)
      .map((item, index) => {
        const position = positions[slides.length + index];
        return { ...item, position };
      });
    slides.push(...repeatedSlides);
  }

  // Set "left" position for the last item
  if (slides.length >= 1) {
    slides[slides.length - 1].position = "left";
  }

  // Set "furtherLeft" position for the second-to-last item
  if (slides.length >= 2) {
    slides[slides.length - 2].position = "furtherLeft";
  }

  return {
    slides,
    current,
    mobile,
    getPositionValue,
  };
};

export default useAbsoluteCarousel;
