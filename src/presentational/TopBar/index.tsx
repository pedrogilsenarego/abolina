import { Container, Grid, Typography, useTheme, useMediaQuery, Divider } from "@mui/material";
import { Colors } from "../../constants/pallette";
import { i18n } from "../../translations/i18n";

const TopBar = () => {
  const Theme = useTheme()
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"))
  return (
    <Container>
      <Grid container justifyContent={mobile ? "center" : "flex-end"} columnGap={1} style={{ padding: "10px 0px 10px 0px" }}>
        <Grid item><Typography color={Colors.tealc}>{i18n.t("topBar.memory")}</Typography></Grid>
        <Divider orientation="vertical" style={{
          backgroundColor: '#00000003',
          height: '25px',
          width: '1px'
        }} />
        <Grid item><Typography color={Colors.tealc}>{i18n.t("topBar.hope")}</Typography></Grid>
        <Divider orientation="vertical" style={{
          backgroundColor: '#00000003',
          height: '25px',
          width: '1px'
        }} />
        <Grid item><Typography color={Colors.tealc}>{i18n.t("topBar.audacity")}</Typography></Grid>
      </Grid>
    </Container>
  );
};

export default TopBar;
