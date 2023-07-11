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

  //the slides have to be at least 4 of them
  const slides = [...itemsCarousel];

  return {
    slides,
    current,
    mobile,
  };
};

export default useAbsoluteCarousel;
