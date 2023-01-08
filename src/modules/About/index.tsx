import * as GStyled from "../../styles";
import { i18n } from "../../translations/i18n";
import { Typography, Container, Box, Grid, useTheme, useMediaQuery } from "@mui/material";
import sobreOndas from "../../assets/images/sobreOndas.svg";
import CardMine from "./CardMine";
import { Colors } from "../../constants/pallette";

const About = () => {

  const Theme = useTheme()
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"))

  return (
    <Box style={{ position: "relative", paddingBottom: "15vh" }}>
      <Container>
        <Box display='flex' justifyContent='start'>
          <Typography color={Colors.tealc} fontSize="28px" fontWeight={800}>{i18n.t("menuBar.about")}</Typography>
        </Box>
        <Typography
          align='justify'
          style={{ marginTop: "20px", whiteSpace: "pre-line" }}
        >
          {i18n.t("modules.about.mainText")}
        </Typography>
        <Container maxWidth='lg' style={{ paddingLeft: mobile ? "0px" : "80px", paddingRight: mobile ? "0px" : "80px" }}>

          <Grid
            container
            columnSpacing={8}
            alignItems='top'
            rowSpacing={4}

            style={{ marginTop: "40px" }}
          >
            <Grid item xs={12} md={4}>
              <CardMine duration={0.3}>
                <GStyled.Title fontSize='16px' style={{ fontWeight: 700 }}>
                  {i18n.t("modules.about.secondTitle")}
                </GStyled.Title>
                <Typography align='justify' style={{ marginTop: "10px" }}>
                  {i18n.t("modules.about.second")}
                </Typography>
              </CardMine>
            </Grid>

            <Grid item xs={12} md={4}>
              <CardMine duration={0.5}>
                <GStyled.Title fontSize='16px' style={{ fontWeight: 700 }}>
                  {i18n.t("modules.about.thirdTitle")}
                </GStyled.Title>
                <Typography
                  align='justify'
                  style={{ marginTop: "10px", whiteSpace: "pre-line" }}
                >
                  {i18n.t("modules.about.third")}
                </Typography>
              </CardMine>
            </Grid>
            <Grid item xs={12} md={4}>
              <CardMine duration={0.7} >
                <GStyled.Title fontSize='16px' style={{ fontWeight: 700 }}>
                  {i18n.t("modules.about.forthTitle")}
                </GStyled.Title>
                <Typography
                  align='justify'
                  style={{ marginTop: "10px", whiteSpace: "pre-line" }}
                >
                  {i18n.t("modules.about.forth")}
                </Typography>
              </CardMine>
            </Grid>
          </Grid>

        </Container>
      </Container>
      <Box
        style={{
          position: "absolute",
          zIndex: -10,
          bottom: 0,
          width: "100%",
          backgroundImage: `url(${sobreOndas})`,
          backgroundSize: "cover",
          minHeight: "30vh",
        }}
      />
    </Box>
  );
};

export default About;
