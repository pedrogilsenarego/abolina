import { Grid } from "@mui/material";
import { i18n } from "../../../translations/i18n";
import * as Styled from "../styles"

const Second = () => {
  return (
    <Grid container rowGap={3} direction="column">
      <Styled.STypography>xxxx@gmail.com</Styled.STypography>
      <Styled.STypography>{i18n.t("footer.second.second")}</Styled.STypography>
      <Styled.STypography>{i18n.t("footer.second.third")}</Styled.STypography>
    </Grid>
  );
};

export default Second;
