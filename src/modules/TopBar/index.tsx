import { Container, Grid, Typography } from "@mui/material";
import { Colors } from "../../constants/pallette";
import { i18n } from "../../translations/i18n";

const TopBar = () => {
  return (
    <Container>
      <Grid container justifyContent="flex-end" columnGap={2}>
        <Grid item><Typography color={Colors.tealc}>{i18n.t("topBar.memory")}</Typography></Grid>
        <Grid item><Typography color={Colors.tealc}>{i18n.t("topBar.hope")}</Typography></Grid>
        <Grid item><Typography color={Colors.tealc}>{i18n.t("topBar.audacity")}</Typography></Grid>
      </Grid>
    </Container>
  );
};

export default TopBar;
