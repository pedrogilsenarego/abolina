import { Container, Grid, Typography } from "@mui/material";
import { i18n } from "../../translations/i18n";
import { Colors } from "../../constants/pallette";
import { useSelector } from "react-redux";
import { State } from "../../slicer/types";
import { CartProduct } from "../../slicer/cart/cart.types";

import Element from "./Element";
import TextField from "../../components/Inputs/TextField";
import Button from "../../components/Buttons/Button";

const Cart = () => {
  const cartItems = useSelector<State, CartProduct[]>(
    (state) => state.cart.cartItems
  );
  return (
    <Container maxWidth='lg'>
      <Typography
        style={{
          fontSize: "28px",
          textTransform: "uppercase",
          color: Colors.tealc,
          fontWeight: 800,
        }}
      >
        {i18n.t("modules.cart.title")}
      </Typography>
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
              style={{ fontSize: "18px", color: Colors.tealc, fontWeight: 800 }}
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
              style={{ fontSize: "18px", color: Colors.tealc, fontWeight: 800 }}
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
              style={{ fontSize: "18px", color: Colors.tealc, fontWeight: 800 }}
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
              style={{ fontSize: "18px", color: Colors.tealc, fontWeight: 800 }}
            >
              {i18n.t("modules.cart.table.subtotal")}
            </Typography>
          </div>
        </Grid>
      </Grid>
      {cartItems?.map((item, pos) => {
        return (
          <Element item={item} pos={pos} />
        );
      })}
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "50px" }}>
        <div style={{ display: "flex", columnGap: "20px", alignItems: "center" }}>
          <TextField label={i18n.t("modules.cart.discountCuppon")} />
          <Button label={i18n.t("modules.cart.applyDiscount")} />
        </div>
      </div>
    </Container>
  );
};

export default Cart;
