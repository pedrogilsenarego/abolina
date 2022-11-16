import { Grid, Button, Typography } from "@mui/material";
import { Colors } from "../../../constants/pallette";
import { i18n } from "../../../translations/i18n";

const Forth = () => {
  return (
    <Grid
      container
      direction='column'
      justifyContent='space-between'
      style={{ minHeight: "100%" }}
    >
      <Button
        style={{
          backgroundColor: Colors.tealc,
          color: "white",
          borderRadius: "40px",
          paddingLeft: "20px",
          paddingRight: "20px"
        }}
      >
        <Typography style={{ fontSize: "12px", fontWeight: 700 }}>{i18n.t("footer.forth.button")}</Typography>
      </Button>
    </Grid>
  );
};

export default Forth;
