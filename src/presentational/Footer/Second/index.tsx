import { Grid, Box } from "@mui/material";
import { i18n } from "../../../translations/i18n";
import * as Styled from "../styles";
import InstaAvatar from "../../../components/InstaAvatar";

const Second = () => {
  return (
    <Grid container rowGap={3} direction='column'>
      <Styled.STypography>xxxx@gmail.com</Styled.STypography>
      <Box display='flex' alignItems='center' columnGap={2}>
        <Styled.STypography>{i18n.t("footer.third.first")}</Styled.STypography>
        <InstaAvatar backgroundColor='black' color='white' />
      </Box>
      <Styled.STypography>{i18n.t("footer.third.second")}</Styled.STypography>
    </Grid>
  );
};

export default Second;
