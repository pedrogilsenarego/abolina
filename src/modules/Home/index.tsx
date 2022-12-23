import Carrousell from "./Components/Carrousell/Carrousell";
import * as GStyled from "../../styles";
import { i18n } from "../../translations/i18n";
import { Typography, Container, Box, useTheme, useMediaQuery } from "@mui/material";
import Button from "../../components/Buttons/Button";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routes";
import Contacts from "./Components/Contacts";
import homeOndas1 from "../../assets/images/homeOndas1.svg";
import homeOndas2 from "../../assets/images/homeOndas2.svg";

const Home = () => {
  const navigate = useNavigate();
  const Theme = useTheme()
  const mobile = useMediaQuery(Theme.breakpoints.down("md"))

  return (
    <>
      <Box style={{ position: "relative" }}>
        <Carrousell />
        <Box
          style={{
            position: "absolute",
            zIndex: -10,
            width: "100%",
            bottom: mobile ? 0 : "-10%",
            backgroundImage: `url(${homeOndas1})`,
            backgroundSize: mobile ? "170%" : "contain",
            backgroundPosition: "center center",
            backgroundRepeat: "no-repeat",
            minHeight: "25%",

          }}
        />
      </Box>
      <Box style={{ position: "relative", paddingBottom: "180px" }}>
        <Container maxWidth='lg' style={{ justifyContent: "center" }}>
          <Box sx={{ mt: mobile ? "0px" : "60px" }}>
            <GStyled.Title>{i18n.t("menuBar.about")}</GStyled.Title>
            <Typography
              align='justify'
              style={{ marginTop: "30px", whiteSpace: "pre-line" }}
            >
              {i18n.t("modules.about.mainText")}
            </Typography>
          </Box>
          <Box sx={{ mt: "20px" }} display='flex' justifyContent='start'>
            <Button
              label={i18n.t("modules.home.mainTextBtn")}
              onClick={() => navigate(ROUTE_PATHS.ABOUT)}
            />
          </Box>
          <Box sx={{ mt: "120px" }}>
            <Contacts />
          </Box>
        </Container>
        <Box
          style={{
            position: "absolute",
            bottom: 0,
            width: "100%",
            zIndex: -10,
            backgroundImage: `url(${homeOndas2})`,
            backgroundSize: "cover",
            minHeight: "30vh",
          }}
        />
      </Box>
    </>
  );
};

export default Home;
