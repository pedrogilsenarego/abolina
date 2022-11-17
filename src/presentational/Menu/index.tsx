import { Box, Grid, Container } from "@mui/material";
import { Colors } from "../../constants/pallette";
import Left from "./Left"
import Right from "./Right";
import Middle from "./Middle";

const Menu = () => {
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
  );
};

export default Menu;
