import { Grid } from "@mui/material";
import * as Styled from "../styles";
import { i18n } from "../../../translations/i18n";

const Forth = () => {
  return (
    <Grid
      container
      direction='row'
      alignItems='end'
      style={{ minHeight: "100%" }}
    >
      <Styled.STypography>{i18n.t("footer.second.third")}</Styled.STypography>
    </Grid>
  );
};

export default Forth;
