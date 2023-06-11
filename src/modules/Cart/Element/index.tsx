import {
  Grid,
  IconButton,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { CartProduct } from "../../../slicer/cart/cart.types";
import { Colors, Pallette } from "../../../constants/pallette";
import { AiOutlineClose } from "react-icons/ai";
import CheckBox from "../../../components/Inputs/CheckBox";
import { i18n } from "../../../translations/i18n";
import { CgSmartphone } from "react-icons/cg";
import Incrementor from "../../../components/Incrementor";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { RiDeleteBinLine } from "react-icons/ri"
import {
  deleteProductCart,
  onlyOfferToggle,
  updateCart,
} from "../../../slicer/cart/cart.actions";
import Tooltip from "../../../components/Tooltip/Tooltip";

interface Props {
  item: CartProduct;
  pos: number;
}

const Element = ({ item, pos }: Props) => {
  const [forOffer, setForOffer] = useState<boolean>(item?.onlyOffer || false);
  const [numberOffer, setNumberOffer] = useState<number>(0);
  const dispatch = useDispatch();
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));
  const handleUpdateSubtotal = (value: number) => {
    if (value < numberOffer) setNumberOffer(value);
    dispatch(updateCart(value, item.product.documentID));
  };
  const handleDeleteCartProduct = () => {
    dispatch(deleteProductCart(item.product.documentID));
  };

  useEffect(() => {
    if (forOffer !== item?.onlyOffer) dispatch(onlyOfferToggle(item.product.documentID, forOffer))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [forOffer])





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
              size='1.5rem'
              color={Colors.darkGrey}
            />
            <img
              style={{
                height: "200px",
                objectFit: "contain",
              }}
              src={item.product.coverPage}
              alt={item.product.title}
            />
            <CheckBox
              color={Colors.tealc}
              value={forOffer}
              setValue={setForOffer}
              label={
                <div>
                  <Typography style={{ fontSize: "18px" }}>
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
                size='2rem'
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
              <Tooltip title='teste'>
                <IconButton>
                  <IoMdInformationCircleOutline
                    color={Pallette.primary}
                    size='1rem'
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
                      size='1rem'
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
          width: "92vw",
          paddingTop: "10px",
          paddingBottom: "5px",
          borderBottom: `solid 2px ${Colors.tealc}`,

        }}
      >
        <div>
          <div style={{
            overflow: "scroll",
            display: "flex",
            width: "auto",
            columnGap: "40px",
            backgroundColor: "whiteSmoke",
            padding: "10px",
          }}>
            <img
              style={{
                height: "120px",
                objectFit: "contain",
              }}
              src={item.product.coverPage}
              alt={item.product.title}
            />
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "start",
              }}
            >
              <Typography style={{ fontSize: 18, fontWeight: "bold" }}>
                {item.product.title}
              </Typography>
              <Typography>{item.product.collections}</Typography>
              <Typography>Nº{item.product.number}</Typography>

            </div>
            <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
              <Typography>€{price}</Typography>
            </div>
            <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
              <Incrementor
                key={item.product.documentID}
                initialValue={item.value}
                updateValue={handleUpdateSubtotal}
              />
            </div>
            <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
              <Typography>€{(item.value * price).toFixed(2)}</Typography>
            </div>
          </div>
          <div style={{ display: "flex", columnGap: "30px", justifyContent: "space-between", alignItems: "center" }}>

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
            {(item?.value > 1 || forOffer) && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  columnGap: "5px",
                }}
              >
                <Typography style={{ fontSize: "14px" }}>
                  {forOffer ? item.value : item.value - 1}
                </Typography>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",

                  }}
                >
                  <Typography
                    color={Pallette.primary}
                  >
                    {i18n.t("modules.cart.table.offer")}
                  </Typography>

                </div>
              </div>
            )}
            <RiDeleteBinLine
              style={{
                cursor: "pointer",

              }}
              onClick={handleDeleteCartProduct}
              size='1.5rem'
              color={Colors.darkGrey}
            />
          </div>
        </div>
      </div>
    );
  };

  return mobile ? renderMobile() : renderLaptop();
};

export default Element;
