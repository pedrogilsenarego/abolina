import {
  Container,
  Grid,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import Button from "../../components/Button";
import TextField from "../../components/Inputs/TextField";
import { Colors } from "../../constants/pallette";
import { ROUTE_PATHS } from "../../constants/routes";
import { CartProduct } from "../../slicer/cart/cart.types";
import { State } from "../../slicer/types";
import { i18n } from "../../translations/i18n";
import Element from "./Element";
import { getTotalValue } from "./Utils";

const Cart = () => {
  const cartItems = useSelector<State, CartProduct[]>(
    (state) => state.cart.cartItems
  );
  const [sliderPosition, setSliderPosition] = useState<0 | 1>(1);
  const theme = useTheme();
  const navigate = useNavigate();
  const mobile = useMediaQuery(theme.breakpoints.down("sm"));

  const renderMobile = () => {
    return (
      <Container maxWidth="lg">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            onClick={() => navigate(ROUTE_PATHS.BOOKS)}
            style={{
              display: "flex",
              columnGap: "5px",
              alignItems: "center",
            }}
          >
            <AiOutlineArrowLeft color={Colors.tealc} size="0.8rem" />
            <Typography
              style={{
                paddingTop: "5px",
                textAlign: "start",
                textTransform: "uppercase",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {i18n.t("modules.books.book.backBooks")}
            </Typography>
          </div>
          <div
            onClick={() => navigate(ROUTE_PATHS.CHECKOUT)}
            style={{
              display: "flex",
              columnGap: "5px",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                paddingTop: "5px",
                textAlign: "start",
                textTransform: "uppercase",
                fontSize: "14px",
                cursor: "pointer",
              }}
            >
              {i18n.t("modules.cart.finalize")}
            </Typography>
            <AiOutlineArrowRight color={Colors.tealc} size="0.8rem" />
          </div>
        </div>
        <Grid container style={{ marginTop: "40px" }}>
          <Grid
            item
            xs={1}
            style={{ borderBottom: `solid 2px ${Colors.tealc}` }}
          ></Grid>
          <Grid item xs={5}>
            <div
              style={{
                display: "flex",
                borderBottom: `solid 2px ${Colors.tealc}`,
                width: "100%",
              }}
            >
              <Typography
                style={{
                  fontSize: mobile ? "12px" : "18px",
                  color: Colors.tealc,
                  fontWeight: 800,
                }}
              >
                {i18n.t("modules.cart.table.product")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div
              style={{
                display: "flex",
                borderBottom: `solid 2px ${Colors.tealc}`,
                width: "100%",
              }}
            >
              <Typography
                style={{
                  fontSize: mobile ? "12px" : "18px",
                  color: Colors.tealc,
                  fontWeight: 800,
                }}
              >
                {i18n.t("modules.cart.table.price")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div
              style={{
                display: "flex",
                borderBottom: `solid 2px ${Colors.tealc}`,
                width: "100%",
              }}
            >
              <Typography
                style={{
                  fontSize: mobile ? "12px" : "18px",
                  color: Colors.tealc,
                  fontWeight: 800,
                }}
              >
                {i18n.t("modules.cart.table.quantity")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                borderBottom: `solid 2px ${Colors.tealc}`,
                width: "100%",
              }}
            >
              <Typography
                style={{
                  fontSize: mobile ? "12px" : "18px",
                  color: Colors.tealc,
                  fontWeight: 800,
                }}
              >
                {i18n.t("modules.cart.table.subtotal")}
              </Typography>
            </div>
          </Grid>
        </Grid>
        {cartItems?.map((item, pos) => {
          return (
            <Element
              item={item}
              pos={pos}
              sliderPosition={sliderPosition}
              setSliderPosition={setSliderPosition}
            />
          );
        })}

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            rowGap: "30px",

            marginTop: "50px",
          }}
        >
          <div
            style={{
              display: "flex",
              columnGap: "30px",
              alignItems: "center",
              justifyContent: "end",
            }}
          >
            <TextField label={i18n.t("modules.cart.discountCuppon")} />
            <Button label={i18n.t("modules.cart.applyDiscount")} />
          </div>
          <div
            style={{
              display: "flex",
              columnGap: "20px",
              justifyContent: "end",
            }}
          >
            <Typography
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: Colors.tealc,
                marginBottom: "16px",
                textAlign: "right",
                borderBottom: `solid 2px ${Colors.tealc}`,
              }}
            >
              {i18n.t("modules.cart.total")}
            </Typography>
            <Typography
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: Colors.tealc,
              }}
            >
              €{getTotalValue(cartItems)}
            </Typography>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            marginTop: "30px",
          }}
        >
          <Button
            onClick={() => navigate(ROUTE_PATHS.CHECKOUT)}
            label={i18n.t("modules.cart.finalize")}
          />
        </div>
      </Container>
    );
  };

  const renderLaptop = () => {
    return (
      <Container maxWidth="lg">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div
            onClick={() => navigate(ROUTE_PATHS.BOOKS)}
            style={{
              display: "flex",
              columnGap: "5px",
              alignItems: "center",
              position: "relative",
            }}
          >
            <AiOutlineArrowLeft
              color={Colors.tealc}
              size="0.8rem"
              style={{ position: "absolute", left: "-15px" }}
            />
            <Typography
              style={{
                paddingTop: "5px",
                textAlign: "start",
                textTransform: "uppercase",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              {i18n.t("modules.books.book.backBooks")}
            </Typography>
          </div>
          <div
            onClick={() => navigate(ROUTE_PATHS.CHECKOUT)}
            style={{
              display: "flex",
              columnGap: "5px",
              alignItems: "center",
              position: "relative",
            }}
          >
            <Typography
              style={{
                paddingTop: "5px",
                textAlign: "start",
                textTransform: "uppercase",
                fontSize: "18px",
                cursor: "pointer",
              }}
            >
              {i18n.t("modules.cart.finalize")}
            </Typography>
            <AiOutlineArrowRight
              color={Colors.tealc}
              size="0.8rem"
              style={{ position: "absolute", right: "-15px" }}
            />
          </div>
        </div>
        <Grid container style={{ marginTop: "40px" }}>
          <Grid
            item
            xs={1}
            style={{ borderBottom: `solid 2px ${Colors.tealc}` }}
          ></Grid>
          <Grid item xs={5}>
            <div
              style={{
                display: "flex",
                borderBottom: `solid 2px ${Colors.tealc}`,
                width: "100%",
              }}
            >
              <Typography
                style={{
                  fontSize: mobile ? "12px" : "18px",
                  color: Colors.tealc,
                  fontWeight: 800,
                }}
              >
                {i18n.t("modules.cart.table.product")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div
              style={{
                display: "flex",
                borderBottom: `solid 2px ${Colors.tealc}`,
                width: "100%",
              }}
            >
              <Typography
                style={{
                  fontSize: mobile ? "12px" : "18px",
                  color: Colors.tealc,
                  fontWeight: 800,
                }}
              >
                {i18n.t("modules.cart.table.price")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div
              style={{
                display: "flex",
                borderBottom: `solid 2px ${Colors.tealc}`,
                width: "100%",
              }}
            >
              <Typography
                style={{
                  fontSize: mobile ? "12px" : "18px",
                  color: Colors.tealc,
                  fontWeight: 800,
                }}
              >
                {i18n.t("modules.cart.table.quantity")}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div
              style={{
                display: "flex",
                justifyContent: "end",
                borderBottom: `solid 2px ${Colors.tealc}`,
                width: "100%",
              }}
            >
              <Typography
                style={{
                  fontSize: mobile ? "12px" : "18px",
                  color: Colors.tealc,
                  fontWeight: 800,
                }}
              >
                {i18n.t("modules.cart.table.subtotal")}
              </Typography>
            </div>
          </Grid>
        </Grid>
        {cartItems?.map((item, pos) => {
          return <Element item={item} pos={pos} />;
        })}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "50px",
          }}
        >
          <div
            style={{ display: "flex", columnGap: "20px", alignItems: "center" }}
          >
            <TextField label={i18n.t("modules.cart.discountCuppon")} />
            <Button label={i18n.t("modules.cart.applyDiscount")} />
          </div>
          <div style={{ display: "flex", columnGap: "20px" }}>
            <Typography
              style={{
                fontSize: "18px",
                fontWeight: 800,

                color: Colors.tealc,

                marginBottom: "16px",
                borderBottom: `solid 2px ${Colors.tealc}`,
              }}
            >
              {i18n.t("modules.cart.total")}
            </Typography>
            <Typography
              style={{
                fontSize: "18px",
                fontWeight: 800,
                color: Colors.tealc,
              }}
            >
              €{getTotalValue(cartItems)}
            </Typography>
          </div>
        </div>
        <div
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "end",
            marginTop: "100px",
          }}
        >
          <Button
            onClick={() => navigate(ROUTE_PATHS.CHECKOUT)}
            label={i18n.t("modules.cart.finalize")}
          />
        </div>
      </Container>
    );
  };

  return mobile ? renderMobile() : renderLaptop();
};

export default Cart;
