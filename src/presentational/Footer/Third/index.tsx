import { Grid } from "@mui/material";
import * as Styled from "../styles";
import { i18n } from "../../../translations/i18n";
import InstaAvatar from "../../../components/InstaAvatar";

const Third = () => {
  return (
    <Grid
      container
      direction='column'
      justifyContent='space-between'
      style={{ minHeight: "100%" }}
    >
      <Grid container alignItems="center" columnGap={2}>
        <Styled.STypography>{i18n.t("footer.third.first")}</Styled.STypography>
        <InstaAvatar backgroundColor='black' color='white' />
      </Grid>

      <Styled.STypography>{i18n.t("footer.third.second")}</Styled.STypography>
    </Grid>
  );
};

export default Third;
