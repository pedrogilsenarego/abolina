import Zoom from "react-img-zoom";

const ZoomC = ({ image, width, height, zoomScale }) => {
  return (
    <>
      <Zoom
        img={image}
        zoomScale={zoomScale || 3}
        width={width || 600}
        height={height || 600}
      />
    </>
  );
};

export default ZoomC;
