import {
  Box,
  Grid,
  useTheme,
  useMediaQuery,
  Typography,
} from "@mui/material";
import Second from "./Second";
import Third from "./Third";
import Forth from "./Forth";
import * as Styled from "./styles";
import { i18n } from "../../translations/i18n";
import InstaAvatar from "../../components/InstaAvatar";
import footer from "../../assets/images/footer.svg";
import { Colors } from "../../constants/pallette";

const Footer = () => {
  const Theme = useTheme();
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"));

  const renderLaptop = () => {
    return (
      <>
        <Box
          display="flex"
          justifyContent="center"
          style={{
            backgroundImage: `url(${footer})`,
            backgroundSize: "cover",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
          }}
        >

          <Grid
            maxWidth='lg'
            container


            style={{ paddingTop: "16px", paddingBottom: "16px" }}

          >
            <Grid item xs={4} >
              <Second />
            </Grid>
            <Grid item xs={4}>
              <Third />
            </Grid>
            <Grid item xs={4} >
              <Forth />
            </Grid>
          </Grid>

        </Box>
        <Box
          display='flex'
          justifyContent='center'
          style={{
            marginTop: "-2px",
            padding: "10px 0px 10px 0px",
            backgroundColor: Colors.darkGrey,
            color: "white",
          }}
        >
          <Typography fontSize='14px'>
            &copy; Copyright Business Connect
          </Typography>
        </Box>
      </>
    );
  };

  const renderMobile = () => {
    return (
      <>
        <Box
          display='flex'
          flexDirection='column'
          justifyContent='center'
          alignItems='center'
          rowGap={2}
          style={{
            marginLeft: "-2px",
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
          <Styled.STypography>
            {i18n.t("footer.second.second")}
          </Styled.STypography>
          <Styled.STypography>
            {i18n.t("footer.third.second")}
          </Styled.STypography>
          <Styled.STypography>
            {i18n.t("footer.second.third")}
          </Styled.STypography>
        </Box>
        <Box
          display='flex'
          justifyContent='center'
          style={{
            padding: "10px 0px 10px 0px",
            backgroundColor: Colors.darkGrey,
            color: "white",
            marginTop: "-2px",
          }}
        >
          <Typography fontSize='14px'>
            &copy; Copyright Business Connect
          </Typography>
        </Box>
      </>
    );
  };

  return <>{mobile ? renderMobile() : renderLaptop()}</>;
};

export default Footer;
