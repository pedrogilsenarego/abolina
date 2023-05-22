import { Container, Grid, Typography } from "@mui/material";
import { i18n } from "../../translations/i18n";
import { Colors } from "../../constants/pallette";
import { useSelector } from "react-redux";
import { State } from "../../slicer/types";
import { CartProduct } from "../../slicer/cart/cart.types";

import Element from "./Element";
import TextField from "../../components/Inputs/TextField";
import Button from "../../components/Buttons/Button";
import { getTotalValue } from "./Utils";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";

const Checkout = () => {
  const cartItems = useSelector<State, CartProduct[]>(
    (state) => state.cart.cartItems
  );
  const [resumeOpen, setResumeOpen] = useState<boolean>(false)

  function getCartTotal() {
    let total = 0;
    for (const item of cartItems) {
      total += item.value;
    }
    return total;
  }

  return (
    <Container maxWidth='lg'>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          marginTop: "20px",
        }}
      >
        <Typography
          style={{
            fontSize: "28px",
            textTransform: "uppercase",
            color: Colors.tealc,
            fontWeight: 800,
          }}
        >
          {i18n.t("modules.cart.title")}&nbsp; &nbsp;&#62;
        </Typography>
        <Typography
          style={{
            fontSize: "28px",
            textTransform: "uppercase",
            color: Colors.tealcTransparent,
            fontWeight: 800,
          }}
        >
          &nbsp; &nbsp;{i18n.t("modules.cart.title2")}
        </Typography>
      </div>
      <Grid container style={{ marginTop: "20px" }}>
        <Grid item xs={6}></Grid>
        <Grid item xs={6}>
          <Typography
            style={{ textAlign: "left", fontSize: "24px", fontWeight: 800 }}
          >
            {i18n.t("modules.checkout.resumePurchase")}
          </Typography>
          <div
            onClick={() => setResumeOpen(!resumeOpen)}
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: `2px solid ${Colors.tealc}`,
              marginTop: "20px",
              paddingBottom: "6px",
              cursor: "pointer"

            }}
          >
            <Typography style={{ color: Colors.tealc, fontWeight: 800 }}>
              {getCartTotal()}
              {" "}
              {i18n.t("modules.checkout.cartItems")}
            </Typography>
            {resumeOpen ? <IoIosArrowUp size="1.2rem" color={Colors.tealc} /> : <IoIosArrowDown size="1.2rem" color={Colors.tealc} />}

          </div>
          {resumeOpen && cartItems?.map((item, pos) => {
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
              style={{
                display: "flex",
                columnGap: "20px",
                alignItems: "center",
              }}
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
            <Button label={i18n.t("modules.cart.finalize")} />
          </div>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Checkout;
