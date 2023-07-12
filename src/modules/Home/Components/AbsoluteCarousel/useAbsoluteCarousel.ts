import { useMediaQuery, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Carousel } from "../../../../slicer/books/books.types";
import { State } from "../../../../slicer/types";

const useAbsoluteCarousel = () => {
  const [slides, setSlides] = useState<any[]>([]);
  const itemsCarousel = useSelector<State, Carousel[]>(
    (state) => state.books.carroussell || []
  );
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));

  const getTranslateX = (position: string) => {
    switch (position) {
      case "central":
      case "back":
        return 0;
      case "left":
        return -60;
      case "furtherLeft":
        return -150;
      case "right":
        return 60;
      case "furtherRight":
        return 150;
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

  useEffect(() => {
    // Generate the slides array with the positions
    const slidesT = itemsCarousel.map((item, index) => {
      const position = positions[index % positions.length];
      return { ...item, position };
    });

    // If there are less than 6 items, fill the rest with repeated items
    if (slidesT.length < 6) {
      const repeatedSlides = slidesT
        .slice(0, 6 - slidesT.length)
        .map((item, index) => {
          const position = positions[slidesT.length + index];
          return { ...item, position };
        });
      slidesT.push(...repeatedSlides);
    }

    // Set "left" position for the last item
    if (slidesT.length >= 1) {
      slidesT[slidesT.length - 1].position = "left";
    }

    // Set "furtherLeft" position for the second-to-last item
    if (slidesT.length >= 2) {
      slidesT[slidesT.length - 2].position = "furtherLeft";
    }

    setSlides(slidesT);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMove = (direction: "left" | "right") => {
    if (direction === "left") {
      const updatedSlides = slides.map((slide) => {
        switch (slide.position) {
          case "central":
            return { ...slide, position: "right" };
          case "right":
            return { ...slide, position: "furtherRight" };
          case "furtherRight":
            return { ...slide, position: "back" };
          case "left":
            return { ...slide, position: "central" };
          case "furtherLeft":
            return { ...slide, position: "left" };
          default:
            return slide;
        }
      });

      setSlides(updatedSlides);
    }
    if (direction === "right") {
      const updatedSlides = slides.map((slide) => {
        switch (slide.position) {
          case "central":
            return { ...slide, position: "left" };
          case "left":
            return { ...slide, position: "furtherLeft" };
          case "furtherLeft":
            return { ...slide, position: "back" };
          case "right":
            return { ...slide, position: "central" };
          case "furtherRight":
            return { ...slide, position: "right" };
          default:
            return slide;
        }
      });

      setSlides(updatedSlides);
    }
  };

  return {
    slides,

    mobile,
    getTranslateX,

    handleMove,
  };
};

export default useAbsoluteCarousel;
