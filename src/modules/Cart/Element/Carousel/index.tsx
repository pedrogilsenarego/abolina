import { Typography } from "@mui/material";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import { useRef } from "react";
import Incrementor from "../../../../components/Incrementor";
import { CartProduct } from "../../../../slicer/cart/cart.types";

interface Props {
  item: CartProduct;
  price: number;
  handleUpdateSubtotal: (price: number) => void;
  sliderPosition: any;
  setSliderPosition: any;
}

const Carousel = ({
  item,
  price,
  handleUpdateSubtotal,
  sliderPosition,
  setSliderPosition,
}: Props) => {
  return (
    <CarouselProvider
      naturalSlideHeight={100}
      naturalSlideWidth={150}
      totalSlides={2}
      currentSlide={sliderPosition}
      touchEnabled={false}
    >
      <Slider style={{ height: "100%", width: "59vw" }}>
        <Slide index={0}>
          <div>
            <Typography style={{ fontSize: 18, fontWeight: "bold" }}>
              {item.product.title}
            </Typography>
            <Typography>{item.product.collections}</Typography>
            <Typography>Nº{item.product.number}</Typography>
          </div>
        </Slide>
        <Slide index={1}>
          {" "}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            <Typography>€{price}</Typography>

            <Incrementor
              key={item.product.documentID}
              initialValue={item.value}
              updateValue={handleUpdateSubtotal}
            />

            <Typography>€{(item.value * price).toFixed(2)}</Typography>
          </div>
        </Slide>
      </Slider>
    </CarouselProvider>
  );
};

export default Carousel;
