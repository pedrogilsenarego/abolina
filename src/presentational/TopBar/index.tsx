import { Container, Grid, Typography, useTheme, useMediaQuery } from "@mui/material";
import { Colors } from "../../constants/pallette";
import { i18n } from "../../translations/i18n";

const TopBar = () => {
  const Theme = useTheme()
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"))
  return (
    <Container>
      <Grid container justifyContent={mobile ? "center" : "flex-end"} columnGap={2}>
        <Grid item><Typography color={Colors.tealc}>{i18n.t("topBar.memory")}</Typography></Grid>
        <Grid item><Typography color={Colors.tealc}>{i18n.t("topBar.hope")}</Typography></Grid>
        <Grid item><Typography color={Colors.tealc}>{i18n.t("topBar.audacity")}</Typography></Grid>
      </Grid>
    </Container>
  );
};

export default TopBar;
