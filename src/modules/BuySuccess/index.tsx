import { Typography, useTheme, useMediaQuery, Container } from "@mui/material";
import { Colors } from "../../constants/pallette";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { clearCart } from "../../slicer/cart/cart.actions";


const BuySuccess = () => {
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(clearCart())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
        fontSize={mobile ? "2rem" : "3rem"}
        fontWeight={800}
        mt='80px'
      >
        Definir Texto
      </Typography>
      <Typography
        color={Colors.tealc}
        fontSize={mobile ? "1rem" : "2rem"}
        fontWeight={800}
        mt={mobile ? "20px" : "80px"}
      >
        Definir texto
      </Typography>
    </Container>
  );
};

export default BuySuccess;
