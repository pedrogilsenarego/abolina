import { Container, Grid, Typography } from "@mui/material";
import { i18n } from "../../translations/i18n";
import { Colors } from "../../constants/pallette";

const Cart = () => {
  return (
    <Container maxWidth="lg">
      <Typography
        style={{
          fontSize: "28px",
          textTransform: "uppercase",
          color: Colors.tealc,
          fontWeight: 800
        }}
      >
        {i18n.t("modules.cart.title")}
      </Typography>
      <Grid container style={{ marginTop: "40px" }}>
        <Grid item xs={6}>
          <div style={{ borderBottom: `solid 2px ${Colors.tealc}`, width: "100%" }}>
            <Typography style={{ fontSize: "18px", color: Colors.tealc, fontWeight: 800 }}>{i18n.t("modules.cart.table.product")}</Typography>
          </div>

        </Grid>
        <Grid item xs={2}>
          <div style={{ borderBottom: `solid 2px ${Colors.tealc}`, width: "100%" }}>
            <Typography style={{ fontSize: "18px", color: Colors.tealc, fontWeight: 800 }}>{i18n.t("modules.cart.table.price")}</Typography>
          </div>

        </Grid>
        <Grid item xs={2}>
          <div style={{ borderBottom: `solid 2px ${Colors.tealc}`, width: "100%" }}>
            <Typography style={{ fontSize: "18px", color: Colors.tealc, fontWeight: 800 }}>{i18n.t("modules.cart.table.quantity")}</Typography>
          </div>

        </Grid>
        <Grid item xs={2}>
          <div style={{ borderBottom: `solid 2px ${Colors.tealc}`, width: "100%" }}>
            <Typography style={{ fontSize: "18px", color: Colors.tealc, fontWeight: 800 }}>{i18n.t("modules.cart.table.subtotal")}</Typography>
          </div>

        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
