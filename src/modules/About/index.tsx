import * as GStyled from "../../styles";
import { i18n } from "../../translations/i18n";
import { Typography, Container } from "@mui/material";

const About = () => {
  return (
    <Container maxWidth="md" style={{ justifyContent: "center" }}>
      <GStyled.Title>{i18n.t("menuBar.about")}</GStyled.Title>
      <Typography align="justify" style={{ marginTop: "20px", whiteSpace: "pre-line" }}>{i18n.t("modules.about.mainText")}</Typography>
    </Container>
  );
};

export default About;
