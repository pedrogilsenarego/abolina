import { Box } from "@mui/material";
import { i18n } from "../../../translations/i18n";
import * as Styled from "../styles";
import InstaAvatar from "../../../components/InstaAvatar";

const Second = () => {
  return (
    <Box display="flex" flexDirection="column" rowGap={2}>
      <Box display="flex" alignItems="center" columnGap={15}>
        <Styled.STypography>xxxx@gmail.com</Styled.STypography>
        <Box display="flex" alignItems="center" columnGap={1}>
          <Styled.STypography>
            {i18n.t("footer.third.first")}
          </Styled.STypography>
          <InstaAvatar backgroundColor="black" color="white" />
        </Box>
      </Box>
      <Styled.STypography>{i18n.t("footer.third.second")}</Styled.STypography>
    </Box>
  );
};

export default Second;
