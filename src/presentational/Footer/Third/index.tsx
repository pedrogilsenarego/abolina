import { Grid } from "@mui/material";
import * as Styled from "../styles";
import { i18n } from "../../../translations/i18n";

const Third = () => {
  return (
    <Grid
      container
      direction='row'
      alignItems='flex-end'
      style={{ minHeight: "100%" }}
    >
      <Styled.STypography>{i18n.t("footer.second.second")}</Styled.STypography>


    </Grid>
  );
};

export default Third;
