import { Box, Grid, Container, useTheme, useMediaQuery, Typography } from "@mui/material";
import { FiMenu } from "react-icons/fi"
import { Colors } from "../../constants/pallette";
import Left from "./Left"
import Right from "./Right";
import Middle from "./Middle";
import MobileMainDrawer from "./MobileMainDrawer";
import { useState } from "react";

const Menu = () => {
  const [openDrawer, setOpenDrawer] = useState<boolean>(false)
  const [lang, setLang] = useState<string>("PT")
  const Theme = useTheme()
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"))

  const laptopRender = () => {
    return (
      <Box sx={{ flexGrow: 1, backgroundColor: Colors.tealc }}>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center" style={{ height: "80px" }}>
            <Grid item><Left /></Grid>
            <Grid item><Middle setOpenDrawer={setOpenDrawer} /></Grid>
            <Grid item><Right setLang={setLang} /></Grid>
          </Grid>
        </Container>
      </Box>
    )
  }

  const mobileRender = () => {
    return (
      <Box sx={{ backgroundColor: Colors.tealc }}>
        <Container>
          <Grid container columnSpacing={1} justifyContent="center" alignItems="center" style={{ height: "80px" }}>
            <Grid item xs={2}><FiMenu size="2em" color="white" onClick={() => setOpenDrawer(true)} /></Grid>
            <Grid item xs={9}><Left height="auto" /></Grid>
            <Grid item xs={1} textAlign="right"><Typography color="whitesmoke" fontSize="12px">{lang}</Typography></Grid>
          </Grid>
        </Container>
      </Box>
    )
  }

  return (
    <>
      {mobile ? mobileRender() : laptopRender()}
      <MobileMainDrawer openDrawer={openDrawer} setOpenDrawer={setOpenDrawer} setLang={setLang} /></>
  );
};

export default Menu;
