import * as GStyled from "../../styles";
import { i18n } from "../../translations/i18n";
import { Typography, Container, Box, Card, Grid } from "@mui/material";
import { Colors } from "../../constants/pallette";

const About = () => {
  return (
    <Container maxWidth='md' >
      <Box display="flex" justifyContent="start">
        <GStyled.Title>{i18n.t("menuBar.about")}</GStyled.Title>
      </Box>
      <Typography
        align='justify'
        style={{ marginTop: "20px", whiteSpace: "pre-line" }}
      >
        {i18n.t("modules.about.mainText")}
      </Typography>
      <Grid container columnSpacing={4} style={{ marginTop: "40px" }}>
        <Grid item xs={12} sm={4}>
          <Card style={{ backgroundColor: Colors.roastedYellow, padding: "20px" }}>
            <GStyled.Title fontSize='16px'>
              {i18n.t("modules.about.secondTitle")}
            </GStyled.Title>
            <Typography
              align='justify'
              style={{ marginTop: "10px", whiteSpace: "pre-line" }}
            >
              {i18n.t("modules.about.second")}
            </Typography>
          </Card></Grid>
        <Grid item xs={12} sm={4}>
          <Card style={{ backgroundColor: Colors.roastedYellow, padding: "20px" }}>
            <GStyled.Title fontSize='16px' >
              {i18n.t("modules.about.thirdTitle")}
            </GStyled.Title>
            <Typography
              align='justify'
              style={{ marginTop: "10px", whiteSpace: "pre-line" }}
            >
              {i18n.t("modules.about.third")}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card style={{ backgroundColor: Colors.roastedYellow, padding: "20px" }}>
            <GStyled.Title fontSize='16px' >
              {i18n.t("modules.about.forthTitle")}
            </GStyled.Title>
            <Typography
              align='justify'
              style={{ marginTop: "10px", whiteSpace: "pre-line" }}
            >
              {i18n.t("modules.about.forth")}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default About;
