import { Box, Grid, Container, useTheme, useMediaQuery } from "@mui/material";
import { FiMenu } from "react-icons/fi"
import { Colors } from "../../constants/pallette";
import Left from "./Left"
import Right from "./Right";
import Middle from "./Middle";

const Menu = () => {
  const Theme = useTheme()
  const mobile = useMediaQuery(Theme.breakpoints.down("sm"))

  const laptopRender = () => {
    return (
      <Box sx={{ flexGrow: 1, backgroundColor: Colors.tealc }}>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center" style={{ height: "80px" }}>
            <Grid item><Left /></Grid>
            <Grid item><Middle /></Grid>
            <Grid item><Right /></Grid>
          </Grid>
        </Container>
      </Box>
    )
  }

  const mobileRender = () => {
    return (
      <Box sx={{ flexGrow: 1, backgroundColor: Colors.tealc }}>
        <Container>
          <Grid container justifyContent="space-between" alignItems="center" style={{ height: "80px" }}>
            <Grid item><FiMenu size="2em" color="white" /></Grid>
            <Grid item><Left height="45" /></Grid>

            <Grid item><Right /></Grid>
          </Grid>
        </Container>
      </Box>
    )
  }

  return (
    <>
      {mobile ? mobileRender() : laptopRender()}</>
  );
};

export default Menu;
