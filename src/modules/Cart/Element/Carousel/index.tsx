import { Typography } from "@mui/material";
import { CarouselProvider, Slide, Slider } from "pure-react-carousel";
import "pure-react-carousel/dist/react-carousel.es.css";
import Incrementor from "../../../../components/Incrementor";
import { Pallette } from "../../../../constants/pallette";
import { CartProduct } from "../../../../slicer/cart/cart.types";
import { i18n } from "../../../../translations/i18n";

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
            <Typography style={{ fontSize: 14, fontWeight: "bold" }}>
              {item.product.title}
            </Typography>
            <Typography fontSize="12px">{item.product.collections}</Typography>
            <Typography fontSize="12px">Nº{item.product.number}</Typography>
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

                columnGap: "20px",
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
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  columnGap: "5px",
                  position: "absolute",

                  right: "5px",
                  bottom: "15px",
                }}
              >
                <Typography style={{ fontSize: "12px" }}>
                  {forOffer ? item.value : item.value - 1}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Typography color={Pallette.primary} fontSize="12px">
                    {i18n.t("modules.cart.table.offer")}
                  </Typography>
                </div>
              </div>
            )}
          </div>
        </Slide>
      </Slider>
    </CarouselProvider>
  );
};

export default Carousel;
