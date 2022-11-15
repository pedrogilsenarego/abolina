import { Typography, Grid } from "@mui/material";
import { i18n } from "../../../translations/i18n";

const Second = () => {
  return (
    <Grid container rowGap={3} direction="column">
      <Typography>xxxx@gmail.com</Typography>
      <Typography>{i18n.t("footer.second.second")}</Typography>
      <Typography>{i18n.t("footer.second.third")}</Typography>
    </Grid>
  );
};

export default Second;
