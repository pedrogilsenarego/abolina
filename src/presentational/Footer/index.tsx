import { Box, Grid, Container } from "@mui/material";
import Second from "./Second";
import Third from "./Third";
import Forth from "./Forth";

const Footer = () => {
  return (
    <Box style={{ backgroundColor: "#e4d5ad" }}>
      <Container maxWidth='xl'>
        <Grid
          container
          justifyContent='space-between'
          style={{ paddingTop: "30px", paddingBottom: "30px" }}
        >
          <Grid item>
            <Second />
          </Grid>
          <Grid item>
            <Third />
          </Grid>
          <Grid item>
            <Forth />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
