import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../../../constants/routes";
import { Carousel } from "../../../../slicer/books/books.types";
import { State } from "../../../../slicer/types";

interface IProps {
  automaticSlide: number | undefined;
  mobile: boolean;
}

const useAbsoluteCarousel = ({ automaticSlide, mobile }: IProps) => {
  const [slides, setSlides] = useState<any[]>([]);
  const [miniIndex, setMiniIndex] = useState<number>(0);
  const [mouseHover, setMousehover] = useState(false);
  const [canMove, setCanMove] = useState<boolean>(true);
  const [startX, setStartX] = useState(0);
  const [isMoving, setIsMoving] = useState(false);
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null);
  const itemsCarousel = useSelector<State, Carousel[]>(
    (state) => state.books.carroussell || []
  );

  const navigate = useNavigate();

  const initialCount = itemsCarousel.length;

  const getTranslateX = (position: string) => {
    switch (position) {
      case "central":
      case "back":
        return 0;
      case "left":
        return mobile ? -110 : -60;
      case "furtherLeft":
        return mobile ? -200 : -150;
      case "right":
        return mobile ? 110 : 60;
      case "furtherRight":
        return mobile ? 200 : 150;
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
  }, [itemsCarousel]);

  const updateMiniIndex = (direction: "right" | "left") => {
    setMiniIndex((prevMiniIndex) => {
      if (direction === "right") {
        return prevMiniIndex < initialCount - 1 ? prevMiniIndex + 1 : 0;
      }
      if (direction === "left") {
        return prevMiniIndex === 0 ? initialCount - 1 : prevMiniIndex - 1;
      }
      return prevMiniIndex;
    });
  };

  const handleMove = (direction: "left" | "right") => {
    updateMiniIndex(direction);
    if (direction === "left") {
      setSlides((prevSlides) => {
        return prevSlides.map((slide, index, array) => {
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
              return {
                ...slide,
                position: { position: "central", value: null },
              };
            case "furtherLeft":
              return { ...slide, position: { position: "left", value: null } };
            default:
              return slide;
          }
        });
      });
    }
    if (direction === "right") {
      setSlides((prevSlides) => {
        return prevSlides.map((slide, index, array) => {
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
              return {
                ...slide,
                position: { position: "central", value: null },
              };
            case "furtherRight":
              return { ...slide, position: { position: "right", value: null } };
            default:
              return slide;
          }
        });
      });
    }
  };

  const handleMiniIndex = (newIndex: number) => {
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear the timeout if it's already set
    }
    const direction = newIndex - miniIndex > 0 ? "right" : "left";
    const numberOfMoves = Math.abs(newIndex - miniIndex);

    const handleMoveRecursively = (movesLeft: number) => {
      if (movesLeft <= 0) {
        return;
      }

      handleMove(direction);
      const id = setTimeout(() => {
        handleMoveRecursively(movesLeft - 1);
      }, 1000);
      setTimeoutId(id); // Store the new timeout ID
    };

    if (numberOfMoves <= 1) {
      handleMove(direction);
    } else {
      handleMoveRecursively(numberOfMoves);
    }
  };

  const handleCallMove = (position: "left" | "right") => {
    if (!canMove) {
      return;
    }
    if (timeoutId) {
      clearTimeout(timeoutId); // Clear the timeout if it's already set
    }
    setCanMove(false);

    handleMove(position);
    const id = setTimeout(() => {
      setCanMove(true);
    }, 1000);
    setTimeoutId(id); // Store the new timeout ID
  };

  useEffect(() => {
    if (!automaticSlide) return;
    const timeoutId = setTimeout(() => {
      if (!mouseHover) handleMove("right");
    }, automaticSlide);
    return () => clearTimeout(timeoutId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slides, mouseHover]);

  const handleTouchStart = (event: React.TouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];

    setStartX(touch.clientX);
    setIsMoving(true);
  };

  const handleTouchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    if (!isMoving) return;

    const touch = event.touches[0];
    const diff = touch.clientX - startX;

    const threshold = 80;
    if (diff < -threshold) {
      handleCallMove("right");
      setIsMoving(false);
    } else if (diff > threshold) {
      handleCallMove("left");
      setIsMoving(false);
    }
  };

  const handleTouchEnd = () => {
    setIsMoving(false);
  };

  const handleClickMainImage = (link: string) => {
    navigate(ROUTE_PATHS.BOOKS_BOOK.replace(":id", link));
  };

  return {
    slides,
    initialCount,
    handleMiniIndex,
    handleClickMainImage,
    getTranslateX,
    miniIndex,
    setMousehover,
    setMiniIndex,
    handleCallMove,
    handleTouchEnd,
    handleTouchMove,
    handleTouchStart,
  };
};

export default useAbsoluteCarousel;
