import { Container, Divider, Grid, Typography } from "@mui/material";
import { i18n } from "../../translations/i18n";
import { Colors } from "../../constants/pallette";
import { useSelector } from "react-redux";
import { State } from "../../slicer/types";
import { CartProduct } from "../../slicer/cart/cart.types";

import Element from "./Element";
import { loadStripe } from "@stripe/stripe-js";
import { getTotalValue } from "./Utils";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useState } from "react";
import CheckoutForm from "./CheckoutForm";
import { Elements } from "@stripe/react-stripe-js";
import { publishableKeyTest } from "../../stripe/config";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routes";
import { AiOutlineArrowLeft } from "react-icons/ai";

const Checkout = () => {
  const cartItems = useSelector<State, CartProduct[]>(
    (state) => state.cart.cartItems
  );
  const [resumeOpen, setResumeOpen] = useState<boolean>(true);
  const stripePromise = loadStripe(publishableKeyTest);
  const navigate = useNavigate()
  const vertical = useSelector<State, boolean>((state) => state.general.positionVertical)

  function getCartTotal() {
    let total = 0;
    for (const item of cartItems) {
      total += item.value;
    }
    return total;
  }

  const renderMobile = () => {
    return (<Container maxWidth='lg'>

      <div
        onClick={() =>
          navigate(ROUTE_PATHS.CART)
        }
        style={{
          display: "flex",
          columnGap: "5px",
          alignItems: "center",
          position: "relative",
        }}
      >
        <AiOutlineArrowLeft
          color={Colors.tealc}
          size='0.8rem'
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
          {i18n.t("modules.checkout.backCart")}
        </Typography>
      </div>


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
            color: "lightGrey",
            fontWeight: 800,
          }}
        >
          {i18n.t("modules.cart.title")}&nbsp; &nbsp;&#62;
        </Typography>
        <Typography
          style={{
            fontSize: "28px",
            textTransform: "uppercase",
            color: Colors.tealc,
            fontWeight: 800,
          }}
        >
          &nbsp; &nbsp;{i18n.t("modules.cart.title2")}
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
              <IoIosArrowUp size='1.2rem' color={Colors.tealc} />
            ) : (
              <IoIosArrowDown size='1.2rem' color={Colors.tealc} />
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
        <Grid item xs={12}>
          {" "}
          <Elements stripe={stripePromise}>
            <CheckoutForm />
          </Elements>
        </Grid>

      </Grid>
    </Container>)
  }

  const renderLaptop = () => {
    return (
      <Container maxWidth='lg'>

        <div
          onClick={() =>
            navigate(ROUTE_PATHS.CART)
          }
          style={{
            display: "flex",
            columnGap: "5px",
            alignItems: "center",
            position: "relative",
          }}
        >
          <AiOutlineArrowLeft
            color={Colors.tealc}
            size='0.8rem'
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
            {i18n.t("modules.checkout.backCart")}
          </Typography>
        </div>


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
              color: Colors.tealcTransparent,
              fontWeight: 800,
            }}
          >
            {i18n.t("modules.cart.title")}&nbsp; &nbsp;&#62;
          </Typography>
          <Typography
            style={{
              fontSize: "28px",
              textTransform: "uppercase",
              color: Colors.tealc,
              fontWeight: 800,
            }}
          >
            &nbsp; &nbsp;{i18n.t("modules.cart.title2")}
          </Typography>
        </div>
        <Grid container columnSpacing="60px" style={{ marginTop: "20px" }}>
          <Grid item xs={6}>
            {" "}
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
                <IoIosArrowUp size='1.2rem' color={Colors.tealc} />
              ) : (
                <IoIosArrowDown size='1.2rem' color={Colors.tealc} />
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
        </Grid>
      </Container>
    )
  }

  return vertical ? renderMobile() : renderLaptop();
};

export default Checkout;
