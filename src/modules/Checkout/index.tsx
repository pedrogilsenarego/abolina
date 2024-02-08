import { Container, Divider, Grid, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Colors } from "../../constants/pallette";
import { CartProduct } from "../../slicer/cart/cart.types";
import { State } from "../../slicer/types";
import { i18n } from "../../translations/i18n";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useState } from "react";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routes";
import { publishableKeyTest } from "../../stripe/config";
import CheckoutForm from "./CheckoutForm";
import Element from "./Element";
import { getTotalValue } from "./Utils";

const Checkout = () => {
  const cartItems = useSelector<State, CartProduct[]>(
    (state) => state.cart.cartItems
  );
  const [resumeOpen, setResumeOpen] = useState<boolean>(true);
  const stripePromise = loadStripe(publishableKeyTest);
  const navigate = useNavigate();
  const vertical = useSelector<State, boolean>(
    (state) => state.general.positionVertical
  );

  function getCartTotal() {
    let total = 0;
    for (const item of cartItems) {
      total += item.value;
    }
    return total;
  }

  const renderMobile = () => {
    return (
      <Container maxWidth="lg">
        <div
          onClick={() => navigate(ROUTE_PATHS.CART)}
          style={{
            display: "flex",
            columnGap: "5px",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            style={{
              textAlign: "start",
              textTransform: "uppercase",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              color: Colors.grey,
            }}
          >
            {i18n.t("modules.checkout.backCart")}
          </Typography>
          <Typography
            style={{
              textAlign: "start",
              textTransform: "uppercase",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              color: Colors.grey,
            }}
          >
            {` > `}
          </Typography>
          <Typography
            style={{
              textAlign: "start",
              textTransform: "uppercase",
              fontSize: "20px",
              fontWeight: "bold",
              cursor: "pointer",
              color: Colors.tealc,
            }}
          >
            {i18n.t("modules.checkout.data")}
          </Typography>
          <Typography
            style={{
              textAlign: "start",
              textTransform: "uppercase",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              color: Colors.tealc,
            }}
          >
            {` > `}
          </Typography>
          <Typography
            style={{
              textAlign: "start",
              textTransform: "uppercase",
              fontSize: "18px",
              fontWeight: "bold",
              cursor: "pointer",
              color: Colors.grey,
            }}
          >
            {i18n.t("modules.checkout.checkout")}
          </Typography>
        </div>

        <Grid container columnSpacing="60px" style={{ marginTop: "20px" }}>
          <Grid item xs={12}>
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
                cursor: "pointer",
              }}
            >
              <Typography style={{ color: Colors.tealc, fontWeight: 800 }}>
                {getCartTotal()} {i18n.t("modules.checkout.cartItems")}
              </Typography>
              {resumeOpen ? (
                <IoIosArrowUp size="1.2rem" color={Colors.tealc} />
              ) : (
                <IoIosArrowDown size="1.2rem" color={Colors.tealc} />
              )}
            </div>
            {resumeOpen &&
              cartItems?.map((item, pos) => {
                return <Element item={item} pos={pos} />;
              })}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "0px 10px",
                marginTop: "20px",
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                }}
              >
                {i18n.t("modules.checkout.itemsTotal")}
              </Typography>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                }}
              >
                €{getTotalValue(cartItems)}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                padding: "0px 10px",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                }}
              >
                {i18n.t("modules.checkout.discountTotal")}
              </Typography>
              <Typography
                style={{
                  fontSize: "18px",
                }}
              >
                €0
              </Typography>
            </div>
            <Divider />
            <div
              style={{
                display: "flex",
                padding: "0px 10px",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                }}
              >
                {i18n.t("modules.checkout.total")}
              </Typography>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                }}
              >
                €{getTotalValue(cartItems)}
              </Typography>
            </div>
          </Grid>
          <Grid item xs={12} style={{ marginTop: "60px" }}>
            {" "}
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </Grid>
        </Grid>
      </Container>
    );
  };

  const renderLaptop = () => {
    return (
      <Container maxWidth="lg">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
        >
          <div
            onClick={() => navigate(ROUTE_PATHS.CART)}
            style={{
              display: "flex",
              columnGap: "5px",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AiOutlineArrowLeft color={Colors.tealc} size="1rem" />
            <Typography
              style={{
                textAlign: "start",
                textTransform: "uppercase",
                fontSize: "18px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {i18n.t("modules.checkout.backCart")}
            </Typography>
          </div>
          <div
            style={{
              display: "flex",
              columnGap: "5px",
              alignItems: "center",
            }}
          >
            <Typography
              style={{
                textAlign: "start",
                textTransform: "uppercase",
                fontSize: "18px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              {i18n.t("modules.checkout.checkout")}
            </Typography>
            <AiOutlineArrowRight color={Colors.tealc} size="1rem" />
          </div>
        </div>
        <Typography
          style={{
            textAlign: "center",
            color: Colors.tealc,
            textTransform: "uppercase",
            fontSize: "24px",
            cursor: "pointer",
            fontWeight: "bolder",
            width: "100%",
          }}
        >
          {i18n.t("modules.checkout.title")}
        </Typography>
        <Grid
          container
          columnSpacing="60px"
          style={{ marginTop: "30px", padding: "0px 50px" }}
        >
          <Grid item xs={6}>
            <Elements stripe={stripePromise}>
              <CheckoutForm />
            </Elements>
          </Grid>
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
                cursor: "pointer",
              }}
            >
              <Typography style={{ color: Colors.tealc, fontWeight: 800 }}>
                {getCartTotal()} {i18n.t("modules.checkout.cartItems")}
              </Typography>
              {resumeOpen ? (
                <IoIosArrowUp size="1.2rem" color={Colors.tealc} />
              ) : (
                <IoIosArrowDown size="1.2rem" color={Colors.tealc} />
              )}
            </div>
            {resumeOpen &&
              cartItems?.map((item, pos) => {
                return <Element item={item} pos={pos} />;
              })}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                }}
              >
                {i18n.t("modules.checkout.itemsTotal")}
              </Typography>
              <Typography
                style={{
                  fontSize: "18px",
                }}
              >
                €{getTotalValue(cartItems)}
              </Typography>
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "10px",
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                }}
              >
                {i18n.t("modules.checkout.discountTotal")}
              </Typography>
              <Typography
                style={{
                  fontSize: "18px",
                }}
              >
                €0
              </Typography>
            </div>
            <Divider style={{ marginTop: "20px" }} />
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "20px",
              }}
            >
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: "bolder",
                }}
              >
                {i18n.t("modules.checkout.total")}
              </Typography>
              <Typography
                style={{
                  fontSize: "18px",
                  fontWeight: 800,
                }}
              >
                €{getTotalValue(cartItems)}
              </Typography>
            </div>
          </Grid>
        </Grid>
      </Container>
    );
  };

  return vertical ? renderMobile() : renderLaptop();
};

export default Checkout;
