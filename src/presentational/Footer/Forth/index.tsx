import { Grid } from "@mui/material";

import { i18n } from "../../../translations/i18n";
import Button from "../../../components/Buttons/Button";

const Forth = () => {
  return (
    <Grid
      container
      direction='column'
      justifyContent='space-between'
      style={{ minHeight: "100%" }}
    >
      <Button label={i18n.t("footer.forth.button")} />
    </Grid>
  );
};

export default Forth;
