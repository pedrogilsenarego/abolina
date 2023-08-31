import { Typography } from "@mui/material";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Incrementor from "../../../../components/Incrementor";
import { CartProduct } from "../../../../slicer/cart/cart.types";
import Offer from "../Offer";
import ReadOnApp from "../ReadOnApp";

interface Props {
  item: CartProduct;
  price: number;
  handleUpdateSubtotal: (price: number) => void;
  sliderPosition: any;
  setSliderPosition: any;
  forOffer: boolean;
}

const Carousel = ({
  item,
  price,
  forOffer,
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
      <Slider style={{ height: "auto", width: "59vw" }}>
        <Slide index={0}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",

              height: "100%",

              justifyContent: "center",
            }}
          >
            <Typography
              style={{ fontSize: 14, fontWeight: "bold", lineHeight: "14px" }}
            >
              {item.product.title}
            </Typography>
            <Typography style={{ lineHeight: "14px" }} fontSize="12px">
              {item.product.collections}
            </Typography>
            <Typography style={{ lineHeight: "14px" }} fontSize="12px">
              Nº{item.product.number}
            </Typography>
            <ReadOnApp />
          </div>
        </Slide>
        <Slide index={1} style={{}}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",

              height: "100%",
              position: "relative",
              justifyContent: "center",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",

                columnGap: "22px",
              }}
            >
              <Typography>€{price}</Typography>

              <Incrementor
                key={item.product.documentID}
                initialValue={item.value}
                updateValue={handleUpdateSubtotal}
              />

              <Typography>€{(item.value * price).toFixed(1)}</Typography>
            </div>
            {(item?.value > 1 || forOffer) && (
              <Offer value={item.value} forOffer={forOffer} />
            )}
          </div>
        </Slide>
      </Slider>
    </CarouselProvider>
  );
};

export default Carousel;
