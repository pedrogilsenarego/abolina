import Zoom from "react-img-zoom";

const ZoomC = ({ image, width, height }) => {
  return (
    <>
      <Zoom
        img={image}
        zoomScale={3}
        width={width || 600}
        height={height || 600}
      />
    </>
  );
};

export default ZoomC;
