import { Container, Typography, useMediaQuery, useTheme } from "@mui/material";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Colors } from "../../constants/pallette";
import { clearCart } from "../../slicer/cart/cart.actions";
import { checkUserSession } from "../../slicer/user/user.actions";
import { i18n } from "../../translations/i18n";

const BuySuccess = () => {
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(clearCart());
    dispatch(checkUserSession());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container
      style={{
        alignItems: "center",
        textAlign: "center",
        minHeight: mobile ? "50vh" : "100vh",
        width: "100vw",
        paddingTop: mobile ? "100px" : "140px",
        paddingBottom: "100px",

        flexDirection: "column",
      }}
    >
      <Typography
        color={Colors.tealc}
        fontSize={mobile ? "1.5rem" : "2rem"}
        fontWeight={800}
        mt="80px"
      >
        {i18n.t("modules.buySuccess.title")}
      </Typography>
      <Typography
        fontSize={mobile ? "1rem" : "1.5rem"}
        mt={mobile ? "20px" : "40px"}
      >
        {i18n.t("modules.buySuccess.text")}
      </Typography>
    </Container>
  );
};

export default BuySuccess;
