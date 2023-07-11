import Image from "./Components/Image";
import useAbsoluteCarousel from "./useAbsoluteCarousel";

const AbsoluteCarousel = () => {
  const { slides, current, mobile, getPositionValue } = useAbsoluteCarousel();
  console.log(slides);

  return (
    <div style={{ height: "300px", position: "relative" }}>
      {slides.map((slide, pos) => {
        return (
          <div
            style={{
              position: "absolute",
              zIndex: slide.position === "back" ? -10 : 1,
              opacity:
                slide.position === "central"
                  ? 1
                  : slide.position === "back"
                  ? 0
                  : 0.5,
              left: getPositionValue(slide.position),
              right: getPositionValue(slide.position),
            }}
          >
            <Image
              mobile={mobile}
              current={current}
              key={pos}
              item={slide.image}
              pos={pos}
            />
          </div>
        );
      })}
    </div>
  );
};

export default AbsoluteCarousel;
