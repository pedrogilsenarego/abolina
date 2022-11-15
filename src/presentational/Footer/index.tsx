import { Box, Grid, Container } from "@mui/material";
import Second from "./Second";

const Footer = () => {
  return (
    <Box style={{ backgroundColor: "#e4d5ad" }}>
      <Container maxWidth="xl">
        <Grid container justifyContent="space-between" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
          <Grid item  >Teste</Grid>
          <Grid item><Second /></Grid>
          <Grid item>Teste</Grid>
          <Grid item>Teste</Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
