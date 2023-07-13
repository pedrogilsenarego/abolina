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
  const [canMove, setCanMove] = useState<boolean>(true);

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

  useEffect(() => {
    const positions = [
      { position: "central", value: null },
      { position: "right", value: null },
      { position: "furtherRight", value: null },
      { position: "back", value: 0 },
      { position: "furtherLeft", value: null },
      { position: "left", value: null },
    ];

    const initialCount = itemsCarousel.length;
    // if it is only one slide or none
    if (initialCount <= 1) {
      const slidesT = itemsCarousel.map((item) => {
        const position = positions[0];
        return { ...item, position };
      });
      setSlides(slidesT);
      return;
    }
    // Multiply the slides when needed
    const finalSlides =
      initialCount >= 6
        ? itemsCarousel
        : initialCount <= 2
        ? [...itemsCarousel, ...itemsCarousel, ...itemsCarousel]
        : [...itemsCarousel, ...itemsCarousel];

    // Find the index of "back" in the positions array
    const insertionIndex = positions.findIndex(
      (pos) => pos.position === "back"
    );

    // Determine the number of additional "back" elements to add
    const excedentSlides = finalSlides.length - 6;

    // Generate the additional "back" elements with incremental values for "value"

    const additionalBackElements = Array(excedentSlides)
      .fill(null)
      .map((_, index) => ({
        position: "back",
        value: index + 1,
      }));

    // Insert the additional "back" elements into the positions array
    positions.splice(insertionIndex + 1, 0, ...additionalBackElements);

    const slidesT = finalSlides.map((item, index) => {
      const position = positions[index];
      return { ...item, position };
    });

    setSlides(slidesT);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleMove = (direction: "left" | "right") => {
    if (!canMove) {
      return;
    }
    setCanMove(false);
    if (direction === "left") {
      const updatedSlides = slides.map((slide, index, array) => {
        const excedentSlides = array.length - 6;
        switch (slide.position.position) {
          case "back":
            if (slide.position.value === excedentSlides) {
              return {
                ...slide,
                position: { position: "furtherLeft", value: null },
              };
            }
            return {
              ...slide,
              position: {
                position: "back",
                value: slide.position.value + 1,
              },
            };
          case "central":
            return { ...slide, position: { position: "right", value: null } };
          case "right":
            return {
              ...slide,
              position: { position: "furtherRight", value: null },
            };
          case "furtherRight":
            return { ...slide, position: { position: "back", value: 0 } };
          case "left":
            return { ...slide, position: { position: "central", value: null } };
          case "furtherLeft":
            return { ...slide, position: { position: "left", value: null } };
          default:
            return slide;
        }
      });
      setSlides(updatedSlides);
    }
    if (direction === "right") {
      const updatedSlides = slides.map((slide, index, array) => {
        const excedentSlides = array.length - 6;
        switch (slide.position.position) {
          case "back":
            if (slide.position.value === 0) {
              return {
                ...slide,
                position: { position: "furtherRight", value: null },
              };
            }
            return {
              ...slide,
              position: {
                position: "back",
                value: slide.position.value - 1,
              },
            };
          case "central":
            return { ...slide, position: { position: "left", value: null } };
          case "left":
            return {
              ...slide,
              position: { position: "furtherLeft", value: null },
            };
          case "furtherLeft":
            return {
              ...slide,
              position: { position: "back", value: excedentSlides },
            };
          case "right":
            return { ...slide, position: { position: "central", value: null } };
          case "furtherRight":
            return { ...slide, position: { position: "right", value: null } };
          default:
            return slide;
        }
      });
      setSlides(updatedSlides);
    }
    setTimeout(() => {
      setCanMove(true);
    }, 1000);
  };

  return {
    slides,

    mobile,
    getTranslateX,

    handleMove,
  };
};

export default useAbsoluteCarousel;
