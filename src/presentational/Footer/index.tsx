import { Box, Grid, Container, useTheme, useMediaQuery } from "@mui/material";
import Second from "./Second";
import Third from "./Third";
import Forth from "./Forth";
import { Colors } from "../../constants/pallette";
import * as Styled from "./styles";
import { i18n } from "../../translations/i18n";
import InstaAvatar from "../../components/InstaAvatar";
import footer from "../../assets/images/footer.svg"

const Footer = () => {
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));

  const renderLaptop = () => {
    return (
      <Box style={{
        backgroundImage: `url(${footer})`,
        backgroundSize: "cover",

      }}>
        <Container maxWidth='xl'>
          <Grid
            container
            justifyContent='space-between'
            style={{ paddingTop: "30px", paddingBottom: "30px" }}
          >
            <Grid item>
              <Second />
            </Grid>
            <Grid item>
              <Third />
            </Grid>
            <Grid item>
              <Forth />
            </Grid>
          </Grid>
        </Container>
      </Box>
    );
  };

  const renderMobile = () => {
    return (
      <Box
        display='flex'
        flexDirection="column"
        justifyContent='center'
        alignItems="center"
        rowGap={2}
        style={{
          backgroundImage: `url(${footer})`,
          backgroundSize: "cover",
          paddingTop: "30px",
          paddingBottom: "30px",
        }}
      >
        <Styled.STypography>xxxx@gmail.com</Styled.STypography>
        <Box display='flex' alignItems='center' columnGap={2}>
          <Styled.STypography>
            {i18n.t("footer.third.first")}
          </Styled.STypography>
          <InstaAvatar backgroundColor='black' color='white' />
        </Box>
        <Styled.STypography>{i18n.t("footer.second.second")}</Styled.STypography>
        <Styled.STypography>{i18n.t("footer.third.second")}</Styled.STypography>
        <Styled.STypography>{i18n.t("footer.second.third")}</Styled.STypography>
      </Box>
    );
  };

  return <>{mobile ? renderMobile() : renderLaptop()}</>;
};

export default Footer;
