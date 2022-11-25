import Carrousell from "./Components/Carrousell";
import * as GStyled from "../../styles";
import { i18n } from "../../translations/i18n";
import { Typography, Container, Box } from "@mui/material";
import Button from "../../components/Buttons/Button";
import { useNavigate } from "react-router";
import { ROUTE_PATHS } from "../../constants/routes";


const Home = () => {
  const navigate = useNavigate()

  return (
    <>
      <Carrousell />
      <Container maxWidth='lg' style={{ justifyContent: "center" }}>
        <GStyled.Title>{i18n.t("menuBar.about")}</GStyled.Title>
        <Typography
          align='justify'
          style={{ marginTop: "20px", whiteSpace: "pre-line" }}
        >
          {i18n.t("modules.about.mainText")}
        </Typography>
        <Box sx={{ mt: "20px" }} display="flex" justifyContent="start">
          <Button label={i18n.t("modules.home.mainTextBtn")} onClick={() => navigate(ROUTE_PATHS.ABOUT)} />
        </Box>
      </Container>
    </>
  );
};

export default Home;
