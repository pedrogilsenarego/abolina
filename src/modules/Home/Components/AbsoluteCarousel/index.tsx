import Image from "./Components/Image";
import useAbsoluteCarousel from "./useAbsoluteCarousel";

const AbsoluteCarousel = () => {
  const { slides, current, mobile } = useAbsoluteCarousel();
  console.log(current);

  return (
    <div style={{ height: "300px", position: "relative" }}>
      {slides.map((slide, pos) => {
        return (
          <div
            style={{
              position: "absolute",
              zIndex: current > pos - 2 ? 1 : 0,
              opacity: current > pos - 2 ? 1 : 0,
              left: current === pos ? 0 : current === pos - 1 ? "80%" : 0,
              right: current === pos ? 0 : current === pos - 1 ? "50%" : 0,
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
