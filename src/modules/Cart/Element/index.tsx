import {
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { CgSmartphone } from "react-icons/cg";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import Incrementor from "../../../components/Incrementor";
import CheckBox from "../../../components/Inputs/CheckBox";
import Tooltip from "../../../components/Tooltip/Tooltip";
import { Colors, Pallette } from "../../../constants/pallette";
import {
  deleteProductCart,
  onlyOfferToggle,
  updateCart,
} from "../../../slicer/cart/cart.actions";
import { CartProduct } from "../../../slicer/cart/cart.types";
import { State } from "../../../slicer/types";
import { CurrentUser } from "../../../slicer/user/user.types";
import { i18n } from "../../../translations/i18n";
import Carousel from "./Carousel";

interface Props {
  item: CartProduct;
  pos: number;
  sliderPosition?: 0 | 1 | undefined;
  setSliderPosition?: (sliderPosition: 0 | 1) => void | undefined;
}

const Element = ({ item, pos, sliderPosition, setSliderPosition }: Props) => {
  const [forOffer, setForOffer] = useState<boolean>(item?.onlyOffer || false);
  const [checkBoxDisabled, setCheckBoxDisabled] = useState<boolean>(false);
  const [numberOffer, setNumberOffer] = useState<number>(0);
  const dispatch = useDispatch();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const currentUser = useSelector<State, CurrentUser>(
    (state) => state.user.currentUser
  );
  const handleUpdateSubtotal = (value: number) => {
    if (value < numberOffer) setNumberOffer(value);
    dispatch(updateCart(value, item.product.documentID));
  };
  const handleDeleteCartProduct = () => {
    dispatch(deleteProductCart(item.product.documentID));
  };

  useEffect(() => {
    if (forOffer !== item?.onlyOffer)
      dispatch(onlyOfferToggle(item.product.documentID, forOffer));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forOffer]);

  useEffect(() => {
    if (currentUser?.booksOwned?.includes(item.product.documentID)) {
      setForOffer(true);
      setCheckBoxDisabled(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const price = !item?.product?.discount
    ? Number(item?.product?.price)
    : Number(
        (
          Number(item?.product.price) *
          (1 - item?.product?.discount / 100)
        ).toFixed(2)
      );

  const renderLaptop = () => {
    return (
      <Grid
        container
        key={pos}
        style={{
          paddingTop: "40px",
          paddingBottom: "40px",
          borderBottom: `solid 2px ${Colors.tealc}`,
        }}
      >
        <Grid
          item
          xs={1}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        ></Grid>
        <Grid
          item
          xs={5}
          style={{
            display: "flex",
            columnGap: "20px",
            alignItems: "start",
            height: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              rowGap: "20px",
              alignItems: "start",
              height: "100%",
              position: "relative",
            }}
          >
            <AiOutlineClose
              style={{
                cursor: "pointer",
                position: "absolute",
                top: "calc(50% - 48px)",
                left: "-70px",
              }}
              onClick={handleDeleteCartProduct}
              size="1.5rem"
              color={Colors.darkGrey}
            />
            <img
              style={{
                height: "200px",
                width: "200px",
                objectFit: "cover",
              }}
              src={item.product.coverPage}
              alt={item.product.title}
            />
            <CheckBox
              color={Colors.tealc}
              disabled={checkBoxDisabled}
              value={forOffer}
              setValue={setForOffer}
              label={
                <div>
                  <Typography
                    style={{
                      fontSize: "18px",
                      color: checkBoxDisabled ? "lightgray" : "inherit",
                    }}
                  >
                    {i18n.t("modules.cart.table.offerThisBook")}
                  </Typography>
                  <Typography
                    style={{
                      marginTop: "-5px",
                      fontSize: "12px",
                      fontStyle: "italic",
                      color: checkBoxDisabled ? "lightgray" : Colors.tealc,
                    }}
                  >
                    {i18n.t("modules.cart.table.offerCode")}
                  </Typography>
                </div>
              }
            />
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "start",
              height: "200px",
            }}
          >
            <Typography style={{ fontSize: "18px", fontWeight: "bold" }}>
              {item.product.title}
            </Typography>
            <Typography>{item.product.collections}</Typography>
            <Typography>Nº{item.product.number}</Typography>
            <div
              style={{
                display: "flex",
                justifyContent: "start",
                alignItems: "center",
              }}
            >
              <CgSmartphone
                size="2rem"
                color={Colors.tealc}
                style={{ marginLeft: "-8px" }}
              />
              <Typography
                style={{
                  textTransform: "uppercase",
                  color: Colors.tealc,
                  fontSize: "12px",
                }}
              >
                {i18n.t("modules.cart.table.readOnApp")}
              </Typography>
              <Tooltip title="teste">
                <IconButton>
                  <IoMdInformationCircleOutline
                    color={Pallette.primary}
                    size="1rem"
                    style={{ marginTop: "-3px", cursor: "pointer" }}
                  />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </Grid>
        <Grid item xs={2} style={{ display: "flex", alignItems: "center" }}>
          <Typography>€{price}</Typography>
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            alignItems: "center",
            position: "relative",
          }}
        >
          <Incrementor
            key={item.product.documentID}
            initialValue={item.value}
            updateValue={handleUpdateSubtotal}
          />
          {(item?.value > 1 || forOffer) && (
            <div
              style={{
                position: "absolute",
                bottom: "10px",
                width: "100%",
                display: "flex",
                alignItems: "center",
                paddingLeft: "40px",
              }}
            >
              <Typography style={{ fontSize: "18px" }}>
                {forOffer ? item.value : item.value - 1}
              </Typography>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  paddingLeft: "20px",
                  columnGap: "5px",
                }}
              >
                <Typography
                  color={Pallette.primary}
                  style={{ marginTop: "-2px" }}
                >
                  {i18n.t("modules.cart.table.offer")}
                </Typography>
                <Tooltip title={i18n.t("modules.cart.table.offerTooltip")}>
                  <IconButton>
                    <IoMdInformationCircleOutline
                      color={Pallette.primary}
                      size="1rem"
                      style={{ marginTop: "-3px", cursor: "pointer" }}
                    />
                  </IconButton>
                </Tooltip>
              </div>
            </div>
          )}
        </Grid>
        <Grid
          item
          xs={2}
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "end",
          }}
        >
          <Typography>€{(item.value * price).toFixed(2)}</Typography>
        </Grid>
      </Grid>
    );
  };

  const renderMobile = () => {
    return (
      <div
        key={pos}
        style={{
          position: "relative",
          width: "92vw",

          borderBottom: `solid 2px ${Colors.tealc}`,
        }}
      >
        <div>
          <Grid
            container
            columnSpacing="10px"
            alignItems="center"
            style={{
              width: "auto",
              height: "150px",
              backgroundColor: "white",
            }}
          >
            <Grid
              item
              xs={4}
              style={{
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                style={{
                  aspectRatio: 1,
                  width: "100%",
                  objectFit: "cover",
                }}
                src={item.product.coverPage}
                alt={item.product.title}
              />
            </Grid>
            <Grid
              item
              xs={8}
              style={{
                height: "100%",
                display: "flex",
              }}
            >
              <Carousel
                forOffer={forOffer}
                sliderPosition={sliderPosition}
                setSliderPosition={setSliderPosition}
                item={item}
                price={price}
                handleUpdateSubtotal={handleUpdateSubtotal}
              />
            </Grid>
          </Grid>
          <div
            style={{
              display: "flex",
              columnGap: "30px",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: `solid 1px ${Colors.greyTransparent}`,
            }}
          >
            <CheckBox
              color={Colors.tealc}
              value={forOffer}
              setValue={setForOffer}
              label={
                <div>
                  <Typography style={{ fontSize: "14px", textAlign: "left" }}>
                    {i18n.t("modules.cart.table.offerThisBook")}
                  </Typography>
                  <Typography
                    style={{
                      marginTop: "-5px",
                      fontSize: "12px",
                      fontStyle: "italic",
                      color: Colors.tealc,
                    }}
                  >
                    {i18n.t("modules.cart.table.offerCode")}
                  </Typography>
                </div>
              }
            />
            <div style={{ display: "flex", columnGap: "10px" }}>
              <div
                style={{
                  display: "flex",
                  columnGap: "0px",
                  cursor: "pointer",
                  alignItems: "center",
                }}
                onClick={() => {
                  if (setSliderPosition)
                    setSliderPosition(sliderPosition === 0 ? 1 : 0);
                }}
              >
                {sliderPosition === 1 && <AiOutlineLeft color={Colors.tealc} />}
                <Typography color={Colors.tealc}>
                  {sliderPosition === 0 ? "Details" : "Back"}
                </Typography>
                {sliderPosition === 0 && (
                  <AiOutlineRight color={Colors.tealc} />
                )}
              </div>
              <RiDeleteBinLine
                style={{
                  cursor: "pointer",
                }}
                onClick={handleDeleteCartProduct}
                size="1.5rem"
                color={Colors.tealc}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  return mobile ? renderMobile() : renderLaptop();
};

export default Element;
