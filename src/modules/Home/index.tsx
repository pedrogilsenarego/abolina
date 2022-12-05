import Carrousell from "./Components/Carrousell";
import * as GStyled from "../../styles";
import { i18n } from "../../translations/i18n";
import { Typography, Container, Box } from "@mui/material";
import Button from "../../components/Buttons/Button";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routes";
import Contacts from "./Components/Contacts";
import homeOndas1 from "../../assets/images/homeOndas1.svg"
import homeOndas2 from "../../assets/images/homeOndas2.svg"

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <Carrousell />
      <Box style={{

        backgroundImage: `url(${homeOndas1})`,
        backgroundSize: "cover",
        minHeight: "30vh"
      }} />
      <Container maxWidth='lg' style={{ justifyContent: "center" }}>
        <Box sx={{ mt: "60px" }} >
          <GStyled.Title>{i18n.t("menuBar.about")}</GStyled.Title>
          <Typography
            align='justify'
            style={{ marginTop: "10px", whiteSpace: "pre-line" }}
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
        <Box sx={{ mt: "60px" }} >
          <Contacts />
        </Box>
      </Container>
      <Box style={{

        backgroundImage: `url(${homeOndas2})`,
        backgroundSize: "cover",
        minHeight: "30vh"
      }} />
    </>
  );
};

export default Home;
